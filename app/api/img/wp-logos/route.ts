// app/api/img/wp-logos/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type WPLogoPost = {
  id: number;
  title?: { rendered?: string };
  acf?: {
    logo_image?: string | { url?: string };
    logo_name_?: string;
  };
};

type LogoVM = { id: number; src: string; alt: string; width?: number; height?: number };

const WP_BASE = "cms.oneklik.pl";

function toHttps(u = "") {
  return u.replace(/^http:\/\//i, "https://");
}
function getAcfUrl(v: unknown): string {
  if (!v) return "";
  if (typeof v === "string") return v;
  if (typeof v === "object" && v && "url" in v) {
    const url = (v as { url?: string }).url;
    return typeof url === "string" ? url : "";
  }
  return "";
}

async function fetchJsonWithHttpsHttpFallback<T>(path: string) {
  const headers = {
    "User-Agent": "OneKlikGallery/1.0",
    Accept: "application/json",
  };

  // 1) HTTPS
  try {
    const httpsUrl = `https://${WP_BASE}${path}`;
    const r = await fetch(httpsUrl, { cache: "no-store", headers });
    if (r.ok) return (await r.json()) as T;
    throw new Error(`HTTPS ${r.status}`);
  } catch (e) {
    // 2) HTTP fallback (często leczy lokalne problemy TLS/IPv6 w Node)
    const httpUrl = `http://${WP_BASE}${path}`;
    const r = await fetch(httpUrl, { cache: "no-store", headers });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return (await r.json()) as T;
  }
}

export async function GET() {
  try {
    // pobierz WP JSON (z fallbackiem https→http)
    const data = await fetchJsonWithHttpsHttpFallback<WPLogoPost[]>(
      "/wp-json/wp/v2/logo?per_page=100&_fields=id,acf,title.rendered,slug"
    );

    const arr = Array.isArray(data) ? data : [];

    const logos: LogoVM[] = arr
      .map((p) => {
        const raw = getAcfUrl(p?.acf?.logo_image);
        if (!raw) return null;
        const src = toHttps(raw);
        const alt =
          String(p?.acf?.logo_name_ || p?.title?.rendered || "Logo")
            .replace(/<[^>]+>/g, "")
            .trim();
        return { id: p!.id, src, alt, width: 200, height: 120 };
      })
      .filter(Boolean) as LogoVM[];

    return NextResponse.json(
      { logos },
      { status: 200, headers: { "Cache-Control": "public, max-age=600, s-maxage=600" } }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "wp_fetch_failed", message: (err as Error)?.message ?? String(err) },
      { status: 502 }
    );
  }
}
