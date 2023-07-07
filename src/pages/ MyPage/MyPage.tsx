// MyPage.tsx
import React, { useContext, useEffect, useState } from "react";
import "./MyPage.css";
import { useGetUserQuery } from "../../hooks/userHooks";
import Loading from "../../components/Common/Loading";
import UpdateUserModal from "../../components/Modal/Update/UpdaqteUserModal";

import { AiTwotoneEdit } from "react-icons/ai";
import UpdateProfile from "../../components/Modal/Update/UpdateProfile";
import { StateContext } from "../../utils/State";

import DeleteUserModal from "../../components/Modal/Delete/DeleteUser";

const apiUrl = import.meta.env.VITE_API_URL;
const defaultpath = "uploads/profile.png";

function MyPage() {
  const { data, isLoading, error } = useGetUserQuery();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const { state, dispatch } = useContext(StateContext);

  useEffect(() => {
    // localStorage.removeItem("user");
    // localStorage.setItem("user", JSON.stringify(data));
    // localStorage.setItem("user", JSON.stringify(data));
    dispatch({ type: "UPDATE_USER", payload: data });
  }, [data]);
  const handleUpdate = (name: string, email: string) => {
    // 수정 로직 등 필요한 처리 수행
    console.log("수정하기:", name, email);
    // updateUser 함수 호출 후 필요한 로직 수행
  };

  const handleDelete = () => {
    // 삭제 로직 등 필요한 처리 수행
    console.log("회원탈퇴");
    // deleteUser 함수 호출 후 필요한 로직 수행
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="mypage">
      <div className="mypage-container">
        <div className="mypage-edit-btn">
          <div onClick={() => setShowUpdateProfileModal(true)}>
            <AiTwotoneEdit />
          </div>
        </div>

        <div className="mypage-my-profile">My Profile</div>

        <div className="mypage-myinfo">
          <div className="mypage-profile-image">
            {data!.image ? (
              <img src={`${apiUrl}${data!.image}`} alt="Profile" />
            ) : (
              <img src={`${apiUrl}${defaultpath}`} alt="Profile" />
            )}
          </div>
          <div className="mypage-profile-info">
            <div className="mypage-profile-info-box">
              <div className="mypage-profile-info-box-f">이름</div>
              <div className="mypage-profile-info-box-b">{data!.name}</div>
            </div>
            <div className="mypage-profile-info-box">
              <div className="mypage-profile-info-box-f">이메일</div>
              <div className="mypage-profile-info-box-b">{data!.email}</div>
            </div>
          </div>
        </div>
        <div className="mypage-profile-info-btn">
          <button onClick={() => setShowUpdateModal(true)}>
            비밀번호 변경
          </button>
          <button onClick={() => setShowDeleteModal(true)}>회원탈퇴</button>
        </div>
      </div>
      {showUpdateModal && (
        <UpdateUserModal closeModal={() => setShowUpdateModal(false)} />
      )}
      {showUpdateProfileModal && (
        <UpdateProfile closeModal={() => setShowUpdateProfileModal(false)} />
      )}
      {showDeleteModal && (
        <DeleteUserModal closeModal={() => setShowDeleteModal(false)} />
      )}
    </div>
  );
}

export default MyPage;
