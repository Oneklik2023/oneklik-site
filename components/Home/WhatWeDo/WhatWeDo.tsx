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
     <div className=' pt-16 pb-16'>
      <h1 className='text-center text-2xl md:text-4xl xl:text-5xl font-bold text-white'>
        What We
        <span className='text-[#FC9700]'> Do </span>
      </h1>
      <div className='mt-16 w-[70%] mx-auto sd:w-[85%]'> 
        <Carousel
 
  showDots={false}
  responsive={responsive}
  infinite={true}
  autoPlay={true}
  autoPlaySpeed={4000}
  
>
    <WhatWeDoCard
    Icon={FiRefreshCw}
    name="Update"
    description="We are updating websites in any programming environment. In a dynamic digital world where website security and modernity are the foundation of every brand's success, we offer professional website update services. Our team has extensive expertise in a variety of programming environments, allowing us to update your website efficiently and effectively, regardless of the technology used." 
    />
    <WhatWeDoCard
    Icon={MdDevices}
    name="Development"
    description="We will expand Your current websitein line with current needs. In the era of digital transformation, where your website represents your company's online presence, we understand how crucial it is to keep it current and aligned with evolving market needs and customer expectations. Our website development service is designed to ensure your digital image evolves alongside your business." 
    />
    <WhatWeDoCard
    Icon={FiCheckCircle}
    name="Page maintenance"
    description="Integrated services management i administration websites. We understand how important it is for a website to be not only visually appealing but also effectively managed and secure. That's why we provide a full range of services to keep your website in optimal condition, allowing you to focus on growing your business, confident that your digital assets are in good hands." 
    />
    <WhatWeDoCard
    Icon={FiChrome}
    name="Website"
    description="We will build for you complete pagewith a content management system. In today's world, where a digital presence is crucial to business success, we offer comprehensive website development services equipped with an intuitive and flexible content management system (CMS). Our solution is ideal for companies and entrepreneurs who want complete control over the content and functionality of their website." 
    />
    <WhatWeDoCard
    Icon={FiBell}
    name="Social media support"
    description="Management media social media:Facebook and Instagram. In the age of digital marketing, an active presence and effective management of social media platforms like Facebook and Instagram are crucial to any brand's success. Our company offers professional social media management services, focusing on building a strong, engaging, and high-conversion presence for your brand on these platforms." 
    />
    <WhatWeDoCard
    Icon={FaMeta}
    name="Advertising campaigns"
    description="Meta (FB) Ads - effective tools advertising for your business. In today's digital world, where competition in the digital space is intense, Meta Ads (formerly known as Facebook Ads) are a key tool that allows businesses to achieve significant increases in visibility and engagement. Our services focus on leveraging the advertising potential of Meta platforms, including Facebook and Instagram, to help your business achieve its marketing goals." 
    />
</Carousel>
     </div>
    </div>
  )
};
  
export default WhatWeDo;