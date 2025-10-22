// app/api/img/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_HOSTS = new Set(["cms.oneklik.pl"]);
const ALLOWED_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]);

function getExt(pathname: string) {
  const m = pathname.toLowerCase().match(/\.[a-z0-9]+$/);
  return m ? m[0] : "";
}
function guessContentTypeByExt(ext: string) {
  switch (ext) {
    case ".png": return "image/png";
    case ".jpg":
    case ".jpeg": return "image/jpeg";
    case ".webp": return "image/webp";
    case ".gif": return "image/gif";
    case ".svg": return "image/svg+xml";
    default: return "application/octet-stream";
  }
}
function safeMultiDecode(v: string, max = 2) {
  let out = v;
  for (let i = 0; i < max; i++) {
    try {
      const dec = decodeURIComponent(out);
      if (dec === out) break;
      out = dec;
    } catch {
      break;
    }
  }
  return out;
}

type FetchErr = Partial<NodeJS.ErrnoException> & { reason?: string };

async function fetchImageWithHttpsHttpFallback(url: URL) {
  const headers: Record<string, string> = {
    Referer: `https://${url.hostname}/`, // częste wymaganie WP
    Accept: "image/avif,image/webp,image/apng,image/*;q=0.8,*/*;q=0.5",
    "User-Agent": "Mozilla/5.0 (compatible; OneKlikProxy/1.0; +https://oneklik.pl)",
  };

  // 1) spróbuj HTTPS
  try {
    return await fetch(url.toString(), {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
      headers,
    });
  } catch (err: unknown) {
    const e = err as FetchErr;
    const tlsMismatch =
      e?.code === "ERR_TLS_CERT_ALTNAME_INVALID" ||
      /certificate/i.test(String(e?.reason ?? "")) ||
      /TLS|SSL/i.test(String(err));

    if (!tlsMismatch) {
      // inny błąd sieciowy – wypuść dalej
      throw err;
    }

    // 2) fallback na HTTP przy błędach TLS (CN/ALTNAMES mismatch)
    const httpUrl = new URL(url.toString().replace(/^https:/i, "http:"));
    // zmień też Referer na http
    const resp = await fetch(httpUrl.toString(), {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
      headers: { ...headers, Referer: `http://${httpUrl.hostname}/` },
    });
    // ciche ostrzeżenie, ale bez stacka
    if (!resp.ok) {
      console.warn(`[img-proxy] HTTP fallback failed: ${resp.status} ${httpUrl}`);
    }
    return resp;
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const raw = searchParams.get("src");
    if (!raw) return NextResponse.json({ error: "Missing ?src" }, { status: 400 });

    const decoded = safeMultiDecode(raw);
    // zaczynamy od https (fallback zrobi funkcja wyżej)
    const normalized = decoded.replace(/^http:\/\//i, "https://");

    let upstreamUrl: URL;
    try {
      upstreamUrl = new URL(normalized);
    } catch {
      return NextResponse.json({ error: "Invalid src URL", normalized }, { status: 400 });
    }

    if (!ALLOWED_HOSTS.has(upstreamUrl.hostname)) {
      return NextResponse.json({ error: "Host not allowed" }, { status: 400 });
    }

    const ext = getExt(upstreamUrl.pathname);
    if (!ALLOWED_EXTS.has(ext)) {
      return NextResponse.json({ error: `Extension not allowed: ${ext}` }, { status: 415 });
    }

    const resp = await fetchImageWithHttpsHttpFallback(upstreamUrl);

    if (!resp.ok) {
      const text = await resp.text().catch(() => "");
      return NextResponse.json(
        { error: "GET upstream failed", status: resp.status, sample: text.slice(0, 200) },
        { status: 502 }
      );
    }

    // Jeśli serwer nie podaje Content-Type, ustaw go po rozszerzeniu.
    const upstreamCT = resp.headers.get("content-type");
    const finalCT = upstreamCT && upstreamCT.trim() !== ""
      ? upstreamCT
      : guessContentTypeByExt(ext);

    // Nie odrzucaj, nawet jeśli CT jest generyczny – ważne, że rozszerzenie jest dozwolone.
    const buf = await resp.arrayBuffer();
    if (!buf || buf.byteLength === 0) {
      return NextResponse.json({ error: "Empty body from upstream" }, { status: 502 });
    }

    return new NextResponse(buf, {
      status: 200,
      headers: {
        "Content-Type": finalCT,
        "Cache-Control": "public, max-age=2592000, s-maxage=2592000, immutable",
      },
    });
  } catch (err) {
    // pojedyncza linia, bez wielkich stacków
    console.warn("[img-proxy] error:", (err as Error)?.message ?? String(err));
    return NextResponse.json({ error: "Unexpected" }, { status: 500 });
  }
}
