"use client";

import React, { useMemo, useState } from "react";
import { FaWordpress, FaReact } from "react-icons/fa";
import { BsDatabase } from "react-icons/bs";
import ResumeCard from "./ResumeCard";
import { AnimatePresence, motion } from "framer-motion";

type EduItem = {
  id: string;
  icon: string;
  role: string;
  description: string;
};

const STEP = 4;

const Resume = () => {
  const eduItems: EduItem[] = useMemo(
    () => [
      {
        id: "zagroda",
        icon: "/images/zagrodapodlasemkozliki.png",
        role: "zagrodapodlasem.pl",
        description: "Strona od podstaw, UX, Integracja galerii i map, Konfiguracja analityki",
      },
      {
        id: "hapunowicz",
        icon: "/images/autoserwishapunowicz.png",
        role: "autoserwishapunowicz.pl",
        description: "Strona firmowa od podstaw, UX, Integracja formularzy, Sekcja usług, Optymalizajca SEO",
      },
      {
        id: "gastromed",
        icon: "/images/gastromed.png",
        role: "gastromed.info",
        description: "Strona firmowa od podstaw, UX, Integracja formularzy, Sekcja usług, Optymalizajca SEO, Prowadzenie SM, Kampanie Meta ADS",
      },
      
      {
        id: "novaclinic",
        icon: "/images/novaclinic.png",
        role: "nova-clinic.com.pl",
        description: "Strona firmowa od podstaw, UX, Sekcja usług, Cenniki, Optymalizajca SEO",
      },
      {
        id: "esmart",
        icon: "/images/smart.png",
        role: "esmart.net.pl",
        description: "Frontend strony firmowej, Przygotowanie struktury pod SEO, Integracja z backendem, Responsywność i optymalizacja",
      },
      {
        id: "betamed",
        icon: "/images/betamed.png",
        role: "betamed.pl",
        description: "Reklama outdorowa",
      },
      {
        id: "brandbo",
        icon: "/images/brandbo.png",
        role: "brandbo.pl",
        description: "Frontend strony firmowej, Przygotowanie struktury pod SEO, Integracja z backendem, Responsywność i optymalizacja",
      },
      {
        id: "centrummedyczne",
        icon: "/images/centrummedycznewarszawska.png",
        role: "cmwarszawska.pl",
        description: "Analiza strony www, Reklama outdorowa",
      },
      {
        id: "dodobaby",
        icon: "/images/dodobaby.png",
        role: "dobaby.pl",
        description: "Administracja sklepem internetowym, Integracja z systemem płatności, Obsługa klienta",
      },
      {
        id: "fastevent",
        icon: "/images/fastevent.png",
        role: "fastevent.pl",
        description: "Analiza strony www, Meta ADS",
      },
      {
        id: "folwarknadawki",
        icon: "/images/folwarknadawki.png",
        role: "karczma.folwarknadawki.pl",
        description: "Analiza strony www, Utworzenie sklepu internetowego, Integracja z systemem płatności, Obsługa klienta, Aktualizacja treści",
      },
      {
        id: "forambient",
        icon: "/images/forambient.png",
        role: "forambient.pl",
        description: "Współpraca w zakresie Meta ADS, Projekty graficzne, Optymalizacja kampanii reklamowych",
      },
      {
        id: "magart",
        icon: "/images/magart.png",
        role: "biuromagart.pl",
        description: "Strona firmowa, Integracja formularzy, Sekcja usług, Optymalizajca SEO",
      },
    ],
    []
  );

  const [visibleEduCount, setVisibleEduCount] = useState(STEP);
  const [lastAction, setLastAction] = useState<"more" | "less">("more");

  const visibleEdu = useMemo(
    () => eduItems.slice(0, visibleEduCount),
    [eduItems, visibleEduCount]
  );

  // slide-in/out w zależności od tego czy rozwijasz czy zwijasz
  const cardVariants = {
    hidden: (direction: "more" | "less") => ({
      opacity: 0,
      x: direction === "more" ? -40 : 40,
    }),
    show: { opacity: 1, x: 0 },
    exit: (direction: "more" | "less") => ({
      opacity: 0,
      x: direction === "less" ? -40 : -20,
    }),
  };

  const canShowMore = visibleEduCount < eduItems.length;
  const canShowLess = visibleEduCount > STEP;

  const handleShowMore = () => {
    setLastAction("more");
    setVisibleEduCount((prev) => Math.min(prev + STEP, eduItems.length));
  };

  const handleShowLess = () => {
    setLastAction("less");
    setVisibleEduCount((prev) => Math.max(prev - STEP, STEP));
  };

  return (
    <div className="pt-32 pb-16">
      <div className="w-[90%] sm:w-[70%] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* education part */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Edukacja <span className="text-[#FC9700]">Przez Projekty</span>
          </h1>
          <p className="text-white mt-4">
            Nasze doświadczenie budowaliśmy poprzez realne projekty komercyjne. Każda realizacja to praktyczna nauka UX,
            optymalizacji, pracy z klientem oraz wdrażania rozwiązań biznesowych. Niektóre z nich poniżej:
          </p>

          <motion.div layout className="mt-6 space-y-4">
            <AnimatePresence initial={false}>
              {visibleEdu.map((item, index) => {
                // animuj tylko "nową paczkę" przy show more
                const isNewlyRevealed =
                  lastAction === "more" && index >= visibleEduCount - STEP;

                return (
                  <motion.div
                    layout
                    key={item.id}
                    variants={cardVariants}
                    custom={lastAction}
                    initial={isNewlyRevealed ? "hidden" : false}
                    animate="show"
                    exit="exit"
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    <ResumeCard Icon={item.icon} role={item.role} description={item.description} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* buttons */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleShowMore}
              disabled={!canShowMore}
              className={`px-6 py-2 font-semibold rounded-md transition ${
                canShowMore
                  ? "bg-[#FC9700] text-white hover:bg-[#e68600]"
                  : "bg-white/10 text-white/40 cursor-not-allowed"
              }`}
            >
              Pokaż więcej
            </button>

            <button
              onClick={handleShowLess}
              disabled={!canShowLess}
              className={`px-6 py-2 font-semibold rounded-md transition ${
                canShowLess
                  ? "bg-white/10 text-white hover:bg-white/15"
                  : "bg-white/10 text-white/40 cursor-not-allowed"
              }`}
            >
              Pokaż mniej
            </button>
          </div>
        </div>

        {/* work part */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Nasze <span className="text-[#FC9700]">Doświadczenie</span>
          </h1>

          <div className="mt-10 space-y-6">
            <ResumeCard
              Icon={FaWordpress}
              role="Front-End Developer"
              description="Od kilku lat tworzymy strony internetowe w oparciu o WordPress. Realizujemy zarówno proste strony firmowe, jak i bardziej rozbudowane projekty. Łączymy estetykę z funkcjonalnością i zawsze dopasowujemy rozwiązania do potrzeb klienta."
            />
            <ResumeCard
              Icon={FaReact}
              role="Front-End Developer"
              description="Rozwijamy swoje kompetencje w nowoczesnych technologiach takich jak React i Next.js, budując wydajne, szybkie aplikacje internetowe. Pracujemy nad projektami, które pozwalają nam łączyć kreatywność z technologią, dostarczając użytkownikom wyjątkowe doświadczenia online."
            />
            <ResumeCard
              Icon={BsDatabase}
              role="Back-End Developer"
              description="Rozwijamy umiejętności w zakresie baz danych i integracji systemów, co pozwala nam tworzyć coraz bardziej kompleksowe rozwiązania. Pracujemy nad projektami, które wymagają zarówno front-endu, jak i back-endu, co daje nam szansę na ciągły rozwój i poszerzanie kompetencji w różnych obszarach programowania."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;