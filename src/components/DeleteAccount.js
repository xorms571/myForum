import React from 'react';
import axios from 'axios';

const DeleteAccount = ({ userId, setToken }) => {
  const handleDeleteAccount = async () => {
    try {
      await axios.delete('http://localhost:5000/api/auth/delete', {
        data: { userId },
      });
      alert('회원탈퇴 성공');
      setToken(null); // 클라이언트에서 토큰 삭제
    } catch (error) {
      console.error('회원탈퇴 오류:', error);
    }
  };

  return (
    <div>
      <h2>회원탈퇴</h2>
      <button onClick={handleDeleteAccount}>회원탈퇴하기</button>
    </div>
  );
};

export default DeleteAccount;
