'use client'
import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import WhatWeDoCard from './WhatWeDoCard';
import { FiRefreshCw } from "react-icons/fi";
import { MdDevices } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { FiChrome } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import { FaMeta } from "react-icons/fa6";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1324 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1324, min: 764 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const WhatWeDo = () => {
  return (
     <div className=' pt-32 pb-16'>
      <h1 className='text-center text-2xl md:text-4xl xl:text-5xl font-bold text-white'>
        Czym się zajmujemy<br /> {" "}
        <span className='text-[#FC9700]'> i co możemy dla Ciebie zrobić? </span>
      </h1>
      <div className='mt-16 w-[90%] sm:w-[70%] mx-auto sd:w-[85%]'> 
        <Carousel
 
  showDots={false}
  responsive={responsive}
  infinite={true}
  autoPlay={true}
  autoPlaySpeed={4000}
  
>
    <WhatWeDoCard
    Icon={FiRefreshCw}
    name="Aktualizacja"
    description="Aktualizujemy strony internetowe niezależnie od wykorzystywanej technologii czy środowiska programistycznego. W dynamicznie zmieniającym się świecie cyfrowym bezpieczeństwo i nowoczesność serwisu stanowią fundament sukcesu każdej marki." 
    />
    <WhatWeDoCard
    Icon={MdDevices}
    name="Rozwój strony"
    description="Rozbudujemy Twoją obecną stronę internetową zgodnie z aktualnymi potrzebami Twojej firmy. W dobie cyfrowej transformacji, gdy witryna stanowi kluczowy element obecności marki w sieci, doskonale rozumiemy, jak ważne jest jej stałe dostosowywanie do zmieniających się wymagań rynku i oczekiwań klientów." 
    />
    <WhatWeDoCard
    Icon={FiCheckCircle}
    name="Opieka nad stroną"
    description="Kompleksowe zarządzanie i administracja stroną internetową. Doskonale rozumiemy, że serwis powinien być nie tylko estetyczny, ale przede wszystkim bezpieczny, stabilny i odpowiednio zarządzany.
    Dlatego oferujemy pełen zakres usług utrzymaniowych, które zapewniają sprawne działanie strony oraz jej optymalną kondycję techniczną. Dzięki temu możesz skupić się na rozwoju swojego biznesu, mając pewność, że Twoja obecność w sieci jest w dobrych rękach." 
    />
    <WhatWeDoCard
    Icon={FiChrome}
    name="Strona internetowa z CMS"
    description="Stworzymy dla Ciebie kompletną stronę internetową wyposażoną w system zarządzania treścią (CMS). W dzisiejszych realiach cyfrowych silna obecność online jest kluczowa dla rozwoju biznesu, dlatego oferujemy kompleksowe tworzenie nowoczesnych, funkcjonalnych serwisów. Nasze rozwiązania zapewniają intuicyjny i elastyczny system zarządzania treścią, dzięki któremu zyskujesz pełną kontrolę nad zawartością i rozwojem swojej strony." 
    />
    <WhatWeDoCard
    Icon={FiBell}
    name="Obsługa social media"
    description="Kompleksowe zarządzanie profilami w mediach społecznościowych — Facebook i Instagram. W erze marketingu cyfrowego aktywna i profesjonalnie prowadzona komunikacja w social media to jeden z filarów skutecznej strategii marki. Budujemy spójny wizerunek, tworzymy angażujące treści i prowadzimy działania nastawione na realne wyniki — większy zasięg, zaangażowanie i konwersję." 
    />
    <WhatWeDoCard
    Icon={FaMeta}
    name="Kampanie reklamowe"
    description="Meta Ads (Facebook & Instagram) — skuteczne narzędzie promocji Twojego biznesu. W świecie intensywnej konkurencji online precyzyjnie zaplanowane kampanie reklamowe pozwalają znacząco zwiększyć widoczność marki i dotrzeć do właściwej grupy odbiorców. Projektujemy i optymalizujemy kampanie na platformach Meta, koncentrując się na maksymalizacji efektów i realizacji Twoich celów marketingowych." 
    />
        </Carousel>
      </div>
    </div>
  )
};
  
export default WhatWeDo;