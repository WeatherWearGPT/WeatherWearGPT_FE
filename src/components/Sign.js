import React, { useState } from 'react';
import './Sign.css'; // Sign.css 파일을 import
import weatherImage from '../assets/images/weather.png'; // 이미지 파일 경로를 import

const Sign = () => {
    const [formData, setFormData] = useState({
        id: '',
        email: '',
        password: '',
        passwordcheck: '',
        cm: '',
        kg: '',
        sex: ''
    });

    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState({ cm: '', kg: '' }); // 에러 메시지 상태 관리

    const handleChange = (e) => {
        const { name, value } = e.target;

        // 숫자 확인 로직: cm, kg에 대해 정수 여부 검사
        if (name === 'cm' || name === 'kg') {
            // 정수가 아닌 경우 에러 메시지 표시
            if (!/^\d+$/.test(value)) {
                setErrorMessage({
                    ...errorMessage,
                    [name]: '숫자를 입력하십시오.'
                });
            } else {
                // 입력값이 정수이면 에러 메시지를 지움
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

    const handleSubmit = (e) => {
        e.preventDefault();

        // 비밀번호 확인 로직
        if (formData.password !== formData.passwordcheck) {
            setMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 정수가 아닌 값이 있는지 확인
        if (errorMessage.cm || errorMessage.kg) {
            setMessage('모든 필드가 올바르게 입력되었는지 확인하십시오.');
            return;
        }

        setMessage('회원가입에 성공하셨습니다.');
    };

    return (
        <div className="signup-page">
            {/* 상단바 */}
            <div className="navbar">
                <p className="navbar-title">회원가입</p>
            </div>

            {/* 회원가입 폼 컨테이너 */}
            <div className="signup-container">
                {/* 배경 이미지 위에 폼을 배치 */}
                <div
                    className="weather-bg"
                    style={{ backgroundImage: `url(${weatherImage})` }}
                ></div>
                <div className="signup-form-box">
                    <h2>회원가입</h2>
                    <form onSubmit={handleSubmit} className="signup-form">
                        {/* 각각의 입력 필드와 라벨 */}
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
                            <input
                                type="text"
                                name="cm"
                                value={formData.cm}
                                onChange={handleChange}
                                required
                            />
                            {/* 키 입력값이 잘못된 경우 에러 메시지 표시 */}
                            {errorMessage.cm && <p className="error-message">{errorMessage.cm}</p>}
                        </div>
                        <div className="form-group">
                            <label>몸무게(kg):</label>
                            <input
                                type="text"
                                name="kg"
                                value={formData.kg}
                                onChange={handleChange}
                                required
                            />
                            {/* 몸무게 입력값이 잘못된 경우 에러 메시지 표시 */}
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
            </div>
        </div>
    );
};

export default Sign;