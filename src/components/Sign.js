import React, { useState } from 'react';
import axios from 'axios';
import './Sign.css'; // Sign.css 파일을 import

const Sign = () => {
    const [formData, setFormData] = useState({
        id: '',
        email: '',
        password: '',
        passwordcheck: '',
        Height: '',
        Weight: '',
        Gender: ''
    });

    const [message, setMessage] = useState('');
    const [token, setToken] = useState(''); // 토큰 상태 관리
    const [errorMessage, setErrorMessage] = useState({ Height: '', Weight: '' }); // 에러 메시지 상태 관리

    //const API_BASE_URL = 'http://localhost:8080'; // API 기본 URL 설정

    const handleChange = (e) => {
        const { name, value } = e.target;

        // 숫자 확인 로직: Height, kg에 대해 정수 여부 검사
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

        // 비밀번호 확인 로직
        if (formData.password !== formData.passwordcheck) {
            setMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 정수가 아닌 값이 있는지 확인
        if (errorMessage.Height || errorMessage.Weight) {
            setMessage('모든 필드가 올바르게 입력되었는지 확인하십시오.');
            return;
        }

        try {
            // API 요청 보내기
            const response = await axios.post('http://localhost:8080/register', {
                id: formData.id,
                email: formData.email,
                password: formData.password,
                Height: formData.Height,
                Weight: formData.Weight,
                Gender: formData.Gender
            });

            // API 응답 확인
            if (response.status === 200) {
                const { accessToken } = response.data; // 응답에서 토큰 추출
                if (accessToken) {
                    setToken(accessToken); // 토큰 상태 업데이트
                    setMessage('회원가입에 성공하셨습니다.');
                } else {
                    setMessage('토큰이 없습니다.');
                }
            } else {
                setMessage('회원가입 실패: 서버 오류');
            }
        } catch (error) {
            // 오류 처리
            if (error.response) {
                setMessage(`회원가입 실패: ${error.response.data.message}`);
            } else {
                setMessage('네트워크 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className="signup-page">
            {/* 상단바 */}
            <div className="navbar">
                <p className="navbar-title">회원가입</p>
            </div>

            {/* 회원가입 폼 컨테이너 */}
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
                            <label>키(Height):</label>
                            <input
                                type="text"
                                name="Height"
                                value={formData.Height}
                                onChange={handleChange}
                                required
                            />
                            {errorMessage.Height && <p className="error-message">{errorMessage.cm}</p>}
                        </div>
                        <div className="form-group">
                            <label>몸무게(Weight):</label>
                            <input
                                type="text"
                                name="Weight"
                                value={formData.Weight}
                                onChange={handleChange}
                                required
                            />
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
                        <button type="submit" className="signup-button">회원가입</button>
                    </form>

                    {/* 서버 응답 메시지 표시 */}
                    {message && <p className="message">{message}</p>}

                    {/* 토큰 확인 */}
                    {token && <p>받은 토큰: {token}</p>}
                </div>
            </div>
        </div>
    );
};

export default Sign;
