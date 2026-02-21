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
        {/*work part */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Moje <span className="text-[#FC9700]">Doświadczenie</span>
          </h1>
          <div className="mt-10">
            <ResumeCard 
            Icon={FaWordpress} 
            role="Front-End Developer" 
            description="Od lat tworzę strony internetowe w oparciu o WordPress. Realizowałem zarówno proste strony firmowe, jak i bardziej rozbudowane projekty. Łączę estetykę z funkcjonalnością i zawsze dopasowuję rozwiązania do potrzeb klienta."
            />
            <ResumeCard 
            Icon={FaReact} 
            role="Front-End Developer" 
            description="Rozwijam swoje kompetencje w nowoczesnych technologiach takich jak React i Next.js, budując wydajne, szybkie aplikacje internetowe. Pracuję nad projektami, które pozwalają mi łączyć kreatywność z technologią, dostarczając użytkownikom wyjątkowe doświadczenia online."  
            />
            <ResumeCard 
            Icon={BsDatabase} 
            role="Back-End Developer" 
            description="Rozwijam umiejętności w zakresie baz danych i integracji systemów, co pozwala mi tworzyć coraz bardziej kompleksowe rozwiązania. Pracuję nad projektami, które wymagają zarówno front-endu, jak i back-endu, co daje mi szansę na ciągły rozwój i poszerzanie kompetencji w różnych obszarach programowania."
            />

          </div>
        </div>
        {/* education part */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Moja <span className="text-[#FC9700]">Edukacja</span>
          </h1>
          <div className="mt-10">
            <ResumeCard 
            Icon={FaGraduationCap} 
            role="Studia podyplomowe" 
            date="10.2022 - 06.2023" 
            description="Studia podyplomowe – ICT i Programowanie
Politechnika Białostocka

Poszerzyłem wiedzę z zakresu nowoczesnych technologii i zdobyłem solidne podstawy programistyczne. Program obejmował m.in. programowanie w JavaScript, React, Node.js, a także zagadnienia związane z bazami danych i bezpieczeństwem. Studia te pozwoliły mi rozwinąć umiejętności techniczne i przygotować się do pracy w branży IT."
            />
          </div>
          <div className="mt-10">
            <ResumeCard 
            Icon={FaGraduationCap} 
            role="Rozwój poprzez projekty"
            date="06.2023 - obecnie" 
            description="Realizuję strony internetowe, projekty graficzne oraz kampanie reklamowe. Każdy projekt to nowe doświadczenie i rozwój kompetencji. Pracuję nad różnorodnymi zleceniami, co pozwala mi ciągle poszerzać swoje umiejętności i dostosowywać się do zmieniających się potrzeb rynku. Moje projekty obejmują zarówno proste strony firmowe, jak i bardziej rozbudowane realizacje, a także kampanie reklamowe w mediach społecznościowych."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
