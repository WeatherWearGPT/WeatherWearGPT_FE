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
            <Route path="/" element={<Chat />} />
            <Route path="/login" element={<Loginform />} />
            <Route path="/signup" element={<Sign />} />
            <Route path="/social-signup" element={<SignSocial />} />
            <Route path="/mypage/:userId" element={<Mypage />} />
            <Route path="/chat/:userId" element={<Chat />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;