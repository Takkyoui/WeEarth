import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Earth from "../../assets/dog.jpeg";
function LongImageSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    centerMode: true,
    variableWidth: true,
    adaptiveHeight: true,
  };

  return (
    <div>
      <Slider {...settings}>
        <div>
          <img src={Earth} />
        </div>
      </Slider>
    </div>
  );
}

export default LongImageSlider;
