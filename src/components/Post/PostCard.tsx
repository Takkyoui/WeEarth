import React, { useEffect } from "react";
import "./PostCard.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetCommentLength } from "../../hooks/communityHook";
import Loading from "../Common/Loading";

import { TimeAgoFn } from "../../utils/time";
const apiUrl = import.meta.env.VITE_API_URL;
const defaultpath = "uploads/profile.png";
function PostCard({
  _id,
  title,
  content,
  date,
  name,
  image,
  likes,
}: {
  _id: string;
  title: string;
  content: string;
  date: string;
  name: string;
  image: string;
  likes: number;
}) {
  const { data: length, isLoading, error } = useGetCommentLength(_id);

  return isLoading ? (
    <Loading />
  ) : error ? (
    <div> error</div>
  ) : (
    <div className="postcard">
      <h5>{TimeAgoFn(date)}</h5>
      <Link to={`/community/${_id}`} className="link">
        <h2>{title}</h2>
      </Link>
      <Link to={`/community/${_id}`} className="link">
        <h3>{content} [더보기]</h3>
      </Link>

      <div className="postcard-footer">
        <div className="postcard-profile">
          {image ? (
            <img src={`${apiUrl}${image}`}></img>
          ) : (
            <img src={`${apiUrl}${defaultpath}`}></img>
          )}
          <h2>{name}</h2>
        </div>

        <div className="postcard-footer-etc">
          <div>
            <AiOutlineHeart /> {likes}
          </div>
          <div>
            <FaRegComment /> {length}
          </div>
        </div>
      </div>

      <hr></hr>
    </div>
  );
}

export default PostCard;
