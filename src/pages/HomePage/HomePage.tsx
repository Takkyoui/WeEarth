import React from "react";
import "./HomePage.css";
import { AiOutlineCheck } from "react-icons/ai";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import FooterBanner from "../../components/Footer/FooterBanner";

import newImage from "../../assets/news.png";
import mainbanner from "../../assets/mainbanner.png";
import mainbanner2 from "../../assets/mainbanner2.png";
import mainbanner3 from "../../assets/mainbanner3.png";

const recordList = ["재활용 잘하기!", "쓰레기 줍기!", "텀블러 이용하기"];
function HomePage() {
  return (
    <>
      <div className="homepage">
        <div className="homepage-main-banner">
          <div className="homepage-main-banner-left">
            <div className="homepage-main-banner-left-title">
              환경을 위한 <br /> 세단계의 미션
              <br /> 매일 실천
              <div>WeEearth</div>
              <div className="homepage-main-banner-btn"></div>
            </div>
          </div>
          <div className="homepage-main-banner-right">
            <div className="homepage-main-banner-right-container">
              <img src={mainbanner}></img>
            </div>
          </div>
        </div>

        <div className="homepage-main-banner">
          <div className="homepage-main-banner-right">
            <div className="homepage-main-banner-right-container">
              <img src={mainbanner2}></img>
            </div>
          </div>
          <div className="homepage-main-banner-left">
            <div className="homepage-main-banner-left-info">
              <h1>
                <span>Misson 1</span>
                <br></br>일기쓰기{" "}
              </h1>
              <p>하루 동안 환경을 위해 한 것들을 간단히 작성 후 점수주기</p>
              {recordList.map((list: string) => {
                return (
                  <div key={list} className="homepage-banner-checkrecord">
                    <AiOutlineCheck />
                    {list}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="homepage-main-banner">
          <div className="homepage-main-banner-left">
            <div className="homepage-main-banner-left-info">
              <h1>
                <span>Misson 2</span>
                <br></br>커뮤니티
              </h1>
              <p>내가 실천한 것들을 공유해요</p>
              <ImageSlider />
            </div>
          </div>
          <div className="homepage-main-banner-right">
            <div className="homepage-main-banner-right-container">
              <img src={mainbanner3}></img>
            </div>
          </div>
        </div>
        <div className="homepage-main-banner">
          <div className="homepage-main-banner-right">
            <div className="homepage-main-banner-right-container">
              <img src={newImage}></img>
              <h1>WeEarth News!</h1>
            </div>
          </div>
          <div className="homepage-main-banner-left">
            <div className="homepage-main-banner-left-info">
              <h1>
                <span>Misson 3</span>
                <br></br>환경 뉴스!
              </h1>
              <p>환경 관련 소식을 매일 접해요!</p>
            </div>
          </div>
        </div>
      </div>
      <FooterBanner />
    </>
  );
}

export default HomePage;
