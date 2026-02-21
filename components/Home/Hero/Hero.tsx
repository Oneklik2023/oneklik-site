"use client"
/*import { Particle } from '@tsparticles/engine'*/
import Image from 'next/image'
import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import Typewriter from 'typewriter-effect'
import ParticleHero from './ParticleBackground'

const Hero: React.FC = () => {

  return (
    <div className='relative h-screen flex items-center justify-center text-white overflow-hidden flex-col'>

      <ParticleHero />

        <div className='relative z-10 flex flex-col items-center'>
            <Image
            src="/images/avatar.png"
            alt="heroimage"
            width={150}
            height={150}
            className='rounded-[10%] border-1 border-[#FC9700]'
            />
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl mt-6 text-center font-bold tracking-wide">
              {('Tworzymy nowoczesne strony internetowe')} <span className="text-[#FC9700]"> <br />{('zgodne z najnowszymi standardami.')}</span>
            </h1>
            <h2 className="mt-5 text-sm px-2 text-center sm:text-2xl font-medium flex items-center">
              {('Potrzebujesz:')}
              <span className="text-[#FC9700] font-bold">
                <Typewriter
                  options={{
                    strings: [
                      'nowoczesną stronę www ?',
                      'nową wersję strony ?',
                      'aktualizację swojej strony ?',
                      'reklamę w Meta ADS ?',
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 75,
                    deleteSpeed: 50,
                    wrapperClassName: 'pl-2',
                  }}
                />
              </span>
            </h2>
            <a className='mt-6 px-10 py-4 bg-[#FC9700] text-white font-bold rounded-full hover:bg-[#FC8100] transition-all duration-300 inline-flex items-center' href="#projects" role="button">
              {('Zobacz realizacje')}
              <BsArrowRight className='w-5 h-5 inline-block ml-2' />
            </a>
        </div>
    </div>
  )
}

export default Hero