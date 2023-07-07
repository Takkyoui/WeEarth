import React, { useContext } from "react";
import "./Menu.css";
import { StateContext } from "../../utils/State";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Menu() {
  const navigate = useNavigate();
  const { dispatch } = useContext(StateContext);
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "CLEAR_USER" });
    Swal.fire({
      icon: "success",
      title: "로그아웃",
      text: "다음에 또 만나요!",
    });
    navigate("/login");
  };
  return (
    <div className="loginedmenu">
      <div className="loginedmenu-container">
        <Link to="mypage" className="link">
          <div>내 정보</div>
        </Link>
        <Link to="mypost" className="link">
          <div>내 게시글</div>
        </Link>
        <Link to="#" className="link" onClick={logout}>
          <div>로그아웃</div>
        </Link>
      </div>
    </div>
  );
}

export default Menu;
