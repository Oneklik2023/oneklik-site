import React from "react";
import { FaWordpress } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { BsDatabase } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";
import ResumeCard from "./ResumeCard";

const Resume = () => {
  return (
    <div className="pt-32 pb-16">
      <div className="w-[90%] sm:w-[70%] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-10">
        
        {/* education part */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Edukacja <span className="text-[#FC9700]">Przez Projekty</span>
          </h1>
          <p className="text-white mt-4">Nasze doświadczenie budowaliśmy poprzez realne projekty komercyjne. Każda realizacja to praktyczna nauka UX, optymalizacji, pracy z klientem oraz wdrażania rozwiązań biznesowych. Niektóre z nich poniżej:</p>
          
          <div className="mt-10">
            <ResumeCard 
            Icon={FaGraduationCap} 
            role="zagrodapodlasem.pl" 
            date="2022" 
            /*description1="ZAKRES PRAC"*/
            description="Strona od podstaw, UX, Integracja galerii i map, Konfiguracja analityki"
            />
          </div>
          
          <div className="mt-10">
            <ResumeCard 
            Icon={FaGraduationCap} 
            role="autoserwishapunowicz.pl"
            date="2022" 
            /*description1="ZAKRES PRAC"*/
            description="Strona firmowa od podstaw, UX, Integracja formularzy, Sekcja usług, Optymalizajca SEO"
            />
          </div>
          
          <div className="mt-10">
            <ResumeCard 
            Icon={FaGraduationCap} 
            role="biuromagart.pl"
            date="2022" 
            /*description1="ZAKRES PRAC"*/
            description="Strona firmowa, Integracja formularzy, Sekcja usług, Optymalizajca SEO"
            />
          </div>
          
          <div className="mt-10">
            <ResumeCard 
            Icon={FaGraduationCap} 
            role="nova-clinic.com.pl"
            date="2023" 
            /*description1="ZAKRES PRAC"*/
            description="Strona firmowa od podstaw, UX, Sekcja usług, Cenniki, Optymalizajca SEO"
            />
          </div>

          <div className="mt-10">
            <ResumeCard 
            Icon={FaGraduationCap} 
            role="esmart.net.pl"
            date="2024" 
            /*description1="ZAKRES PRAC"*/
            description="Frontend strony firmowej, Przygotowanie struktury pod SEO, Integracja z backendem, Responsywność i optymalizacja"
            />
          </div>


        </div>
        {/*work part */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Nasze <span className="text-[#FC9700]">Doświadczenie</span>
          </h1>
          <div className="mt-10">
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
