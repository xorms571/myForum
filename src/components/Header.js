import React, { useEffect, useState } from "react";
import IsAuthenticated from "./IsAuthenticated";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [isLoginOrRegisterPath, setIsLoginOrRegisterPath] = useState(true);
  useEffect(() => {
    if (
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    ) {
      setIsLoginOrRegisterPath(false);
    } else {
      setIsLoginOrRegisterPath(true);
    }
  }, [location.pathname]);
  const gradients = {
    red: [
      "bg-gradient-to-tl",
      "from-indigo-300",
      "via-purple-300",
      "to-pink-300",
    ],
    blue: [
      "bg-gradient-to-tl",
      "from-indigo-300",
      "via-sky-300",
      "to-emerald-300",
    ],
    yellow: [
      "bg-gradient-to-br",
      "from-red-300",
      "via-amber-300",
      "to-orange-300",
    ],
    white: [
      "bg-gradient-to-tl",
      "from-zinc-300",
      "via-slate-300",
      "to-stone-100",
    ],
  };

  const applyBackgroundColor = (color) => {
    // 기존 클래스 제거
    document.body.classList.remove(
      ...[
        "bg-gradient-to-bl",
        "bg-gradient-to-tr",
        "bg-gradient-to-tl",
        "from-indigo-300",
        "via-purple-300",
        "to-pink-300",
        "via-sky-300",
        "to-emerald-300",
        "from-emerald-300",
        "via-cyan-300",
        "to-blue-300",
        "from-red-300",
        "via-amber-300",
        "to-orange-300",
        "from-zinc-300",
        "via-slate-300",
        "to-stone-100",
      ]
    );
    // 새로운 클래스 추가
    const selectedGradient = gradients[color] || gradients.white;
    document.body.classList.add(...selectedGradient);
  };
  const backColorHandler = (color) => {
    applyBackgroundColor(color);
    // 로컬 스토리지에 선택한 색상 저장
    localStorage.setItem("selectedColor", color);
  };
  // 페이지가 로드될 때 저장된 색상 적용
  useEffect(() => {
    const savedColor = localStorage.getItem("selectedColor") || "white"; // 저장된 값이 없으면 기본값은 'white'
    applyBackgroundColor(savedColor);
  }, []);
  return (
    isLoginOrRegisterPath && (
      <div className="w-full rounded-xl shadow p-4 flex justify-between items-center bg-white bg-opacity-80">
        <div>
          <div className="flex gap-2 w-full mb-1">
            <div
              onClick={() => backColorHandler("red")}
              className="w-3 h-3 rounded-lg bg-purple-500 cursor-pointer border border-white"
            ></div>
            <div
              onClick={() => backColorHandler("blue")}
              className="w-3 h-3 rounded-lg bg-blue-500 cursor-pointer border border-white"
            ></div>
            <div
              onClick={() => backColorHandler("yellow")}
              className="w-3 h-3 rounded-lg bg-yellow-500 cursor-pointer border border-white"
            ></div>
            <div
              onClick={() => backColorHandler("white")}
              className="w-3 h-3 rounded-lg bg-slate-300 cursor-pointer border border-white"
            ></div>
          </div>
          <h1 className="font-bold text-2xl">게시판</h1>
        </div>
        <IsAuthenticated />
      </div>
    )
  );
};

export default Header;
