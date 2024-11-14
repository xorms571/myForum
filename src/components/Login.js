import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "https://myforumserver-production.up.railway.app/api/auth/login",
        {
          username,
          password,
        }
      );
      const { token, username: loggedInUsername } = response.data; // 응답에서 token과 username 가져오기
      login(token, loggedInUsername); // login 함수에 token과 username 전달
      alert("로그인 성공");
      navigate("/"); // 성공 시 이동할 경로
    } catch (error) {
      setError("로그인 오류: " + error.response.data);
      console.error("로그인 오류:", error);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="shadow bg-white bg-opacity-80 p-4 rounded-lg flex flex-col gap-4 items-end min-w-80"
    >
      <div className="flex justify-between font-bold w-full">
        <h2 className="text-xl">로그인</h2>
        <button onClick={() => navigate("/")}>뒤로가기</button>
      </div>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full bg-white border rounded-lg px-4 py-2 text-sm"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full bg-white border rounded-lg px-4 py-2 text-sm"
      />
      <div>
        <button type="submit">로그인</button>
        <button onClick={() => navigate("/register")}>회원가입</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default Login;
