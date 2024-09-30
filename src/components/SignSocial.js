import React, { useState } from 'react';
import './SignSocial.css'; 
import axios from 'axios'; 
import weatherwearLogo from './weatherwear_logo.png'; 

const SignSocial = () => {
    const [formData, setFormData] = useState({
        cm: '',
        kg: '',
        sex: ''
    });

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

        if (errorMessage.cm || errorMessage.kg) {
            setMessage('모든 필드가 올바르게 입력되었는지 확인하십시오.');
            return;
        }

        try {
            // POST 요청을 통해 /register/social로 추가 정보 보내기
            const response = await axios.post('http://localhost8080/register/social', {
                cm: formData.cm,
                kg: formData.kg,
                sex: formData.sex
            });

            if (response.status === 200) {
                setMessage('추가 정보가 성공적으로 저장되었습니다.');
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
                                name="cm"
                                value={formData.cm}
                                onChange={handleChange}
                                placeholder="키(cm)"
                                required
                            />
                            {errorMessage.cm && <p className="error-message">{errorMessage.cm}</p>}
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="kg"
                                value={formData.kg}
                                onChange={handleChange}
                                placeholder="몸무게(kg)"
                                required
                            />
                            {errorMessage.kg && <p className="error-message">{errorMessage.kg}</p>}
                        </div>
                        <div className="form-group">
                            <select name="sex" value={formData.sex} onChange={handleChange} required>
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
