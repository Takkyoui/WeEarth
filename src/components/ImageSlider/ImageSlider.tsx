import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ImageSlider.css";
import image1 from "../../assets/dog.jpeg";
import image2 from "../../assets/homepageEco.jpeg";
import image3 from "../../assets/bottle.jpg";

function ImageSlider() {
  return (
    <Carousel
      autoPlay={true}
      interval={3000}
      infiniteLoop={true}
      showThumbs={false}
    >
      <div className="limageslider">
        <img src={image1} alt="Image 1" />
        <div> #오늘의봉사점수 #100점 </div>
      </div>
      <div className="limageslider">
        <img src={image2} alt="Image 2" />
        <div> #에코백사용 #환경지키기</div>
      </div>
      <div className="limageslider">
        <img src={image3} alt="Image 3" />
        <div> #텀블러사용 #일회용컵 #줄이기 </div>
      </div>
    </Carousel>
  );
}

export default ImageSlider;
