import React, { useState, useRef, useEffect } from "react";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../hooks/userHooks";
import "./UpdateProfile.css";
import Loading from "../../Common/Loading";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const apiUrl = import.meta.env.VITE_API_URL;

type UpdateProfileProps = {
  closeModal: () => void;
};

const UpdateProfile: React.FC<UpdateProfileProps> = ({ closeModal }) => {
  const { data, isLoading, error } = useGetUserQuery();
  const defaultpath = "uploads/profile.png";
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setName(data!.name);
    if (data!.image) {
      setPreviewImage(`${apiUrl}${data!.image}`);
    } else {
      setPreviewImage(`${apiUrl}${defaultpath}`);
    }
  }, [data]);

  const { mutate: updateUser } = useUpdateUserMutation();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }

    await updateUser(formData as any);
    Swal.fire("회원정보가 수정되었습니다");
    setTimeout(() => {
      closeModal();
      window.location.reload();
    }, 1000);
  };

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>error</div>;
  }
  return (
    <div className="userprofile-update-profile-modal">
      <div className="userprofile-update-profile-modal-content">
        <h2 className="userprofile-update-profile-modal-title">
          프로필 업데이트
        </h2>
        <form
          className="userprofile-update-profile-modal-form"
          onSubmit={handleSubmit}
        >
          <div className="userprofile-update-profile-modal-form-group">
            <label
              htmlFor="name"
              className="userprofile-update-profile-modal-label"
            >
              이름
            </label>
            <input
              id="name"
              type="text"
              className="userprofile-update-profile-modal-input"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="userprofile-update-profile-modal-form-group">
            <label
              htmlFor="image"
              className="userprofile-update-profile-modal-label"
              onClick={handleImageClick}
            >
              프로필 사진
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="userprofile-update-profile-modal-input"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="프로필 사진 미리보기"
                className="userprofile-update-profile-modal-preview"
                onClick={handleImageClick}
              />
            )}
          </div>
          <div className="userprofile-update-profile-modal-buttons">
            <button
              type="submit"
              className="userprofile-update-profile-modal-button"
            >
              저장
            </button>
            <button
              type="button"
              className="userprofile-update-profile-modal-button"
              onClick={closeModal}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
