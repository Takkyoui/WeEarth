import React, { useState, FormEvent } from "react";
import "./RegisterPage.css";
import { useRegisterUserMutation } from "../../hooks/userHooks";
import getErrorMessage from "../../utils/getError";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import environment from "../../assets/environment.png";

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const registerHook = useRegisterUserMutation();

  const register = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== checkPassword) {
      alert("비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await registerHook.mutateAsync({
        email,
        name,
        password,
      });

      console.log(response);
      Swal.fire({
        title: "회원가입이 완료되었습니다.",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/login");
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      Swal.fire({
        icon: "warning",
        title: errorMessage,
        text: "다른 이메일을 사용해 주세요!",
      });
      console.error("회원 가입 요청 에러:", errorMessage);
    }
  };

  return (
    <div className="register">
      <div className="register-container">
        <div className="register-container-right">
          <img src={environment} alt="Environment" />
          <h2>Register and Save together</h2>
        </div>

        <div className="register-container-left">
          <div className="register-container-left-header">
            <h3>Register</h3>
          </div>
          <form className="login-form" onSubmit={register}>
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
              <label htmlFor="login-name">Name</label>
              <input
                type="text"
                id="login-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              <label htmlFor="login-check-password">Check Password</label>
              <input
                type="password"
                id="login-check-password"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
                required
              />
            </div>
            <div className="login-form-group">
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
