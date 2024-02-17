import React from 'react'
import Slider from "react-slick";

function Hero() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    autoplay: true,

  };
  return (
    <div className="container p-5 mx-auto slider-container">
      <Slider {...settings}>
        <div className='bg-red-100 h-24 md:h-96'>
            <img src="https://img.freepik.com/free-vector/modern-sale-banner-with-text-space-area_1017-27331.jpg" className='object-cover w-full' />
        </div>
        <div className='bg-red-200 h-24 md:h-96'>
            <h3>2</h3>
        </div>
    </Slider>
    </div>
  );
}

export default Hero