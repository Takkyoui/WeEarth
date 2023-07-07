import React from "react";
import "./Footer.css";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillPhone,
  AiOutlineMail,
} from "react-icons/ai";
import { RiKakaoTalkFill } from "react-icons/ri";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-logo">
              <strong>WeEearth</strong> <div className="footer-links"></div>
            </div>
          </div>
          <div className="footer-right">
            <div className="footer-contact">
              <span>
                <AiOutlineMail />: weearth@gmail.com
              </span>
              <br></br>
              <span>
                <AiFillPhone />: 02-456-7890
              </span>
            </div>
            <hr></hr>
            <div className="footer-social">
              <a href="https://www.facebook.com">
                <AiFillFacebook />
              </a>
              <a href="https://www.instagram.com">
                <AiFillInstagram />
              </a>
              <a href="https://www.instagram.com">
                <RiKakaoTalkFill />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">
            &copy; 2023 WeEearth. All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
