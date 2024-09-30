import React, { useState, useEffect } from 'react';
import './chat.css';  // CSS 파일 임포트
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [userId, setUserId] = useState("12345"); // 사용자 ID를 임시로 지정 (실제 ID로 대체 가능)
  const [isLoading, setIsLoading] = useState(false);

  // 챗봇의 첫 질문을 요청
  useEffect(() => {
    const startChat = async () => {
      try {
        const response = await axios.post(`localhost:8080/gpt/dialogues/start/${userId}`);
        const initialQuestion = response.data.question;
        setMessages([{ text: initialQuestion, sender: "bot" }]);
      } catch (error) {
        console.error("Error starting chat:", error);
      }
    };

    startChat();
  }, [userId]);

  // 사용자 입력값 변경 시 업데이트
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // 메시지 전송 시 처리
  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;

    // 사용자 메시지를 추가
    const userMessage = { text: userInput, sender: "user" };
    setMessages([...messages, userMessage]);

    // API에 사용자의 답변 전송
    setIsLoading(true);
    try {
      // 사용자의 답변을 서버에 전송
      await axios.post(`http://localhost:8080/gpt/dialogues/${userId}`, {
        message: userInput
      });

      // 서버에서 챗봇의 응답을 받기
      const response = await axios.post(`http://localhost:8080/gpt/dialogues/respond/${userId}`);
      const botResponse = response.data.response;

      // 챗봇 응답 추가
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: "bot" }]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error sending user message or receiving response:", error);
      setIsLoading(false);
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
          {isLoading && <div className="message message-bot">로딩 중...</div>}
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