"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

type Realizacje = {
  id: number;
  title: { rendered: string };
  acf?: {
    nazwa_realizacji?: string;
    opis_realizacji?: string;
    grafika_realizacji?: string | { url?: string };
  };
};

const getImageUrl = (img: string | { url?: string } | undefined): string | null => {
  if (!img) return null;
  if (typeof img === "string" && img.trim() !== "") return img;
  if (typeof img === "object" && img.url) return img.url;
  return null;
};

export default function Realizacje() {
  const [posts, setPosts] = useState<Realizacje[]>([]);
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
  const [visibleCount, setVisibleCount] = useState(4); // 👈 widoczne 4 wpisy

useEffect(() => {
  fetch("/api/realizacje")
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) setPosts(data);
      else console.error("API zwróciło coś innego niż tablicę:", data);
    });
}, []);


  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="pt-32 pb-16 w-[90%] sm:w-[70%] mx-auto">
      <h1 className='text-center text-3xl md:text-4xl xl:text-5xl font-bold text-white'>
        A small selection of recent <br /> {" "}
        <span className='text-[#FC9700]'> projects </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {posts.slice(0, visibleCount).map((post) => {
          const imageUrl = getImageUrl(post.acf?.grafika_realizacji);
          const isExpanded = expanded[post.id] ?? false;

          return (
            <div
              key={post.id}
              className="rounded-lg text-white"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={post.acf?.nazwa_realizacji ?? ""}
                  width={800}
                  height={500}
                  className="rounded-md transition-transform duration-500 ease-in-out hover:scale-120 hover:rotate-23"
                />
              ) : null}

              <h2 className="text-xl md:text-2xl font-semibold mt-4">
                {post.acf?.nazwa_realizacji}
              </h2>

              <p
                className={`mt-2 text-white/80 transition-all duration-300 ${
                  isExpanded ? "" : "line-clamp-3"
                }`}
              >
                {post.acf?.opis_realizacji}
              </p>

              {post.acf?.opis_realizacji &&
                post.acf.opis_realizacji.length > 120 && (
                  <button
                    onClick={() => toggleExpand(post.id)}
                    className="text-[#FC9700] mt-2 cursor-pointer hover:font-semibold"
                  >
                    {isExpanded ? "... Less" : "More ..."}
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
