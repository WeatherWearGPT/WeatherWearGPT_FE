import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './mypage.css'; 
import './Loginform'; 
import './SignSocial'; 
import weatherwearLogo from './weatherwear_logo.png'; 

const MyPage = () => {
    const [formData, setFormData] = useState({
        cm: '',
        kg: '',
        sex: ''
    });
    const [showModal, setShowModal] = useState(false); // 모달 표시 상태
    const [message, setMessage] = useState(''); // 저장된 메시지 상태
    const navigate = useNavigate();
    const { userId } = useParams(); // userId를 URL 파라미터에서 가져옴

    // 입력값 업데이트
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // 수정하기 버튼 클릭 시
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        // FormData 객체 생성
        const formDataToSend = new FormData();
        formDataToSend.append('cm', formData.cm);
        formDataToSend.append('kg', formData.kg);
        formDataToSend.append('sex', formData.sex);

        try {
            const response = await axios.patch(`http://localhost:8080/user/${userId}`, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setMessage('정보가 성공적으로 수정되었습니다.');
            }
        } catch (err) {
            setMessage('정보 수정에 실패했습니다.');
        }
    };

    // 회원탈퇴 버튼 클릭 시 모달 띄우기
    const handleDeleteClick = () => {
        setShowModal(true);
    };

    // 모달에서 '예' 클릭 시 회원 탈퇴 처리
    const handleConfirmDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            if (response.status === 200) {
                setShowModal(false);
                alert('회원탈퇴 되었습니다.');
                setTimeout(() => {
                    navigate('/login');
                }, 0);
            }
        } catch (err) {
            alert('회원탈퇴에 실패했습니다.');
        }
    };

    // 모달에서 '아니오' 클릭 시 모달 닫기
    const handleCancelDelete = () => {
        setShowModal(false);
    };

    return (
        <div className="mypage-container">
            <div className="navbar">
                <p className="navbar-title">마이페이지</p>
                <div className="icon-container">
                    <div className="icon" onClick={() => navigate('/')}>
                        <img src="./icons/home.png" alt="홈" />
                    </div>
                    <div className="icon" onClick={() => navigate(`/mypage/${userId}`)}>
                        <img src="./icons/user.png" alt="마이페이지" />
                    </div>
                    <div className="icon" onClick={() => navigate('/logout')}>
                        <img src="./icons/logout.png" alt="로그아웃" />
                    </div>
                </div>
            </div>

            <div className="form-box">
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
                    </div>
                    <div className="form-group">
                        <select name="sex" value={formData.sex} onChange={handleChange} required>
                            <option value="">성별</option>
                            <option value="male">남성</option>
                            <option value="female">여성</option>
                        </select>
                    </div>
                    <div className="button-container">
                        <button type="submit" className="button update-button">수정하기</button>
                        <button type="button" className="button delete-button" onClick={handleDeleteClick}>회원탈퇴</button>
                    </div>
                </form>
                {message && <p className="message">{message}</p>}
            </div>

            {showModal && (
                <div className="modal">
                    <p>탈퇴하시겠습니까?</p>
                    <div className="modal-buttons">
                        <button className="modal-yes" onClick={handleConfirmDelete}>예</button>
                        <button className="modal-no" onClick={handleCancelDelete}>아니오</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyPage;