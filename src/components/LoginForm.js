import React, { useState } from 'react';
import './LoginForm.css'; // 스타일 파일 추가

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">로그인</button>
        <button type="button">회원가입</button>

        {/* 소셜 로그인 버튼 */}
        <div className="social-login">
          <button className="naver-login">N</button>
          <button className="kakao-login">K</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
