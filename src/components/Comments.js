// Comments.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

const Comments = ({ postId, postTitle }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // 댓글 불러오기
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `https://myforumserver.onrender.com/api/posts/${postId}/comments`
        );
        setComments(res.data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };
    fetchComments();
  }, [postId]);

  // 댓글 작성 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment) return alert("댓글을 입력하세요.");

    try {
      const res = await axios.post(
        `https://myforumserver.onrender.com/api/posts/${postId}/comments`,
        { username: user.username, content: newComment }, // username 추가
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // JWT 토큰을 Authorization 헤더에 포함
          },
        }
      );
      setComments([...comments, res.data]); // 새 댓글을 추가
      setNewComment(""); // 입력 필드 초기화
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center px-4 py-3">
        <h3 className="font-bold">댓글 ({comments.length})</h3>
        <button onClick={() => setShowComments(!showComments)} className="ml-0">
          {showComments ? "접기" : "펼치기"}
        </button>
      </div>
      {showComments && (
        <div
          className="flex flex-col justify-between gap-4 absolute bg-stone-100 top-6 rounded-xl overflow-hidden py-4"
          style={{ width: "calc(100% - 48px)", height: "calc(100% - 48px)" }}
        >
          <div className="flex justify-between items-center mx-4">
            <h3 className="text-md font-bold">
              {postTitle} 댓글 ({comments.length})
            </h3>
            <button
              onClick={() => setShowComments(!showComments)}
              className="ml-0"
            >
              {showComments ? "접기" : "펼치기"}
            </button>
          </div>
          {/* 댓글 목록 */}
          <ul className="h-full overflow-y-scroll flex flex-col gap-2 bg-white border-y p-4">
            {comments.map((comment, index) => (
              <li
                key={comment._id}
                className={`${
                  index === comments.length - 1 ? null : "border-b"
                } pb-2`}
              >
                <p className="break-words">
                  <b>{comment.username}</b>
                  {": " + comment.content}
                </p>
                <p className="text-xs mt-2">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
          {/* 댓글 작성 폼 */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-end bg-white rounded-lg overflow-hidden border mx-4"
          >
            <textarea
              placeholder="댓글 추가..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="p-2 w-full overflow-y-scroll"
            />
            <div className="flex justify-between w-full items-center">
              <p className="ml-2 text-xs text-slate-400">
                {newComment.length > 0 && "글자 수: " + newComment.length}
              </p>
              <button
                type="submit"
                className="ml-0 w-fit bg-slate-100 shadow-none border"
                onClick={() => {
                  if (!isAuthenticated) {
                    alert("로그인이 필요합니다.");
                    navigate("/login");
                  } else {
                    return;
                  }
                }}
              >
                댓글 작성
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
