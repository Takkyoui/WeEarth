import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./DeleteUser.css";
import Swal from "sweetalert2";

type UpdateUserModalProps = {
  closeModal: () => void;
};

const DeleteUserModal: React.FC<UpdateUserModalProps> = ({ closeModal }) => {
  const withdraw = () => {
    Swal.fire({
      icon: "warning",
      title: "정말 회원탈퇴 하시겠습니까?",
      text: "기존 정보가 모두 삭제됩니다!",
      showCancelButton: true, // 취소 버튼 표시
      confirmButtonText: "확인", // 확인 버튼 텍스트
      cancelButtonText: "취소", // 취소 버튼 텍스트
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("회원 탈퇴되었습니다!", "", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("취소되었습니다.", "", "error");
      }
    });
  };
  return (
    <div className="usermodal-overlay">
      <div className="usermodal-modal">
        <div className="usermodal-modal-content">
          <div className="usermodal-modal-header">
            <h2 className="usermodal-modal-title">회원탈퇴</h2>
            <button
              className="usermodal-modal-close-button"
              onClick={closeModal}
            >
              <AiOutlineClose />
            </button>
          </div>
          <div className="withdraw" onClick={withdraw}>
            회원탈퇴하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
