import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트
import Pagination from "./Pagination";
import { useAuth } from "../utils/AuthContext";

const PostList = ({ posts, fetchPosts }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [postsPerPage, setPostsPerPage] = useState(3); // 페이지당 보여줄 게시물 수
  const [search, setSearch] = useState(""); // 입력한 검색어
  const [filteredPosts, setFilteredPosts] = useState(posts); // 필터된 게시물 상태
  const { isAuthenticated } = useAuth();
  // posts가 변경될 때마다 필터된 게시물을 초기화
  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);
  const postsFilter = () => {
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPosts(filtered);
  };
  const handlePostClick = (post) => {
    navigate(`/posts/${post._id}`); // 클릭한 포스트의 ID로 이동
  };
  const sortedFilteredPosts = filteredPosts.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  // 현재 페이지에 해당하는 게시물 가져오기
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedFilteredPosts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  // 페이지 변경 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    // 창 크기 변경 시 동적으로 postsPerPage 업데이트
    const handleResize = () => {
      if (window.innerHeight > 850) {
        setPostsPerPage(5);
      } else if (window.innerHeight > 750) {
        setPostsPerPage(4);
      } else {
        setPostsPerPage(3);
      }
    };
    // 창 크기 변경 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);
    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const createButtonClick = () => {
    if (isAuthenticated) {
      navigate("/create");
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="w-full flex flex-col justify-between h-full">
      <ul className="flex flex-col gap-4">
        <div className="flex justify-between gap-2 text-sm">
          <div className="flex justify-between rounded-lg overflow-hidden w-8/12">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="검색어를 입력하세요."
              className="px-2 w-9/12"
            />
            <button
              onClick={postsFilter}
              className="border-l ml-0 px-2 w-3/12 rounded-none"
            >
              검색
            </button>
          </div>
          <button onClick={createButtonClick} className="ml-0 px-2 w-4/12">
            게시물 작성하기
          </button>
        </div>
        {currentPosts.map((post) => (
          <li
            className="h-28 flex justify-between items-center overflow-hidden text-sm shadow cursor-pointer bg-white bg-opacity-80 hover:bg-opacity-100 rounded-xl"
            key={post._id}
            onClick={() => handlePostClick(post)}
          >
            <div className="flex flex-col gap-1 pl-4">
              <h3>
                제목: <b>{post.title}</b>
              </h3>
              <p>
                작성자: <b>{post.username}</b>
              </p>
              <p>{new Date(post.createdAt).toLocaleString()}</p>
            </div>
            {post.fileUrl && (
              <img
                className="w-5/12 h-full object-cover"
                src={post.fileUrl}
                alt={post._id}
              ></img>
            )}
          </li>
        ))}
      </ul>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={filteredPosts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default PostList;
