import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Loginform from './components/Loginform'; // 로그인 페이지
import Sign from './components/Sign'; // 일반 회원가입 페이지
import SignSocial from './components/SignSocial'; // 소셜 로그인 사용자 추가 정보 페이지
import Mypage from './components/mypage';
import Chat from './components/chat';  // Chat.js 컴포넌트 임포트
import './App.css';        // App.css 스타일 임포트

function App() {
  return (
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

