import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { StateContext } from "../../utils/State";
import Menu from "../Menu/Menu";
import mainLogo from "../../assets/mainlogo.png";
import { useGetUserQuery } from "../../hooks/userHooks";
import Loading from "../Common/Loading";
const apiUrl = import.meta.env.VITE_API_URL;
const defaultpath = "uploads/profile.png";
function Header() {
  const [selectedMenu, setSelectedMenu] = useState("");
  const {
    state: { user },
  } = useContext(StateContext);
  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  };
  const [showMenu, setShowMenu] = useState(false);
  const handleMenuOpen = () => {
    setShowMenu(true);
  };

  const handleMenuClose = () => {
    setShowMenu(false);
  };

  return (
    <div className="header">
      <div className="header-container">
        <div className="header-logo" onClick={() => handleMenuClick("")}>
          <Link to="/" className="link">
            <img src={mainLogo}></img>
          </Link>
          <Link to="/" className="link">
            <strong>WeEearth</strong>
          </Link>
        </div>

        <div className="header-menu">
          <div
            className={
              selectedMenu === "기록하기" ? "header-menu-selected" : ""
            }
            onClick={() => handleMenuClick("기록하기")}
          >
            <Link to="calendar" className="link">
              Diary
            </Link>
          </div>
          <div
            className={
              selectedMenu === "커뮤니티" ? "header-menu-selected" : ""
            }
            onClick={() => handleMenuClick("커뮤니티")}
          >
            <Link to="community" className="link">
              Community
            </Link>
          </div>
          <div
            className={selectedMenu === "뉴스" ? "header-menu-selected" : ""}
            onClick={() => handleMenuClick("뉴스")}
          >
            <Link to="news" className="link">
              news
            </Link>
          </div>
        </div>
        <div className="header-nav">
          <>
            {user ? (
              <div
                className="header-logined"
                onMouseOver={handleMenuOpen}
                onMouseLeave={handleMenuClose}
              >
                <Link to="/mypage" className="link">
                  <div className="header-hellouser">Hello! {user.name}</div>
                </Link>
                {user.image ? (
                  <img src={`${apiUrl}${user.image}`}></img>
                ) : (
                  <img src={`${apiUrl}${defaultpath}`}></img>
                )}
              </div>
            ) : (
              <Link to="./login">
                <button> 시작하기 </button>
              </Link>
            )}
            {showMenu && (
              <div
                className="header-side-menu"
                onMouseOver={handleMenuOpen}
                onMouseLeave={handleMenuClose}
              >
                <Menu />
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
}

export default Header;
