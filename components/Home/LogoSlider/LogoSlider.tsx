// components/LogoSlider.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type LogoPost = {
  id: number;
  title?: { rendered?: string };
  acf?: { logo_image?: string; logo_name_?: string };
};

type LogoVM = { id: number; src: string; alt: string };

function normalizeSrc(url: string) {
  return (url || "").replace(/^http:\/\//i, "https://");
}

function LogoImg({ src, alt }: { src: string; alt: string }) {
  const [useDirect, setUseDirect] = useState(false);
  const [failed, setFailed] = useState(false);

  const directSrc = src.replace(/^http:\/\//i, "https://");
  const proxySrc = `/api/img?src=${directSrc}`;

  if (failed) {
    return (
      <div className="logo_box flex items-center justify-center">
        <span className="text-[10px] text-white/70">{alt}</span>
      </div>
    );
  }

  return (
    <div className="logo_box">
      <Image
        src={useDirect ? directSrc : proxySrc}
        alt={alt}
        fill
        style={{ objectFit: "contain" }}   // kluczowe
        onError={() => setUseDirect((v) => (v ? (setFailed(true), v) : true))}
        unoptimized={useDirect}
        sizes="(max-width: 768px) 180px, 240px"  // dopasowane do .logo_box
        priority={false}
      />
    </div>
  );
}

export default function LogoSlider() {
  const [logos, setLogos] = useState<LogoVM[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(
          "https://cms.oneklik.pl/wp-json/wp/v2/logo?per_page=100&_fields=id,acf,slug,title.rendered",
          { cache: "no-store" }
        );
        const data: LogoPost[] = await res.json();

        const arr: LogoVM[] = (Array.isArray(data) ? data : [])
          .map((p) => {
            const raw = p.acf?.logo_image || "";
            if (!raw) return null;
            const src = normalizeSrc(raw);
            const alt = (p.acf?.logo_name_ || p.title?.rendered || "Logo").toString();
            return { id: p.id, src, alt };
          })
          .filter(Boolean) as LogoVM[];

        if (alive) {
          // duplikujemy x2 – ciągłość daje animacja CSS
          setLogos([...arr, ...arr]);
        }
      } catch (e) {
        console.error("load logos error", e);
        if (alive) setLogos([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <div className="pt-16 pb-16">Ładuję logotypy…</div>;
  if (!logos.length) return <div className="pt-16 pb-16">Brak logotypów.</div>;

  return (
    <div className="pt-16 pb-16 logo_slider__container">
      <div className="logo_slider__track">
        {logos.map((logo, idx) => (
          <div key={`${logo.id}-${idx}`} className="logo_slider__item">
            <LogoImg src={logo.src} alt={logo.alt} />
          </div>
        ))}
      </div>
    </div>
  );
}
