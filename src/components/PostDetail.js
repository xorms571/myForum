import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import dayjs from "dayjs";
import Comments from "./Comments";

const PostDetail = ({ posts }) => {
  // posts를 props로 다시 추가
  const { id } = useParams(); // URL 파라미터에서 ID 가져오기
  const [post, setPost] = useState(null);
  const [click, setClick] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://myforumserver.onrender.com/api/posts/${id}`
        );
        setPost(response.data);
        setUpdatedContent(response.data.content); // 게시물 내용을 초기화
      } catch (error) {
        console.error("에러:", error); // 에러 로깅
      }
    };

    const foundPost = posts.find((p) => p._id === id);
    if (foundPost) {
      setPost(foundPost);
      setUpdatedTitle(foundPost.title);
      setUpdatedContent(foundPost.content); // 게시물 내용을 초기화
    } else {
      fetchPost();
    }
  }, [id, posts]);

  const handleEdit = async () => {
    try {
      await axios.put(`https://myforumserver.onrender.com/api/posts/${id}`, {
        title: updatedTitle, // title 추가
        content: updatedContent,
        username: user.username, // username 추가
      });
      alert("게시물이 수정되었습니다.");
      navigate("/"); // 수정 후 게시물 목록으로 리다이렉트
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://myforumserver.onrender.com/api/posts/${id}`, {
        // postId 대신 id 사용
        data: { username: user.username }, // 현재 사용자의 username
      });
      alert("게시물이 삭제되었습니다.");
      navigate("/"); // 삭제 후 게시물 목록으로 리다이렉트
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!post) return <div>로딩중...</div>; // 로딩 상태 표시

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {click ? (
        <>
          <div className="text-sm mb-4 font-bold flex justify-between">
            <h2 className="text-lg">게시물 수정</h2>
            <button onClick={() => setClick(false)}>뒤로가기</button>
          </div>
          <div className="flex flex-col gap-4 h-full justify-between p-4 bg-white bg-opacity-80 rounded-lg shadow">
            <input
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className="bg-white border rounded-lg px-4 py-2 text-sm"
            />
            <textarea
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
              className="bg-white h-full border rounded-lg px-4 py-2 text-sm overflow-y-scroll"
            />
            <div className="text-end">
              <button onClick={handleEdit}>완료</button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-4 h-full">
          <div className="flex justify-between text-sm">
            <h2 className="text-lg">
              제목: <b>{post.title}</b>
            </h2>
            <button onClick={() => navigate("/")}>뒤로가기</button>
          </div>
          <div className="flex flex-col justify-between rounded-xl overflow-hidden text-sm shadow h-full bg-white bg-opacity-80">
            <div className="flex justify-between items-center px-4 py-2">
              <div className="text-xs">
                <p className="mb-1">
                  작성자: <b>{post.username}</b>
                </p>
                <p>
                  날짜:{" "}
                  <b>{dayjs(post.createdAt).format("YYYY-MM-DD / HH:mm")}</b>
                </p>
              </div>
              {user && user.username === post.username && (
                <div>
                  <button onClick={() => setClick(true)}>수정</button>
                  <button onClick={handleDelete}>삭제</button>
                </div>
              )}
            </div>
            <div className="h-full overflow-y-scroll bg-white border-y">
              <img
                className="object-cover"
                src={post.fileUrl}
                alt={post._id}
              ></img>
              <p className="p-2">{post.content}</p>
            </div>
            <Comments postId={id} postTitle={post.title} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
