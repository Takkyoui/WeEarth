import React, { useRef, useState } from "react";
import "./CalneterPage.css";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useCreateDiary } from "../../hooks/calendarHooks";
import getErrorMessage from "../../utils/getError";
import Swal from "sweetalert2";
import CameraPng from "../../assets/camera.png";

function WriteCalendarPage() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [volume, setVolume] = useState(50);
  const createDiary = useCreateDiary();
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value, 10);
    setVolume(newVolume);
  };

  const submit = async () => {
    if (!title || !content || !image) {
      Swal.fire("모든 필수 사항을 채워주세요.");
      return;
    }
    const formData = new FormData();
    formData.append("score", String(volume));
    formData.append("title", title);
    formData.append("content", content);
    if (image !== null) {
      formData.append("image", image);
    }
    console.log({ selectedImage, content, title, volume });
    try {
      await createDiary.mutate(formData as any);
      Swal.fire("게시글이 생성되었습니다.");
    } catch (error) {
      Swal.fire(getErrorMessage(error));
      console.error(getErrorMessage(error));
    }
    setTitle("");
    setContent("");
    setSelectedImage(null);
    setVolume(50);

    setTimeout(() => {
      navigate("/calendar");
    }, 1000);
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };

      reader.readAsDataURL(file);
      setImage(file);
    }
  };
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  const day = ("0" + currentDate.getDate()).slice(-2);
  return (
    <div className="write-calendar">
      <div className="calender-container-left">
        <div className="write-calendar-header">
          <h1> 오늘의 일기</h1>
          <Link to="/calendar" style={{ fontSize: "1.3rem" }} className="link">
            <AiOutlineClose />
          </Link>
        </div>
        <div className="calendar-today">
          Today: {year}년 {month}월 {day}일
        </div>
        <div className="calendar-sound-bar">
          <strong>Today's score</strong>
          <div className="sound-bar">
            <input
              type="range"
              className="volume-slider"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
          <div className="volume-text">{volume} 점</div>
        </div>

        <div className="calender-container-memo">
          <div className="calender-container-image" onClick={handleImageClick}>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected Image"
                className="after-img"
              />
            )}
            {!selectedImage && (
              <div className="before-img">
                <img src={CameraPng} alt="Camera" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
          </div>

          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <textarea
            rows={8}
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div>
            <button className="calender-container-btn" onClick={submit}>
              일기작성
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriteCalendarPage;
