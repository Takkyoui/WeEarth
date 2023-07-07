import React from "react";
import "./MyPost.css";
import { useGetCommunityByUser } from "../../../hooks/communityHook";
import Loading from "../../../components/Common/Loading";
import PostCard from "../../../components/Post/PostCard";
function MyPost() {
  const { data, isLoading, error } = useGetCommunityByUser();
  console.log(data);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>error</div>;
  }
  return (
    <div className="mypost">
      <div className="mypost-container">
        <div className="mypost-title">내 게시글</div>
        <hr></hr>
        <div>
          {data!.map((post) => {
            return (
              <PostCard
                key={post._id}
                _id={post._id}
                title={post.title}
                content={post.content}
                date={post.createdAt}
                name={post.userId.name}
                image={post.userId.image}
                likes={post.likes.length}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MyPost;
