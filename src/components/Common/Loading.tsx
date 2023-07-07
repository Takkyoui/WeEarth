import React from "react";
import "./Loading.css";

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="loader"></div>
      <h1>Loading</h1>
    </div>
  );
};

export default Loading;
