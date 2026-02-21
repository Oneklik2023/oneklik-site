import React from 'react'
import ServiceCard from './ServicesCard'
import { SiAffinitydesigner } from "react-icons/si";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { GrVmMaintenance } from "react-icons/gr";

const Services = () => {
  return <div className= "pt-32 pb-16">
    <h1 className='text-2xl text-center md:text-4xl xl:text-5xl font-bold
    text-white'>Twoja strona nie tylko będzie <br />lepiej wyglądać, ale również <br />stanie się bardziej funkcjonalna <br />i przyjazna użytkownikowi.
    </h1>
    <div className='w-[90%] sm:w-[70%] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 mt-20 items-center'>
        <div>
            <ServiceCard 
                icon={<SiAffinitydesigner className='w-10 h-10' color='#FC9700' />}
                name="Redesign strony"
                description="Odświeżamy witryny i nadajemy im nowoczesny wygląd."
            />
        </div>
        <div>
            <ServiceCard 
                icon={<FaExpandArrowsAlt className='w-10 h-10' color='#FC9700' />}
                name="Rozbudowa"
                description="Rozszerzamy istniejącą stronę zgodnie z aktualnymi potrzebami Twojej firmy."
            />
        </div>
        <div>
            <ServiceCard 
                icon={<GrUpdate className='w-10 h-10' color='#FC9700' />}
                name="Aktualizacja"
                description="Aktualizujemy strony w różnych technologiach i środowiskach."
            />
        </div>
        <div>
            <ServiceCard 
                icon={<GrVmMaintenance className='w-10 h-10' color='#FC9700' />}
                name="Opieka techniczna"
                description="Stała administracja i utrzymanie strony w bezpiecznym stanie."
            />
        </div>
    </div>
  </div>
};

export default Services
