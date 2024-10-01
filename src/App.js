import React from 'react';
import { BrowserRouter as Router, Routes, Route, /*Navigate*/ } from 'react-router-dom';
import Loginform from './components/Loginform';
import Sign from './components/Sign';
import SignSocial from './components/SignSocial';
import Mypage from './components/mypage';
import Chat from './components/chat';  // Chat 컴포넌트 추가
import './App.css';

/* const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; //절대경로 url   */


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Loginform />} />
        <Route path="/signup" element={<Sign />} />
        <Route path="/SignSocial" element={<SignSocial />} />
        <Route path="/mypage/:userId" element={<Mypage />} />
        <Route path="/main/:userId" element={<Chat />} />
        <Route path="/chat/:userId" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
