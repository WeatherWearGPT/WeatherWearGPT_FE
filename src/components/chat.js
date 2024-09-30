import React, { useState } from 'react';
//import './chat.css';  // CSS 파일 임포트

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "Q1. 오늘 외출을 하시나요?", sender: "bot" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);

  // 챗봇이 물어볼 질문 목록
  const questions = [
    "Q1. 오늘 외출을 하시나요?",
    "Q2. 오늘 행하는 목적지가 어디신가요?"
  ];

  // 사용자 입력값 변경 시 업데이트
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // 메시지 전송 시 처리
  const handleSendMessage = () => {
    if (userInput.trim() === "") return;

    // 사용자 메시지를 추가
    const userMessage = { text: userInput, sender: "user" };
    setMessages([...messages, userMessage]);

    // 다음 질문 또는 분석 중 메시지 출력
    if (questionIndex < questions.length - 1) {
      const nextQuestion = questions[questionIndex + 1];
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, { text: nextQuestion, sender: "bot" }]);
        setQuestionIndex(questionIndex + 1);
      }, 1000);
    } else {
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, { text: "분석 중입니다...", sender: "bot" }]);
      }, 1000);
    }

    // 입력 필드 초기화
    setUserInput("");
  };

  return (
    <div className="page-container">
      {/* 1번 구역: 왼쪽 반투명 회색 박스 */}
      <div className="section-one">
        <h2>1번 구역</h2>
      </div>

      {/* 2번 구역: 오른쪽 반투명 박스 (채팅) */}
      <div className="section-two">
        {/* 채팅 메시지 목록 */}
        <div className="chat-container">
          {messages.map((message, index) => (
            <div key={index} className={`message message-${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>

        {/* 입력 영역 */}
        <div className="input-container">
          <input
            type="text"
            className="input-box"
            value={userInput}
            onChange={handleInputChange}
            placeholder="답변을 입력하세요..."
          />
          <button className="send-button" onClick={handleSendMessage}>
            보내기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;