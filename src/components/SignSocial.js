import React, { useState } from 'react';
import axios from 'axios';
import './SignSocial.css';
import weatherwearLogo from './weatherwear_logo.png';
import { useNavigate } from 'react-router-dom';

const SignSocial = () => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    gender: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post('http://localhost:8080/register/social', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setMessage('추가 정보가 성공적으로 저장되었습니다.');
        navigate('/mypage'); // 저장 후 마이페이지로 이동
      }
    } catch (error) {
      console.error('추가 정보 저장 실패:', error);
      setMessage('저장에 실패했습니다.');
    }
  };

  return (
    <div className="signup-page">
      <div className="navbar">
        <p className="navbar-title">추가 정보 입력</p>
      </div>
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
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="키(cm)"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="몸무게(kg)"
                required
              />
            </div>
            <div className="form-group">
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">성별</option>
                <option value="male">남성</option>
                <option value="female">여성</option>
              </select>
            </div>
            <button type="submit" className="signup-button">저장</button>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignSocial;