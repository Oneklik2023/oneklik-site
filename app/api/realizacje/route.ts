import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function forceHttps(input: string) {
  return input.replace(/http:\/\/cms\.oneklik\.pl/gi, "https://cms.oneklik.pl");
}

export async function GET() {
  const res = await fetch(
    "https://cms.oneklik.pl/wp-json/wp/v2/realizacje?per_page=100",
    { cache: "no-store" }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "CMS error", status: res.status },
      { status: 502 }
    );
  }

  const data = await res.json();
  const fixed = JSON.parse(forceHttps(JSON.stringify(data)));

  return NextResponse.json(fixed);
}
