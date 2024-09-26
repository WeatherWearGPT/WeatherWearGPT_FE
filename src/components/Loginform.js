import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loginform.css'; 

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  // 회원가입 페이지로 이동하는 함수
  const handleSignUpClick = () => {
    navigate('/signup'); 
  };

  // 네이버 로그인 함수
  const handleNaverLogin = () => {
    window.location.href = 'http://your-backend-url.com/auth/naver'; // 백엔드 네이버 로그인 경로로 리다이렉트
  };

  // 카카오 로그인 함수
  const handleKakaoLogin = () => {
    window.location.href = 'http://your-backend-url.com/auth/kakao'; // 백엔드 카카오 로그인 경로로 리다이렉트
  };

  return (
    <div className="login-page">
      {/* 상단바 */}
      <div className="navbar">
        <p className="navbar-title">로그인</p>
      </div>

      {/* 로그인 폼 컨테이너 */}
      <div className="login-container">
        <div className="weather-bg"></div>
        <div className="login-form-box">
          <h2>로그인</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">이메일:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">비밀번호:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">로그인</button>
            <button type="button" onClick={handleSignUpClick} className="signup-button">회원가입</button>
          </form>

          {/* 소셜 로그인 버튼 */}
          <div className="social-login">
            <button type="button" className="naver-login" onClick={handleNaverLogin}>N</button>
            <button type="button" className="kakao-login" onClick={handleKakaoLogin}>K</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
