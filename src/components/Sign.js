import React, { useState } from 'react';
import './Sign.css'; // Sign.css 파일을 import
import axios from 'axios'; // axios import


// 로고 이미지 import
import weatherwearLogo from './weatherwear_logo.png'; // 로고 파일 경로는 로그인 페이지와 동일하게 사용

const Sign = () => {
  const [formData, setFormData] = useState({
    id: '',
    email: '',
    password: '',
    passwordcheck: '',
    cm: '',
    kg: '',
    sex: '',
  });

 mypage
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState({ cm: '', kg: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // 숫자 확인 로직: cm, kg에 대해 정수 여부 검사
        if (name === 'cm' || name === 'kg') {
            if (!/^\d+$/.test(value)) {
                setErrorMessage({
                    ...errorMessage,
                    [name]: '숫자를 입력하십시오.'
                });
            } else {
                setErrorMessage({
                    ...errorMessage,
                    [name]: ''
                });
            }
        }

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.passwordcheck) {
            setMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (errorMessage.cm || errorMessage.kg) {
            setMessage('모든 필드가 올바르게 입력되었는지 확인하십시오.');
            return;
        }

        try {
            // POST 요청을 통해 /register로 일반 회원가입 정보 보내기
            const response = await axios.post('http://localhost8080/register', {
                id: formData.id,
                email: formData.email,
                password: formData.password,
                cm: formData.cm,
                kg: formData.kg,
                sex: formData.sex
            });

            if (response.status === 200) {
                setMessage('회원가입에 성공하셨습니다.');
            }
        } catch (error) {
            console.error('회원가입 실패:', error);
            setMessage('회원가입에 실패했습니다.');
        }
    };

    return (
        <div className="signup-page">
            <div className="navbar">
                <p className="navbar-title">회원가입</p>
            </div>
            <div className="signup-container">
                <div className="signup-form-box">
                    <h2>회원가입</h2>
                    <form onSubmit={handleSubmit} className="signup-form">
                        <div className="form-group">
                            <label>아이디:</label>
                            <input type="text" name="id" value={formData.id} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>이메일:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>비밀번호:</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>비밀번호 확인:</label>
                            <input type="password" name="passwordcheck" value={formData.passwordcheck} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>키(cm):</label>
                            <input type="text" name="cm" value={formData.cm} onChange={handleChange} required />
                            {errorMessage.cm && <p className="error-message">{errorMessage.cm}</p>}
                        </div>
                        <div className="form-group">
                            <label>몸무게(kg):</label>
                            <input type="text" name="kg" value={formData.kg} onChange={handleChange} required />
                            {errorMessage.kg && <p className="error-message">{errorMessage.kg}</p>}
                        </div>
                        <div className="form-group">
                            <label>성별:</label>
                            <select name="sex" value={formData.sex} onChange={handleChange} required>
                                <option value="">선택</option>
                                <option value="male">남성</option>
                                <option value="female">여성</option>
                            </select>
                        </div>
                        <button type="submit" className="signup-button">회원가입</button>
                    </form>
                    {message && <p className="message">{message}</p>}
                </div>
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordcheck) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }
    setMessage('회원가입에 성공하셨습니다.');
  };

  return (
    <div className="signup-page">
      {/* 회원가입 폼 컨테이너 */}
      <div className="signup-container">
        <div className="weather-bg"></div>
        <div className="signup-form-box">
          {/* 로고를 폼 상단에 추가 */}
          <div className="logo-container">
            <img src={weatherwearLogo} alt="WeatherWear Logo" className="weatherwear-logo" />
          </div>
          <form onSubmit={handleSubmit} className="signup-form">
            {/* 각각의 입력 필드 */}
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
 main
            </div>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Sign;