import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './components/chat'; // Chat 컴포넌트를 import

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* 기본 경로에 Chat 컴포넌트를 렌더링 */}
          <Route path="/" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
