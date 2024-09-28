import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loginform from './components/Loginform'; // 로그인 페이지
import Sign from './components/Sign'; // 일반 회원가입 페이지
import SignSocial from './components/SignSocial'; // 소셜 로그인 사용자 추가 정보 페이지
import Mypage from './components/mypage';

function App() {
  return (
    <Router>
      <Routes>
        {/* 기본 경로 (/)로 접속하면 마이페이지를 보여줍니다 */}
        <Route path="/" element={<Mypage />} />

        {/* 로그인 페이지 경로 */}
        <Route path="/loginform" element={<Loginform />} />
      </Routes>
    </Router>
  );
}

export default App;
