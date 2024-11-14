import React from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

const IsAuthenticated = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(); // 로그아웃 처리
    navigate("/");
  };
  return (
    <div className="text-sm text-end">
      {!isAuthenticated ? (
        <div>
          <button onClick={() => navigate("/login")}>로그인</button>
          <button onClick={() => navigate("/register")}>회원가입</button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <p>
            어서오세요, <b>{user.username}</b>님
          </p>
          <div>
            <button onClick={handleLogout}>로그아웃</button>
            <button onClick={() => navigate("/delete-account")}>
              회원탈퇴
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IsAuthenticated;
