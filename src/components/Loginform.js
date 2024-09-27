import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios import
import './Loginform.css';

const LoginForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // 에러 메시지 상태
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // 에러 메시지 초기화

    try {
      // axios로 로그인 요청 보내기
      const response = await axios.post('http://your-backend-url.com/auth/login', {
        id: id,
        password: password,
      });

      if (response.status === 200) {
        // 로그인 성공 시, 백엔드에서 받은 토큰을 저장
        console.log('로그인 성공:', response.data);

        // 로컬 스토리지에 토큰 저장
        localStorage.setItem('accessToken', response.data.accessToken); // 예시: 액세스 토큰 저장
        localStorage.setItem('refreshToken', response.data.refreshToken); // 예시: 리프레시 토큰 저장

        // 로그인 성공 후 대시보드 페이지로 이동
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response) {
        // 백엔드가 응답을 반환한 경우 (로그인 실패)
        setError('로그인 실패: ' + err.response.data.message);
      } else {
        // 네트워크 오류 처리
        setError('네트워크 오류가 발생했습니다.');
      }
    }
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
              <label htmlFor="id">아이디:</label>
              <input
                type="id"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
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

          {/* 에러 메시지 출력 */}
          {error && <p className="error-message">{error}</p>}

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