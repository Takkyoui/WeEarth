import React, { useContext } from "react";
import "./CommentBox.css";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useDeleteOneComment } from "../../hooks/communityHook";
import getErrorMessage from "../../utils/getError";
import { StateContext } from "../../utils/State";
const apiUrl = import.meta.env.VITE_API_URL;
const defaultpath = "uploads/profile.png";

function CommentBox({
  _id,
  comment,
  name,
  date,
  userId,
  image,
}: {
  _id: string;
  comment: string;
  name: string;
  date: string;
  userId: string;
  image: string;
}) {
  const deleteCommentMutation = useDeleteOneComment();
  const {
    state: { user },
  } = useContext(StateContext);

  const deleteComment = () => {
    try {
      deleteCommentMutation.mutate(_id);
      alert("댓글 삭제 ");
    } catch (error) {
      alert(getErrorMessage(error));
    }
  };
  return (
    <div className="commentbox">
      <div className="commentbox-container">
        <div className="commentbox-container-header">
          <div className="communitydetail-container-profile">
            {image ? (
              <img src={`${apiUrl}${image}`}></img>
            ) : (
              <img src={`${apiUrl}${defaultpath}`}></img>
            )}
            <div className="communitydetail-container-name-date">
              <div> {name}</div>
              <div> 작성일 {date.slice(0, 10)}</div>
            </div>
          </div>
          {userId === user!._id && (
            <div onClick={deleteComment}>
              <BsFillTrash3Fill />
            </div>
          )}
        </div>
        <br></br>
        <hr></hr>
        <div className="commentbox-content">{comment}</div>
      </div>
    </div>
  );
}

export default CommentBox;
