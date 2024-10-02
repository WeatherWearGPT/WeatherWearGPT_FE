import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './Loginform.css'; 

import naverLogo from './naver_logo.png';
import googleLogo from './google_logo.png';
import weatherwearLogo from './weatherwear_logo.png'; 

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log("Submitting login with", username, password);
  
    try {
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);
  
      const response = await axios.post('http://localhost:8080/login', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      if (response.status === 200) {
        console.log('로그인 성공:', response.data);
        
        // 헤더에서 accessToken 가져오기
        const accessToken = response.headers['authorization'].replace('Bearer ', '');
        localStorage.setItem('accessToken', accessToken);
  
        // 응답 본문에서 userId 가져오기
        const userId = response.data.userId;
  
        // 로그인 성공 후 채팅 페이지로 이동
        navigate(`/chat/${userId}`);

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
    window.location.href = 'http://ec2-43-202-86-72.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/naver';
};

const handleGoogleLogin = () => {
    window.location.href = 'http://ec2-43-202-86-72.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google';
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
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="아이디"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호" 
                required
              />
            </div>
            <div className="button-container">
                <button type="submit" className="loginform-login-button">로그인</button>
                <button type="button" onClick={handleSignUpClick} className="loginform-signup-button">회원가입</button>
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