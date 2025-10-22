// app/api/wp-logos/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LogoPost = {
  id: number;
  slug: string;
  featured_media: number;
  title: { rendered: string };
  _links?: { ["wp:attachment"]?: Array<{ href: string }> };
};

type MediaItem = {
  id: number;
  source_url: string;
  alt_text?: string;
  media_details?: { width?: number; height?: number };
};

const WP = "https://cms.oneklik.pl/wp-json/wp/v2";

function toHttps(url: string) {
  return url.replace(/^http:\/\//i, "https://");
}

async function fetchJson<T>(url: string) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return null;
  return (await res.json()) as T;
}

async function getMediaById(id: number) {
  if (!id || id <= 0) return null;
  return await fetchJson<MediaItem>(`${WP}/media/${id}?_fields=id,source_url,alt_text,media_details`);
}

async function getFirstAttachmentByParent(postId: number) {
  const arr = await fetchJson<MediaItem[]>(
    `${WP}/media?parent=${postId}&per_page=1&_fields=id,source_url,alt_text,media_details`
  );
  return arr?.[0] ?? null;
}

async function searchMediaByQuery(q: string) {
  if (!q) return null;
  // najpierw po slugu
  let arr =
    (await fetchJson<MediaItem[]>(
      `${WP}/media?search=${encodeURIComponent(q)}&mime_type=image&per_page=1&_fields=id,source_url,alt_text,media_details`
    )) ?? [];
  if (arr.length > 0) return arr[0];
  // potem po tytule
  arr =
    (await fetchJson<MediaItem[]>(
      `${WP}/media?search=${encodeURIComponent(q.replace(/-/g, " "))}&mime_type=image&per_page=1&_fields=id,source_url,alt_text,media_details`
    )) ?? [];
  return arr[0] ?? null;
}

async function getAcfImageForPost(postId: number) {
  const single = await fetchJson<any>(`${WP}/logo/${postId}?_fields=acf`);
  const acf = single?.acf;
  if (!acf || typeof acf !== "object") return null;
  const candidate =
    acf.logo_image?.url ||
    acf.logo?.url ||
    acf.image?.url ||
    acf.obraz?.url ||
    acf.zdjecie?.url ||
    null;
  if (!candidate) return null;
  return {
    id: postId,
    source_url: candidate as string,
    alt_text: "",
    media_details: undefined,
  } as MediaItem;
}

export async function GET() {
  try {
    const posts =
      (await fetchJson<LogoPost[]>(
        `${WP}/logo?per_page=100&_fields=id,slug,featured_media,title.rendered,_links.wp:attachment`
      )) ?? [];

    const results = await Promise.all(
      posts.map(async (post) => {
        const titleText = (post.title?.rendered ?? "").replace(/<[^>]+>/g, "").trim();

        let media =
          (await getMediaById(post.featured_media)) ||
          (await getFirstAttachmentByParent(post.id)) ||
          (await getAcfImageForPost(post.id)) ||
          (await searchMediaByQuery(post.slug)) ||
          (await searchMediaByQuery(titleText));

        if (!media?.source_url) return null;

        const src = toHttps(media.source_url);
        const alt = media.alt_text || titleText || "Logo";

        return {
          id: post.id,
          alt,
          src,
          width: media.media_details?.width ?? 120,
          height: media.media_details?.height ?? 70,
        };
      })
    );

    const logos = results.filter(Boolean);

    return NextResponse.json(
      { logos },
      { status: 200, headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" } }
    );
  } catch (err) {
    console.error("WP-LOGOS ROUTE ERROR", err);
    return NextResponse.json({ error: "unexpected" }, { status: 500 });
  }
}
