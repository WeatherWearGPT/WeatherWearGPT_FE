import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sign.css'; 
import weatherwearLogo from './weatherwear_logo.png'; 
import axios from 'axios'; 

const Sign = () => {
  const navigate = useNavigate();  // useNavigate 훅 사용

  const [formData, setFormData] = useState({
    id: '',
    email: '',
    password: '',
    passwordcheck: '',
    cm: '',
    kg: '',
    sex: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordcheck) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // 회원가입 요청 보내기
      const response = await axios.post('http://localhost:8080/register', formData);
      if (response.status === 200) {
        setMessage('회원가입에 성공하셨습니다.');
        // 회원가입 성공 후 로그인 페이지로 이동
        navigate('/login');
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      setMessage('회원가입에 실패하였습니다.');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="weather-bg"></div>
        <div className="signup-form-box">
          <div className="logo-container">
            <img src={weatherwearLogo} alt="WeatherWear Logo" className="weatherwear-logo" />
          </div>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="아이디"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="이메일"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="passwordcheck"
                value={formData.passwordcheck}
                onChange={handleChange}
                placeholder="비밀번호 확인"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                name="cm"
                value={formData.cm}
                onChange={handleChange}
                placeholder="키(cm)"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                name="kg"
                value={formData.kg}
                onChange={handleChange}
                placeholder="몸무게(kg)"
                required
              />
            </div>
            <div className="form-group">
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="sex-select"
                required
              >
                <option value="" disabled>
                  성별
                </option>
                <option value="male">남성</option>
                <option value="female">여성</option>
              </select>
            </div>
            <div className="form-group button-group">
              <button type="submit" className="signup-button">
                회원가입
              </button>
            </div>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Sign;
