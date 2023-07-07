import React, { useEffect, useState } from "react";
import "./CommunityPage.css";
import { BiSearch } from "react-icons/bi";
import { GoPencil } from "react-icons/go";
import PostCard from "../../components/Post/PostCard";
import { Link } from "react-router-dom";
import { useGetCommunity, useSearchCommunity } from "../../hooks/communityHook";
import Loading from "../../components/Common/Loading";
import SearchBar from "../../components/Search/SearchBar";

function CommunityPage() {
  // const { data, isLoading, error } = useGetCommunity();

  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } = useSearchCommunity(searchTerm as string);
  console.log(data);
  useEffect(() => {
    console.log(searchTerm);
  }, [searchTerm]);

  const handleSearch = (term: string): void => {
    setSearchTerm(term);
    // 여기서 검색 관련 로직을 처리하거나 필요한 동작을 수행할 수 있습니다.
  };
  return isLoading ? (
    <Loading />
  ) : error ? (
    <div>error</div>
  ) : (
    <div className="community">
      <div className="community-container">
        <SearchBar onSearch={handleSearch} />
        <div className="community-sector">
          <div className="community-write">
            <Link to="/writecommunity">
              <button>
                <GoPencil /> 작성하기
              </button>
            </Link>
          </div>
          <hr></hr>
        </div>

        <div className="community-list">
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

export default CommunityPage;
