"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

type Aktualnosc = {
  id: number;
  title: { rendered: string };
  acf?: {
    nazwa_aktualnosci?: string;
    tresc_aktualnosci?: string;
    grafika_aktualnosci?: string | { url?: string };
  };
};

const getImageUrl = (img: any): string | null => {
  if (!img) return null;
  if (typeof img === "string" && img.trim() !== "") return img;
  if (typeof img === "object" && img.url) return img.url;
  return null;
};

export default function News() {
  const [posts, setPosts] = useState<Aktualnosc[]>([]);
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
  const [visibleCount, setVisibleCount] = useState(4); // 👈 widoczne 4 wpisy

  useEffect(() => {
    fetch("http://cms.oneklik.pl/wp-json/wp/v2/aktualnosci")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("API zwróciło coś innego niż tablicę:", data);
        }
      });
  }, []);

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (posts.length === 0) {
    return (
      <div className="pt-16 pb-16 w-[70%] mx-auto  text-center text-white/60 sm:w-[85%]">
        Loading news...
      </div>
    );
  }

  return (
    <div className="pt-16 pb-16 w-[70%] mx-auto sd:w-[85%]">
      <h1 className="text-center text-2xl md:text-4xl xl:text-5xl font-bold text-white">
        <span className="text-[#FC9700]">News</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {posts.slice(0, visibleCount).map((post) => {
          const imageUrl = getImageUrl(post.acf?.grafika_aktualnosci);
          const isExpanded = expanded[post.id] ?? false;

          return (
            <div
              key={post.id}
              className="bg-[#0F224C] p-6 rounded-lg text-white"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl as string}
                  alt={post.acf?.nazwa_aktualnosci ?? ""}
                  width={800}
                  height={500}
                  className="rounded-md"
                />
              ) : null}

              <h2 className="text-xl font-semibold mt-4">
                {post.acf?.nazwa_aktualnosci}
              </h2>

              <p
                suppressHydrationWarning
                className={`mt-2 text-white/80 transition-all duration-300 ${
                  isExpanded ? "" : "line-clamp-3"
                }`}
              >
                {post.acf?.tresc_aktualnosci}
              </p>

              {post.acf?.tresc_aktualnosci &&
                post.acf?.tresc_aktualnosci?.length > 120 && (
                  <button
                    onClick={() => toggleExpand(post.id)}
                    className="text-[#FC9700] mt-2 underline"
                  >
                    {isExpanded ? "Mniej" : "Więcej"}
                  </button>
                )}
            </div>
          );
        })}
      </div>

      {/* 👇 przycisk pokaż więcej, jeśli są dodatkowe wpisy */}
      {visibleCount < posts.length && (
        <div className="text-center mt-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)} // odkrywaj po 4
            className="px-6 py-2 bg-[#FC9700] text-white font-semibold rounded-md hover:bg-[#e68600]"
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
}
