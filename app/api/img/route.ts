// app/api/img/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_HOSTS = new Set(["cms.oneklik.pl"]);

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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const raw = searchParams.get("src");
    if (!raw) return NextResponse.json({ error: "Missing ?src" }, { status: 400 });

    const normalized = safeMultiDecode(raw).replace(/^http:\/\//i, "https://");

    let upstreamUrl: URL;
    try {
      upstreamUrl = new URL(normalized);
    } catch {
      return NextResponse.json({ error: "Invalid src URL" }, { status: 400 });
    }

    if (!ALLOWED_HOSTS.has(upstreamUrl.hostname)) {
      return NextResponse.json({ error: "Host not allowed" }, { status: 400 });
    }

    const headers: Record<string, string> = {
      Referer: `https://${upstreamUrl.hostname}/`,
      Accept: "image/avif,image/webp,image/apng,image/*;q=0.8,*/*;q=0.5",
      "User-Agent": "Mozilla/5.0 (compatible; OneKlikProxy/1.0; +https://oneklik.pl)",
    };

    // Spróbuj HTTPS → w razie sieciowego błędu spróbuj HTTP
    let resp: Response;
    try {
      resp = await fetch(upstreamUrl.toString(), {
        method: "GET",
        redirect: "follow",
        cache: "no-store",
        headers,
      });
    } catch {
      const httpUrl = new URL(upstreamUrl.toString().replace(/^https:/i, "http:"));
      resp = await fetch(httpUrl.toString(), {
        method: "GET",
        redirect: "follow",
        cache: "no-store",
        headers: { ...headers, Referer: `http://${httpUrl.hostname}/` },
      });
    }

    if (!resp.ok) {
      const text = await resp.text().catch(() => "");
      return NextResponse.json(
        { error: "GET upstream failed", status: resp.status, sample: text.slice(0, 180) },
        { status: 502 }
      );
    }

    const ct = (resp.headers.get("content-type") || "").toLowerCase();
    if (!ct.startsWith("image/")) {
      return NextResponse.json({ error: "Upstream is not an image", contentType: ct }, { status: 415 });
    }

    const buf = await resp.arrayBuffer();
    if (!buf || buf.byteLength === 0) {
      return NextResponse.json({ error: "Empty body from upstream" }, { status: 502 });
    }

    return new NextResponse(buf, {
      status: 200,
      headers: {
        "Content-Type": ct,
        "Cache-Control": "public, max-age=2592000, s-maxage=2592000, immutable",
      },
    });
  } catch (err) {
    console.warn("[img-proxy] error:", (err as Error)?.message ?? String(err));
    return NextResponse.json({ error: "Unexpected" }, { status: 500 });
  }
}
