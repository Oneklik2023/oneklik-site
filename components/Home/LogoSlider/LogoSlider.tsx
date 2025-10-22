import Image from 'next/image';
import React from 'react';

const logos = [
  { src: '/file.svg', alt: 'Logo 1' },
  { src: '/globe.svg', alt: 'Logo 2' },
  { src: '/window.svg', alt: 'Logo 3' },
];

const LogoSlider: React.FC = () => {
  const repeatedLogos = [...logos, ...logos, ...logos, ...logos]; // duplikujemy loga

  return (
    <div className="pt-16 pb-16 logo_slider__container">
      <div className="logo_slider__track">
        {repeatedLogos.map((logo, index) => (
          <div key={index} className="logo_slider__item">
            <Image 
              src={logo.src} 
              alt={logo.alt} 
              width={100} 
              height={60}
              />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoSlider;
