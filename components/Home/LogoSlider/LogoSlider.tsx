import React, { useState, useRef } from "react";
import Slider from "react-slick";

function SlickGoTo() {
  const [slideIndex, setSlideIndex] = useState(0);
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 4,
    afterChange: (index: number) => setSlideIndex(index),
  };

  return (
    <div className="w-full h-32 bg-gray-800 flex items-center justify-center">
      <input
        type="number"
        onChange={e => sliderRef.current?.slickGoTo(Number(e.target.value))}
        value={slideIndex}
        min={0}
        max={4}
      />
      <Slider ref={sliderRef} {...settings}>
        <div>
          <img className="slider-image w-10 h-10" src="/file.svg" alt="thumb1" />
        </div>
        <div>
          <img className="slider-image w-10 h-10" src="/globe.svg" alt="thumb2" />
        </div>
        <div>
          <img className="slider-image w-10 h-10" src="/next.svg" alt="thumb3" />
        </div>
        <div>
          <img className="slider-image w-10 h-10" src="/vercel.svg.jpg" alt="thumb4" />
        </div>
      </Slider>
    </div>
  );
}

export default SlickGoTo;