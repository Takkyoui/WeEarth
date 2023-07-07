import React from "react";
import "./FooterBanner.css";
import { Link } from "react-router-dom";

function FooterBanner() {
  return (
    <div className="footerbanner">
      <h2>지금바로 시작해요!</h2>
      <Link to="/login">
        <button> 시작하기</button>
      </Link>
    </div>
  );
}

export default FooterBanner;
