import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-slideshow-image/dist/styles.css";
import "./Slider.css";

import Slider1 from "../../assets/Slider/Slider1.jpg";
import Slider2 from "../../assets/Slider/Slider2.jpg";
import Slider3 from "../../assets/Slider/Slider3.jpg";

const SliderImg = () => {
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
          <img className="slider-image" src={Slider1} alt="Slide 1" />
        </div>
        <div id="slidercss" className="slider-slide">
          <img className="slider-image" src={Slider2} alt="Slide 2" />
        </div>
        <div id="slidercss" className="slider-slide">
          <img className="slider-image" src={Slider3} alt="Slide 3" />
        </div>
      </Slider>
    </div>
  );
};

export default SliderImg;
