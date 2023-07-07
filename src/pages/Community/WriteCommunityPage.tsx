import React, { useState } from "react";
import "./WriteCommunityPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useCreateCommunity } from "../../hooks/communityHook";
import getErrorMessage from "../../utils/getError";
import Swal from "sweetalert2";
function WriteCommunityPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const createCommunity = useCreateCommunity();
  const submit = async () => {
    try {
      await createCommunity.mutate({ title, content });
      Swal.fire("작성완료했습니다!");
      setTimeout(() => {
        navigate("/community");
      }, 1000);
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  return (
    <div className="writecommunity">
      <div className="writecommunity-container">EarthSNS</div>
      <div className="writecommunity-write">
        <hr></hr>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <textarea
          placeholder="내용"
          rows={8}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
        <hr></hr>
        <div className="writecommunity-btn">
          <button onClick={submit}>작성</button>
          <Link to="/community" className="link">
            <button style={{ backgroundColor: "#eaeaea" }}>취소</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WriteCommunityPage;
