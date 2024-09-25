import React, { useState } from 'react';

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

    // 입력 변화 처리 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // 폼 제출 시 처리 함수
    const handleSubmit = (e) => {
        e.preventDefault();
        // 비밀번호와 비밀번호 확인이 일치하는지 확인
        if (formData.password !== formData.passwordcheck) {
            setMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 모든 값이 제대로 입력되었을 때 성공 메시지 표시
        setMessage('회원가입에 성공하셨습니다.');
    };

    return (
        <div>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>아이디:</label>
                    <input type="text" name="id" value={formData.id} onChange={handleChange} required />
                </div>
                <div>
                    <label>이메일:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>비밀번호:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div>
                    <label>비밀번호 확인:</label>
                    <input type="password" name="passwordcheck" value={formData.passwordcheck} onChange={handleChange} required />
                </div>
                <div>
                    <label>키(cm):</label>
                    <input type="number" name="cm" value={formData.cm} onChange={handleChange} required />
                </div>
                <div>
                    <label>몸무게(kg):</label>
                    <input type="number" name="kg" value={formData.kg} onChange={handleChange} required />
                </div>
                <div>
                    <label>성별:</label>
                    <select name="sex" value={formData.sex} onChange={handleChange} required>
                        <option value="">선택</option>
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                    </select>
                </div>
                <button type="submit">회원가입</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Sign;