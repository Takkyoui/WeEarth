import React, { useState, FormEvent, useContext } from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../hooks/userHooks";
import Swal from "sweetalert2";
import getErrorMessage from "../../utils/getError";
import { StateContext } from "../../utils/State";
import mainlogo from "../../assets/mainlogo.png";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginHook = useLoginUserMutation();
  const { dispatch } = useContext(StateContext);

  const login = async (e: FormEvent) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await loginHook.mutateAsync({ email, password });
      if (response!) {
        Swal.fire({
          title: "로그인되었습니다",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        dispatch({ type: "SET_USER", payload: response });

        localStorage.setItem("user", JSON.stringify(response));
        navigate("/");
      } else {
        Swal.fire({
          icon: "warning",
          title: "로그인에 실패했습니다",
          text: "다시 로그인 해주세요!",
        });
      }
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      Swal.fire({
        icon: "warning",
        title: errorMessage,
        text: "다시 로그인 해주세요!",
      });
      console.error("로그인 에러:", errorMessage);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-container-left">
          <div className="login-container-left-header">
            <h3>Login</h3>
          </div>

          <form className="login-form" onSubmit={login}>
            <div className="login-form-group">
              <label htmlFor="login-email">Email</label>
              <input
                type="text"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="login-form-group">
              <button type="submit">Login</button>
            </div>
          </form>
          <div>
            아직 회원이 아니신가요? <Link to="/register">회원가입하기</Link>
          </div>
        </div>
        <div className="login-container-right">
          <img src={mainlogo} alt="Main Logo" />
          <h1>We can save Earth!</h1>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
