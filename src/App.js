import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Loginform from './components/Loginform';
import Sign from './components/Sign';
import SignSocial from './components/SignSocial';
import Chat from './components/chat';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/chat" element={<Chat />} />
      </Routes>
      <div className="App">
        <header className="App-header">
          <Routes>
//            <Route path="/" element={<Loginform />} />
//            <Route path="/signup" element={<Sign />} />
//            <Route path="/SignSocial" element={<SignSocial />} />
//            <Route path="/chat" element={<Chat />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;