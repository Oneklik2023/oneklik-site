"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { NavLinks } from '@/constant/constant'
import Link from 'next/link'
import { BiEnvelope } from 'react-icons/bi'
import { HiBars3BottomRight } from 'react-icons/hi2'

type Props = {
    openNav: () => void;
};

const Nav = ({ openNav }: Props) => {
    const [navBg, setNavBg] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handler = () =>  {
            if (window.scrollY >= 90) setNavBg(true);
            else setNavBg(false);
            };

        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
}, []);

 if (!mounted) return null; // NIE renderuj nic przed "hydracją" na kliencie

  return (
    <div 
        className={`transition-all ${
        navBg ? "bg-gray-800/80 shadow-md " : "fixed"
        } duration-200 h-[12vh] z-[1000] fixed w-full`}
        >
        <div className='flex items-center h-full justify-between w-[90%] mx-auto'>
         {/*LOGO*/}
     <div className='flex items-center space-x-2' >
            <a href="#home">
            <div className='w-full h-full /* bg-white*/ /*rounded-full*/ flex items-center justify-center flex-col hover:scale-105 transition-all duration-300'>
                <Image src="/images/logo-ok.svg" alt="Logo" width={160} height={80} />
            </div>
            </a>
            { /*<h1 className='text-xl sm:block md:text-2xl text-[#FC9700] font-bold'>
                Tomas
            </h1> */ }
    </div>
        {/* navlinks */}
        <div className='hidden lg:flex items-center space-x-10'>
            {NavLinks.map(link =>{
                return <Link key={link.id} href={link.url} scroll={true} className='text-base hover:text-[#FC9700] text-white font-medium transition-all duration-200'
                >
                    <p>{link.label}</p>

                </Link>
            })}
        </div>
        {/* button */}
        <a  href = "mailto:biuro@oneklik.pl">
            <button className='px-6 py-2.5 text-sm cursor-pointer rounded-lg bg-[#FC9700] hover:bg-[#FC8100] transition-all duration-300 text-white flex items-center space-x-2'>
              <BiEnvelope className='w-5 h-5' />
              <span>Send email</span>
            </button>
        </a>
        {/* burger menu */}
        <HiBars3BottomRight onClick={openNav} className='w-8 h-8 text-white lg:hidden cursor-pointer' />
    </div>
    </div>
  );
};

export default Nav;