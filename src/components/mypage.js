import React, { useState } from 'react';
import './mypage.css'; // mypage.css 파일 import

const MyPage = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
        height: '',
        weight: '',
        gender: ''
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
        // 비밀번호 확인 일치 여부 검사
        if (formData.newPassword !== formData.newPasswordConfirm) {
            setMessage('새 비밀번호가 일치하지 않습니다.');
            return;
        }
        setMessage('정보가 성공적으로 수정되었습니다.');
    };

    const handleDeleteAccount = () => {
        setMessage('계정이 탈퇴되었습니다.');
    };

    return (
        <div className="mypage-container">
            {/* 상단바 */}
            <div className="navbar">
                <p className="navbar-title">마이페이지</p>
            </div>

            {/* 회원 정보 수정 폼 */}
            <div className="mypage-form-box">
                <h2>마이페이지</h2>
                <form onSubmit={handleSubmit} className="mypage-form">
                    <div className="form-group">
                        <label>아이디:</label>
                        <p className="static-info">rookies1234</p>
                    </div>
                    <div className="form-group">
                        <label>이메일:</label>
                        <p className="static-info">rookies12@naver.com</p>
                    </div>
                    <div className="form-group">
                        <label>기존 비밀번호:</label>
                        <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>새 비밀번호:</label>
                        <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>새 비밀번호 확인:</label>
                        <input type="password" name="newPasswordConfirm" value={formData.newPasswordConfirm} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>키(cm):</label>
                        <input type="number" name="height" value={formData.height} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>몸무게(kg):</label>
                        <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>성별:</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} required>
                            <option value="">선택</option>
                            <option value="male">남성</option>
                            <option value="female">여성</option>
                        </select>
                    </div>

                    {/* 수정 및 탈퇴 버튼 */}
                    <div className="button-container">
                        <button type="submit" className="update-button">수정하기</button>
                        <button type="button" className="delete-button" onClick={handleDeleteAccount}>회원탈퇴</button>
                    </div>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default MyPage;
