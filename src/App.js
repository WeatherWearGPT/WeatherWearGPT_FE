import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sign from './components/Sign'; // 일반 회원가입
import SignSocial from './components/SignSocial'; // 소셜 로그인 사용자 추가 정보


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loginform from './components/Loginform';
import Sign from './components/Sign';

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
          </Routes>
              <Router>
                <Routes>
                  <Route path="/signup" element={<Sign />} /> {/* 일반 회원가입 경로 */}
                  <Route path="/social-signup" element={<SignSocial />} /> {/* 소셜 사용자 추가 정보 경로 */}
                </Routes>
              </Router>
        </header>
      </div>
    </Router>
  );
}

export default App;
