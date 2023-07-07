import React, { useState } from "react";
import "./Comment.css";
import { useCreateComment } from "../../hooks/communityHook";
import { useParams } from "react-router-dom";
import getErrorMessage from "../../utils/getError";
function Comment() {
  const params = useParams();
  const { slug } = params;
  const [comment, setComment] = useState("");
  const makeblanck = () => {
    setComment("");
  };
  const createComment = useCreateComment();
  const creatComment = () => {
    if (comment === "") {
      return alert("댓글을 입력해 주세요");
    }
    try {
      createComment.mutateAsync({
        communityId: slug as string,
        content: comment,
      });
      alert("작성 성공");
      makeblanck();
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };
  return (
    <div className="comment">
      <div className="comment-container">
        <input
          type="text"
          placeholder="댓글을 입력해 주세요"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        ></input>
        <div className="comment-container-btn">
          <button onClick={makeblanck}>취소</button>
          <button onClick={creatComment}>댓글</button>
        </div>
      </div>
    </div>
  );
}

export default Comment;
