import React from 'react';

const KakaoLogin = () => {
  const handleKakaoLogin = () => {
    // 카카오 소셜 로그인 로직 추가
    console.log("Kakao Login Clicked");
    // 실제 카카오 로그인 연동 로직을 여기에 작성
  };

  return (
    <button onClick={handleKakaoLogin}>
      <img src="카카오 로고 이미지 URL" alt="Kakao Login" style={{ width: '50px' }} />
    </button>
  );
};

export default KakaoLogin;
