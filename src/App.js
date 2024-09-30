import React from 'react';
mypage
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Loginform from './components/Loginform'; // 로그인 페이지
import Sign from './components/Sign'; // 일반 회원가입 페이지
import SignSocial from './components/SignSocial'; // 소셜 로그인 사용자 추가 정보 페이지
import Mypage from './components/mypage';
import Chat from './components/chat';  // Chat.js 컴포넌트 임포트
import './App.css';        // App.css 스타일 임포트

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loginform from './components/Loginform'; 
import Sign from './components/Sign'; 
import SignSocial from './components/SignSocial'; 
import Mypage from './components/mypage';
import Chat from './components/chat';  
import './App.css';      

function App() {
  return (
 ChatGPT
    <div className="page-container">
      {/* 1번 구역 */}
      <div className="section-one">
        <h2>1번 화면 - 1/3 크기</h2>
      </div>

      {/* 2번 구역 (chat.js가 동작하는 곳) */}
      <div className="section-two">
        <Chat />
      </div>
    </div>
  );
}

export default App;


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
            {/* 소셜 로그인 사용자 추가 정보 페이지 */}
            <Route path="/SignSocial" element={<SignSocial />} />
            {/* 마이페이지 */}
            <Route path="/mypage" element={<Mypage />} />
            {/* 채팅 페이지 */}
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </header>
      </div>
main
    </Router>
  );
}

export default App;
 main
