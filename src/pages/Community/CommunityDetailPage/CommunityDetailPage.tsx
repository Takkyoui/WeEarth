import React, { useEffect, useState } from "react";
import "./CommunityDetailPage.css";
import { AiFillHeart } from "react-icons/ai";

import Comment from "../../../components/Comment/Comment";
import CommentPage from "../../CommentPage/CommentPage";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteComment,
  useDeleteCommunity,
  useGetCommentLength,
  useGetDetailCommunity,
  useToggleLike,
} from "../../../hooks/communityHook";
import Loading from "../../../components/Common/Loading";
import { BsTrashFill } from "react-icons/bs";
import Swal from "sweetalert2";
import getErrorMessage from "../../../utils/getError";
import apiClient from "../../../utils/apiClient";

const apiUrl = import.meta.env.VITE_API_URL;
const defaultpath = "uploads/profile.png";
function CommunityDetailPage() {
  const params = useParams();
  const { slug } = params;
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetDetailCommunity(slug as string);

  const [likes, setLikes] = useState(0);
  const [isUser, setIsUser] = useState(false);
  const { data: length } = useGetCommentLength(slug as string);
  useEffect(() => {
    if (data?.userId._id === JSON.parse(localStorage.getItem("user")!)._id) {
      setIsUser(true);
    }
    const fetchTotalLikes = async () => {
      try {
        // API를 호출하여 전체 좋아요 수를 가져옴
        const response = await apiClient.get(
          `/api/community/${slug}/likes/count`
        );

        setLikes(response.data.likesCount);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTotalLikes();
  });
  const deletePost = useDeleteCommunity();
  const deleteComment = useDeleteComment();
  const toggleLike = useToggleLike();

  const detelePost = () => {
    Swal.fire({
      title: "게시글 삭제",
      text: "게시글을 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost.mutateAsync(slug as string);
        deleteComment.mutateAsync(slug as string);
        Swal.fire("게시글이 삭제되었습니다!", "", "success");
      }
      navigate("/community");
    });
  };

  const handleToggleLike = async () => {
    try {
      const response = await toggleLike.mutateAsync({
        communityId: data!._id,
      });
      setLikes(response);
    } catch (error) {
      console.log(getErrorMessage(error));
    }
  };

  return isLoading ? (
    <Loading />
  ) : error ? (
    <div>Error</div>
  ) : (
    <div className="communitydetail">
      <div className="communitydetail-container">
        <div className="communitydetail-wrap">
          <div className="communitydetail-container-profile">
            {data!.userId.image ? (
              <img src={`${apiUrl}${data!.userId.image}`} />
            ) : (
              <img src={`${apiUrl}${defaultpath}`} />
            )}
            <div className="communitydetail-container-name-date">
              <div> {data!.userId.name}</div>
              <div> 작성일 {data!.createdAt.slice(0, 10)}</div>
            </div>
          </div>{" "}
          {isUser && (
            <div className="communitydetail-isUser">
              <div>
                <BsTrashFill onClick={detelePost} />
              </div>
            </div>
          )}
        </div>
        <br></br>
        <hr></hr>
        <div className="communitydetail-container-title">{data!.title}</div>
        <div className="communitydetail-container-content">{data!.content}</div>
        <div className="communitydetail-container-footer">
          <div>댓글 {" " + length}</div>

          <div className={"community-likes"} onClick={handleToggleLike}>
            <AiFillHeart />
            {likes}
          </div>
        </div>
        <Comment />
        <div>
          <CommentPage slug={slug as string} />
        </div>
      </div>
    </div>
  );
}

export default CommunityDetailPage;
