import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    profileImage: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user"); // 사용자 이름도 가져오기
    if (token && username) {
      setIsAuthenticated(true);
      setAuthToken(token);
      setUser({ username }); // 상태에 사용자 정보 설정
    }
  }, []);

  const login = (token, username) => {
    setIsAuthenticated(true);
    setAuthToken(token);
    setUser({ username }); // 사용자 이름을 객체로 저장
    localStorage.setItem("token", token);
    localStorage.setItem("user", username); // 로컬 스토리지에 사용자 이름 저장
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthToken(null);
    setUser(null); // 사용자 정보 초기화
    localStorage.removeItem("token"); // 로그아웃 시 토큰 삭제
    localStorage.removeItem("user"); // 사용자 이름 삭제
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, authToken, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
