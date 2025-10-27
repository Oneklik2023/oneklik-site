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
            My Work <span className="text-[#FC9700]">Experience</span>
          </h1>
          <div className="mt-10">
            <ResumeCard 
            Icon={FaWordpress} 
            role="Front-End Developer" 
            description="I’ve been building websites with WordPress for years and gained a lot of experience along the way. I’ve worked on everything from simple business pages to more complex projects. I enjoy combining good design with functionality and always aim to deliver solutions tailored to each client’s needs."
            />
            <ResumeCard 
            Icon={FaReact} 
            role="Front-End Developer" 
            description="I’m just starting my journey with React and Next.js, but I’ve already built a few simple apps. I really enjoy exploring what these technologies can do. I’m excited to keep learning and create more interesting projects along the way."  
            />
            <ResumeCard 
            Icon={BsDatabase} 
            role="Back-End Developer" 
            description="I’m just getting started with databases and learning the basics. I’m exploring how to use them in practice and connect them with applications. For me, it’s the next step in growing my skills."
            />

          </div>
        </div>
        {/* education part */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            My <span className="text-[#FC9700]">Education</span>
          </h1>
          <div className="mt-10">
            <ResumeCard 
            Icon={FaGraduationCap} 
            role="Graduation" 
            date="Oct 2022 - Jun 2023" 
            description="I completed postgraduate studies at Bialystok University of Technology in ICT and Programming. It was a great opportunity to expand my knowledge of modern technologies and gain more practical programming experience. This gave me a solid foundation to keep building on in my development journey."
            />
          </div>
          <div className="mt-10">
            <ResumeCard 
            Icon={FaGraduationCap} 
            role="Growth through Projects" 
            date="Oct 2023 - till now" 
            description="Since 2023, I’ve been continuously working on projects — building websites, creating graphic designs, and running online advertising campaigns. This allows me to combine different skills and deliver solutions tailored to clients’ needs. I see every project as a chance to grow and gain new experiences."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
