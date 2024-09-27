import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loginform from './components/Loginform'; // 로그인 페이지
import Sign from './components/Sign'; // 일반 회원가입 페이지
import SignSocial from './components/SignSocial'; // 소셜 로그인 사용자 추가 정보 페이지


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            {/* 로그인 페이지 */}
            <Route path="/" element={<Loginform />} />

            {/* 일반 회원가입 페이지 */}
            <Route path="/signup" element={<Sign />} />

            {/* 소셜 로그인 사용자 추가 정보 입력 페이지 */}
            <Route path="/social-signup" element={<SignSocial />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
