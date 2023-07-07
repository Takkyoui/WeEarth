import React from "react";
import { useGetComment } from "../../hooks/communityHook";

import CommentBox from "../../components/CommentBox/CommentBox";
import Loading from "../../components/Common/Loading";

function CommentPage({ slug }: { slug: string }) {
  const { data, isLoading, error } = useGetComment(slug);
  console.log(data);
  return isLoading ? (
    <Loading />
  ) : error ? (
    <div> Error</div>
  ) : (
    <div>
      {data!.map((v) => {
        return (
          <CommentBox
            key={v._id}
            _id={v._id}
            comment={v.content}
            name={v.userId.name}
            date={v.createdAt}
            userId={v.userId._id}
            image={v.userId.image}
          />
        );
      })}
    </div>
  );
}

export default CommentPage;
