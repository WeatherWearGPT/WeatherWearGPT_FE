import React, { useState, useEffect } from 'react';
import './chat.css';  // 디자인용 CSS 파일을 불러옴
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [userId, setUserId] = useState("12345"); // 사용자 ID를 임시로 지정
  const [isLoading, setIsLoading] = useState(false);

  // 첫 질문 요청 (원격 API 주석 처리된 부분)
  useEffect(() => {
    const startChat = async () => {
      try {
        const response = await axios.post(`http://localhost:8080/gpt/dialogues/start/${userId}`);
        const initialQuestion = response.data.question;
        setMessages([{ text: initialQuestion, sender: "bot" }]);
      } catch (error) {
        console.error("Error starting chat:", error);
      }
    };

    startChat();
  }, [userId]);

  // 사용자 입력값 업데이트
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // 메시지 전송 처리
  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;

    // 사용자 메시지를 추가
    const userMessage = { text: userInput, sender: "user" };
    setMessages([...messages, userMessage]);

    // 서버에 답변 전송 및 응답 처리 (원격 API 처리)
    setIsLoading(true);
    try {
      await axios.post(`http://localhost:8080/gpt/dialogues/${userId}`, { message: userInput });

      const response = await axios.post(`http://localhost:8080/gpt/dialogues/respond/${userId}`);
      const botResponse = response.data.response;

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
      <div className="section-one">
        <p>24.09.24</p>
        <p>24.09.23</p>
        <p>24.09.22</p>
      </div>

      <div className="section-two">
        <div className="chat-container">
          {messages.map((message, index) => (
            <div key={index} className={`message message-${message.sender}`}>
              {message.text}
            </div>
          ))}
          {isLoading && <div className="message message-bot">로딩 중...</div>}
        </div>

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