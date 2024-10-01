import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './components/chat'; // Chat.js 컴포넌트 불러오기

function App() {
  return (
    <Router>
      <div className="App">
        {/* Routes 정의 */}
        <Routes>
          {/* /chat 경로에서 Chat 컴포넌트를 렌더링 */}
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;