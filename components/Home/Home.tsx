'use client'
import React from 'react'
import Hero from './Hero/Hero'
import Services from './Services/Services'
import Resume from './Resume/Resume'
/*import Projectx from './ProjectX/ProjectX'*/
import Projects from './Projects/Projects'
import Skills from './Skills/Skills'
import WhatWeDo from './WhatWeDo/WhatWeDo'
import Contact from './Contact/Contact'
import Contact2 from './Contact2/Contact2'
import ScrollToTop from '../Helper/ScrollToTop'
import News from './News/News'
import LogoSlider from './LogoSlider/LogoSlider'


const Home = () => {
  return (
    <div className="overflow-hidden">
      <section id="home">
      <Hero />
      </section>
      <section id="services">
      <Services />
      </section>
      <section id="resume">
      <Resume />
      </section>
      {/* <section id="projectx">
      <Projectx />
      </section> */}
      <section id="projects">
      <Projects />
      </section>
      <section id="skills">
      <Skills />
      </section>
      <section id="news">
      <News />
      </section>
      <ScrollToTop />
      <section id="what-we-do">
      <WhatWeDo />
      </section>
      <section id="logo-slider">
      <LogoSlider />
      </section>
      <section id="contact">
      <Contact />
      </section>
    </div>
    )
}

export default Home