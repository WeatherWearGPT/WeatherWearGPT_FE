import React, { useState } from 'react';
import './SignSocial.css';
import axios from 'axios'; // axios import

const SignSocial = () => {
    const [formData, setFormData] = useState({
        Height: '',
        Weight: '',
        Gender: ''
    });

    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState({ Height: '', Weight: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // 숫자 확인 로직: Height, Weight 대해 정수 여부 검사
        if (name === 'Height' || name === 'Weight') {
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

        if (errorMessage.Height || errorMessage.Weight) {
            setMessage('모든 필드가 올바르게 입력되었는지 확인하십시오.');
            return;
        }

        try {
            // POST 요청을 통해 /register/social로 추가 정보 보내기
            const response = await axios.post('http://localhost8080/register/social', {
                Height: formData.Height,
                Weight: formData.Weight,
                Gender: formData.Gender
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
                <div className="signup-form-box">
                    <h2>추가 정보 입력</h2>
                    <form onSubmit={handleSubmit} className="signup-form">
                        <div className="form-group">
                            <label>키(Height):</label>
                            <input type="text" name="Height" value={formData.Height} onChange={handleChange} required />
                            {errorMessage.Height && <p className="error-message">{errorMessage.Height}</p>}
                        </div>
                        <div className="form-group">
                            <label>몸무게(Weight):</label>
                            <input type="text" name="Weight" value={formData.Weight} onChange={handleChange} required />
                            {errorMessage.Weight && <p className="error-message">{errorMessage.Weight}</p>}
                        </div>
                        <div className="form-group">
                            <label>성별:</label>
                            <select name="Gender" value={formData.Gender} onChange={handleChange} required>
                                <option value="">선택</option>
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