// client/src/components/CreatePost.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null); // 파일 상태 추가
  const { user } = useAuth();
  const username = user.username;
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("파일 크기가 5MB를 초과합니다.");
      return;
    }
    setFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('username', username);
  
    try {
      const response = await axios.post('https://myforumserver-production.up.railway.app/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Post created:', response.data);
      alert('게시물을 작성하였습니다.')
      navigate('/')
    } catch (error) {
      console.error('Error creating post:', error);
      if (error.response) {
        console.log('Server responded with status:', error.response.status);
        console.log('Server response data:', error.response.data);
      } else {
        console.log('Error message:', error.message);
      }
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="h-full w-full flex flex-col justify-between">
      <div className="flex justify-between mb-4 font-bold">
        <h2 className="text-lg font-bold">게시물 작성</h2>
        <button onClick={() => navigate("/")}>뒤로가기</button>
      </div>
      <div className="bg-white bg-opacity-80 flex flex-col gap-4 p-4 shadow rounded-lg h-full justify-between">
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="bg-white border rounded-lg px-4 py-2 text-sm"
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="bg-white h-full border rounded-lg px-4 py-2 text-sm overflow-y-scroll"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="bg-white border rounded-lg px-4 py-2 text-sm"
        />
        <div className="text-end">
          <button type="submit">완료</button>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
