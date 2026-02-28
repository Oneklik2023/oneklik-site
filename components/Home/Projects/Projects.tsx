"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type Realizacje = {
  id: number;
  title: { rendered: string };
  acf?: {
    nazwa_realizacji?: string;
    opis_realizacji?: string;
    grafika_realizacji?: string | { url?: string };
  };
};

const getImageUrl = (
  img: string | { url?: string } | undefined
): string | null => {
  if (!img) return null;
  if (typeof img === "string" && img.trim() !== "") return img;
  if (typeof img === "object" && img.url) return img.url;
  return null;
};

export default function Realizacje() {
  const [posts, setPosts] = useState<Realizacje[]>([]);
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/realizacje", { cache: "no-store" });
        const text = await res.text();

        let data: unknown;
        try {
          data = JSON.parse(text);
        } catch {
          console.error("[realizacje] response is not JSON");
          return;
        }

        if (res.ok && Array.isArray(data)) {
          setPosts(data as Realizacje[]);
        } else {
          console.error("[realizacje] unexpected payload:", {
            status: res.status,
            data,
          });
        }
      } catch (e) {
        console.error("[realizacje] fetch failed:", e);
      }
    })();
  }, []);

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Wyświetlane elementy
  const visiblePosts = useMemo(
    () => posts.slice(0, visibleCount),
    [posts, visibleCount]
  );

  // Animacja pojedynczej karty (slide-in z lewej)
  const cardVariants = {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="pt-32 pb-16 w-[90%] sm:w-[70%] mx-auto">
      <h1 className="text-center text-3xl md:text-4xl xl:text-5xl font-bold text-white">
        Kilka naszych <br /> <span className="text-[#FC9700]"> realizacji </span>
      </h1>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-12"
      >
        <AnimatePresence initial={false}>
          {visiblePosts.map((post, index) => {
            const imageUrl = getImageUrl(post.acf?.grafika_realizacji);
            const isExpanded = expanded[post.id] ?? false;

            // dzięki temu nowo dołożone (po kliknięciu Show more) animują się fajnie
            const isNewlyRevealed = index >= visibleCount - 4;

            return (
              <motion.div
                layout
                key={post.id}
                variants={cardVariants}
                initial={isNewlyRevealed ? "hidden" : false}
                animate="show"
                exit="exit"
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="rounded-lg text-white"
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={post.acf?.nazwa_realizacji ?? ""}
                    width={800}
                    height={500}
                    className="rounded-md transition-transform duration-500 ease-in-out hover:scale-105 hover:rotate-3"
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
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {visibleCount < posts.length && (
        <div className="text-center mt-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="px-6 py-2 bg-[#FC9700] text-white font-semibold rounded-md hover:bg-[#e68600]"
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
}