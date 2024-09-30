import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Loginform.css';

// 로고 이미지 import
import naverLogo from './naver_logo.png';
import googleLogo from './google_logo.png';
import weatherwearLogo from './weatherwear_logo.png'; // 새로운 로고 추가

const LoginForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost8080.com/auth/login', {
        id: id,
        password: password,
      });

      if (response.status === 200) {
        console.log('로그인 성공:', response.data);
        localStorage.setItem('accessToken', response.data.accessToken);
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response) {
        setError('로그인 실패: ' + err.response.data.message);
      } else {
        setError('네트워크 오류가 발생했습니다.');
      }
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleNaverLogin = () => {
    window.location.href = 'http://localhost:8080.com/auth/naver';
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080.com/auth/google';
  };

  return (
    <div className="login-page">

      <div className="login-container">
        <div className="weather-bg"></div>
        <div className="login-form-box">
          {/* 로고를 로그인 박스의 가장 위에 추가 */}
          <div className="logo-container">
            <img src={weatherwearLogo} alt="WeatherWear Logo" className="weatherwear-logo" />
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <input
                type="text"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="아이디" /* 플레이스홀더 추가 */
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호" /* 플레이스홀더 추가 */
                required
              />
            </div>
            <div className="button-container">
                <button type="submit" className="login-button">로그인</button>
                <button type="button" onClick={handleSignUpClick} className="signup-button">회원가입</button>
            </div>
          </form>

          {error && <p className="error-message">{error}</p>}

          <div className="social-login">
            {/* 네이버 로그인 버튼 */}
            <button type="button" className="naver-login" onClick={handleNaverLogin}>
              <img src={naverLogo} alt="네이버 로그인" className="social-icon" />
            </button>

            {/* 구글 로그인 버튼 */}
            <button type="button" className="google-login" onClick={handleGoogleLogin}>
              <img src={googleLogo} alt="구글 로그인" className="social-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;