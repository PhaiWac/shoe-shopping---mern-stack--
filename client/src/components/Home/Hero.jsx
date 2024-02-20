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
    fade : true

  };
  return (
    <div className="container p-5 mx-auto slider-container">
      <Slider {...settings}>
        <div className=''>
            <img src="/image/421493290_1379489012707657_9117900506802243751_n.png" className='object-cover w-full bg-no-repeat my-auto' />
        </div>
        
        <div className='h-24 md:h-84'>
            <img src="/image/423454434_358646157083767_3231056708648309276_n.png" className='object-cover w-full bg-no-repeat' />
        </div>
        
        <div className='h-24 md:h-84'>
            <img src="/image/423454927_951800673138160_5098724931172533239_n.png" className='object-cover w-full bg-no-repeat' />
        </div>
        
    </Slider>
    </div>
  );
}

export default Hero