import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://myforumserver-production.up.railway.app/api/auth/register", {
        username,
        password,
      });
      alert("회원가입 성공");
    } catch (error) {
      console.error("회원가입 오류:", error);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="shadow bg-white bg-opacity-80 p-4 rounded-lg flex flex-col gap-4 items-end min-w-80"
    >
      <div className="flex justify-between font-bold w-full">
        <h2 className="text-xl">회원가입</h2>
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
        <button onClick={() => navigate("/login")}>로그인</button>
        <button type="submit">회원가입</button>
      </div>
    </form>
  );
};

export default Register;
