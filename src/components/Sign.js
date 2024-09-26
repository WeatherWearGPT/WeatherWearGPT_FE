import React, { useState } from 'react';
import './Sign.css'; // Sign.css 파일을 import

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
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
            {/* 상단바 */}
            <div className="navbar">
                <p className="navbar-title">회원가입</p>
            </div>

            {/* 회원가입 폼 컨테이너 */}
            <div className="signup-container">
                {/* 배경 이미지 위에 폼을 배치 */}
                <div className="weather-bg"></div>
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
                            <input type="number" name="cm" value={formData.cm} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>몸무게(kg):</label>
                            <input type="number" name="kg" value={formData.kg} onChange={handleChange} required />
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
