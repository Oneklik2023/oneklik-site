'use client'
import React from 'react'
import Hero from './Hero/Hero'
import Services from './Services/Services'
import Resume from './Resume/Resume'
import Projects from './Projects/Projects'
import Skills from './Skills/Skills'
import WhatWeDo from './WhatWeDo/WhatWeDo'
import Contact from './Contact/Contact'
import ScrollToTop from '../Helper/ScrollToTop'
/*import News from './News/News'*/
import LogoGallery from './LogoSlider/LogoGallery'
import { Analytics } from "@vercel/analytics/next"




const Home = () => {
  return (
    <div className="overflow-hidden">
      <Analytics/>React
      <section id="home">
      <Hero />
      </section>
      <section id="services">
      <Services />
      </section>
      <section id="resume">
      <Resume />
      </section>
      <section id="projects">
      <Projects />
      </section>
      <section id="skills">
      <Skills />
      </section>
      {/*<section id="news">
      <News />
      </section>*/}
      <ScrollToTop />
      <section id="what-we-do">
      <WhatWeDo />
      </section>
      <section id="logo-gallery">
      <LogoGallery />
      </section>
      <section id="contact">
      <Contact />
      </section>
    </div>
    )
}

export default Home