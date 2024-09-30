import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loginform from './components/Loginform';
import Sign from './components/Sign';
import SignSocial from './components/SignSocial';
import Mypage from './components/mypage';
import Chat from './components/chat';
import './App.css';


function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;