import React, { useState } from "react";
import "./UpdateUserModal.css";
import {
  useGetUserQuery,
  useUpdatePasswordMutation,
} from "../../../hooks/userHooks";
import Loading from "../../Common/Loading";
import Swal from "sweetalert2";
import { AiOutlineClose } from "react-icons/ai";

type UpdateUserModalProps = {
  closeModal: () => void;
};

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({ closeModal }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const updatePassword = useUpdatePasswordMutation();
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return Swal.fire({
        icon: "warning",
        title: "비밀번호와 비밀번호 확인이 다릅니다!",
        text: "다시 작성해 해주세요!",
      });
    }
    await updatePassword.mutate({ newPassword: password });
    alert("변경");
    closeModal();
  };

  return (
    <div className="usermodal-overlay">
      <div className="usermodal-modal">
        <div className="usermodal-modal-content">
          <div className="usermodal-modal-header">
            <h2 className="usermodal-modal-title">회원 정보 수정</h2>
            <button
              className="usermodal-modal-close-button"
              onClick={closeModal}
            >
              <AiOutlineClose />
            </button>
          </div>
          <form className="usermodal-modal-form" onSubmit={handleSubmit}>
            <div className="usermodal-modal-content">
              <label htmlFor="password" className="usermodal-modal-label">
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                className="usermodal-modal-input"
                value={password}
                onChange={handlePasswordChange}
                required
              />

              <label
                htmlFor="confirmPassword"
                className="usermodal-modal-label"
              >
                비밀번호 확인
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="usermodal-modal-input"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>

            <div className="usermodal-modal-buttons">
              <button type="submit" className="usermodal-modal-button">
                저장
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;
