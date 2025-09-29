'use client'
import React from 'react'
import { SiJavascript } from 'react-icons/si';
import { SiTypescript } from 'react-icons/si';
import { SiReact } from 'react-icons/si';
import { SiNodedotjs } from 'react-icons/si';       
import { SiTailwindcss } from 'react-icons/si';
import { BiLogoMeta } from "react-icons/bi";
import Tilt from 'react-parallax-tilt';


const skills = [
    { 
        name: "JavaScript", 
        level: "Beginner", 
        icon: <SiJavascript /> 
    },
    { 
        name: "TypeScript", 
        level: "Beginner", 
        icon: <SiTypescript /> 
    },
    { 
        name: "React", 
        level: "Beginner", 
        icon: <SiReact /> 
    },
    { 
        name: "Node.js", 
        level: "Beginner", 
        icon: <SiNodedotjs /> 
    },
    { 
        name: "Tailwind CSS", 
        level: "Medium", 
        icon: <SiTailwindcss /> 
    },
    { 
        name: "Meta Asd", 
        level: "Pro.", 
        icon: <BiLogoMeta /> 
    },
];

const Skills = () => {
  return (
    <div className='text-white pt-16 pb-16 mx-auto'>
      <h1 className='text-center text-2xl md:text-4xl xl:text-5xl font-bold text-white'>
        My<span className='text-[#FC9700]'> Skills </span>
    </h1>
    <div className='flex flex-wrap justify-center gap-6 mt-16'>
        {skills.map((skill) =>{
            return <Tilt key={skill.name} scale={1.5} transitionSpeed={400}>
              <div className='bg-blue-900/30 text-center w-40 h-48 rounded-3xl flex flex-col transition hover:scale-105 shadow-lg hover:shadow-[#FC9700]/75 transition-all duration-300 p-6 backdrop-blur-md items-center justify-center'>
                <div className='items-center flex flex-col'>
                     <div className='text-5xl mb-4 text-white'>{skill.icon}</div>
                     <p className='text-2xl font-semibold text-gray-300'>{skill.level}</p>
                     <span className='text-[#FC9700]/50'>{skill.name}</span>
                </div>
                   
               </div>
            </Tilt>
            
        })}
    </div>
    </div>
  );
};

export default Skills;