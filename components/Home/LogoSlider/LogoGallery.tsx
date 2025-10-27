// Home/LogoSlider/LogoGallery.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type LogoVM = { id: number; src: string; alt: string; width?: number; height?: number };

export default function LogoGallery() {
  const [logos, setLogos] = useState<LogoVM[]>([]);
  const [broken, setBroken] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/wp-logos", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const list: LogoVM[] = Array.isArray(json?.logos) ? json.logos : [];
        if (alive) setLogos(list);
      } catch {
        if (alive) setLogos([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  if (loading) return <div className="py-12 text-center">Ładuję logotypy…</div>;
  if (!logos.length) return <div className="py-12 text-center">Brak logotypów.</div>;

  return (
    <div className="pt-48 pb-16">
      <h1 className="text-center text-2xl md:text-4xl xl:text-5xl font-bold text-white">
        They Trust <span className="text-[#FC9700]">Us</span>
      </h1>

      <div className="py-16 w-[90%] sm:w-[70%] mx-auto">
        <ul className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {logos.map((l, i) => {
            const useProxy = !broken[l.id];
            const src = useProxy
              ? `/api/img?src=${encodeURIComponent(l.src)}`
              : l.src.replace(/^http:\/\//i, "https://"); // fallback bezpośredni

            return (
              <li
                key={l.id}
                className="relative aspect-[4/3] rounded-xl border border-white/10 bg-transparent hover:border-[#FC9700]/50 transition-all duration-200"
              >
                {/* Next/Image ma własny lazy i observer – zostaje.
                    onError -> jednokrotny fallback do bezpośredniego URL-a */}
                <Image
                  src={src}
                  alt={l.alt}
                  fill
                  className="object-contain"
                  unoptimized
                  priority={i < 6}
                  loading={i < 6 ? "eager" : "lazy"}
                  sizes="(max-width:640px) 30vw, (max-width:768px) 28vw, (max-width:1024px) 22vw, 20vw"
                  onError={() => {
                    if (!broken[l.id]) {
                      setBroken((b) => ({ ...b, [l.id]: true }));
                    }
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
