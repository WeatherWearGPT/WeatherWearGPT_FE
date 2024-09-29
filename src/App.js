import React from 'react';
mypage
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loginform from './components/Loginform'; // 로그인 페이지
import Sign from './components/Sign'; // 일반 회원가입 페이지
import SignSocial from './components/SignSocial'; // 소셜 로그인 사용자 추가 정보 페이지
import Mypage from './components/mypage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loginform from './components/Loginform';
import Sign from './components/Sign';
main

function App() {
  return (
    <Router>
mypage
      <Routes>
        {/* 기본 경로 (/)로 접속하면 마이페이지를 보여줍니다 */}
        <Route path="/" element={<Mypage />} />

        {/* 로그인 페이지 경로 */}
        <Route path="/loginform" element={<Loginform />} />
      </Routes>

      <div className="App">
        <header className="App-header">
          <Routes>
            {/* 로그인 페이지 */}
            <Route path="/" element={<Loginform />} />
            {/* 회원가입 페이지 */}
            <Route path="/signup" element={<Sign />} />
          </Routes>
        </header>
      </div>
main
    </Router>
  );
}

export default App;