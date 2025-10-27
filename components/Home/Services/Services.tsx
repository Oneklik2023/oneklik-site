import React from 'react'
import ServiceCard from './ServicesCard'
import { SiAffinitydesigner } from "react-icons/si";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { GrVmMaintenance } from "react-icons/gr";

const Services = () => {
  return <div className= "pt-32 pb-16">
    <h1 className='text-2xl text-center md:text-4xl xl:text-5xl font-bold
    text-white'>Your website will not only <br />look better, but it will also <br />become more functional <br />and user-friendly.
    </h1>
    <div className='w-[90%] sm:w-[70%] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 mt-20 items-center'>
        <div>
            <ServiceCard 
                icon={<SiAffinitydesigner className='w-10 h-10' color='#FC9700' />}
                name="Website Redesign"
                description="We will build a complete website for you with a content management system."
            />
        </div>
        <div>
            <ServiceCard 
                icon={<FaExpandArrowsAlt className='w-10 h-10' color='#FC9700' />}
                name="Expansion"
                description="We will expand your current website according to your present needs."
            />
        </div>
        <div>
            <ServiceCard 
                icon={<GrUpdate className='w-10 h-10' color='#FC9700' />}
                name="Update"
                description="We update websites in any programming environment."
            />
        </div>
        <div>
            <ServiceCard 
                icon={<GrVmMaintenance className='w-10 h-10' color='#FC9700' />}
                name="Maintenance"
                description="Integrated website management and administration services."
            />
        </div>
    </div>
  </div>
};

export default Services
