"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-slideshow-image/dist/styles.css";
import "./Slider.css";

import Slider1 from "../../../public/Slider/Slider1.jpg";
import Slider2 from "../../../public/Slider/Slider2.jpg";
import Slider3 from "../../../public/Slider/Slider3.jpg";

export default function SliderImg() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1400,
  };
  return (
    <div className="slider-container">
      <Slider className="slider__main" {...settings}>
        <div id="slidercss" className="slider-slide">
          <Image className="slider-image" src={Slider1} alt="Slide 1" />
        </div>
        <div id="slidercss" className="slider-slide">
          <Image className="slider-image" src={Slider2} alt="Slide 2" />
        </div>
        <div id="slidercss" className="slider-slide">
          <Image className="slider-image" src={Slider3} alt="Slide 3" />
        </div>
      </Slider>
    </div>
  );
}
