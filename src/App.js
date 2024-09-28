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
        </header>
      </div>
    </Router>
  );
}

export default App;