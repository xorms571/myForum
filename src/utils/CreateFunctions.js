import { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const useCreate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const username = user.username;

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
    if (file) {
      formData.append("file", file);
    }
    formData.append("title", title);
    formData.append("content", content);
    formData.append("username", username);

    try {
      const response = await axios.post(
        "https://myforumserver-production.up.railway.app/api/posts",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Post created:", response.data);
      alert("게시물을 작성하였습니다.");
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
      if (error.response) {
        console.log("Server responded with status:", error.response.status);
        console.log("Server response data:", error.response.data);
      } else {
        console.log("Error message:", error.message);
      }
    }
  };
  return {
    title,
    setTitle,
    content,
    setContent,
    handleFileChange,
    handleSubmit,
  };
};