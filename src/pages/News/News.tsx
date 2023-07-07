import React from "react";
import "./News.css";
import news1 from "../../assets/myScore.png";
import news from "../../assets/news.png";
import { useGetNews } from "../../hooks/newsHooks";
import Loading from "../../components/Common/Loading";
import { Link } from "react-router-dom";
function News() {
  const { data: news, isLoading, isError, error } = useGetNews();

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div> error</div>;
  }
  return (
    <div className="news">
      <div className="news-container">
        <div className="news-container-header">
          <img src={news1}></img>
          <div className="news-container-title"> Environment News</div>
          <img src={news1}></img>
        </div>

        {news!.map((v) => {
          return (
            <>
              <hr></hr>
              <Link to={v!.link} style={{ color: "black" }}>
                <div className="news-content">
                  <div className="news-cotent-title">{v.title}</div>
                  <div className="news-cotent-summary">{v.summary}</div>
                </div>
              </Link>
              <hr></hr>
            </>
          );
        })}
        <div className="news-footer">
          {" "}
          <div>NewEarth News crawling from naver</div>
        </div>
      </div>
    </div>
  );
}

export default News;
