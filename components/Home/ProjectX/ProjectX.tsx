import React from 'react'
import Image from 'next/image'

const Projects = () => {
  return (
  <div className='pt-16 pb-16'>
    <h1 className='text-center text-2xl md:text-4xl xl:text-5xl font-bold text-white'>
        A small selection of recent <br /> {" "}
        <span className='text-[#FC9700]'> projects </span>
    </h1>
    <div className='w-[70%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 sd:w-[85%]'>
        {/* project 1 */}
        <div>
            <Image 
            src='/images/thumb1.jpg' 
            alt='img' 
            width={800} 
            height={650} 
            className='rounded-lg'
            />
            <h1 className='text-xl font-semibold sm:text-2xl text-white mt-4'>
                Project for an agency specializing in the production of customized clothing and merchandise.</h1>
            <h1 className='pt-2 font-medium text-white/80'>
                WordPress, UI/UX.
            </h1>
        </div>
        {/* project 2 */}
        <div>
            <Image 
            src='/images/thumb2.jpg' 
            alt='img' 
            width={800} 
            height={650} 
            className='rounded-lg'
            />
            <h1 className='text-xl font-semibold sm:text-2xl text-white mt-4'>
                Eco‑focused waste‐management consultancy, using a clean, intuitive design and clear UX/UI structure.</h1>
            <h1 className='pt-2 font-medium text-white/80'>
                WordPress, Oxygen, UI/UX.
            </h1>
        </div>{/* project 3 */}
        <div>
            <Image 
            src='/images/thumb3.jpg' 
            alt='img' 
            width={800} 
            height={650} 
            className='rounded-lg'
            />
            <h1 className='text-xl font-semibold sm:text-2xl text-white mt-4'>
                A modern gastroenterology center through a clean, intuitive design and well-organized content structur.</h1>
            <h1 className='pt-2 font-medium text-white/80'>
                WordPress, Oxygen, UI/UX.
            </h1>
        </div>{/* project 4 */}
        <div>
            <Image 
            src='/images/thumb4.jpg' 
            alt='img' 
            width={800} 
            height={650} 
            className='rounded-lg'
            />
            <h1 className='text-xl font-semibold sm:text-2xl text-white mt-4'>
                A clean, hotel‑standard layout with intuitive navigation, seamlessly combining minimalistic design, clear content sections, and a hospitality-focused UX.</h1>
            <h1 className='pt-2 font-medium text-white/80'>
                WordPress, Oxygen, Java,  UI/UX.
            </h1>
        </div>
    </div>
  </div>
  );
};

export default Projects;