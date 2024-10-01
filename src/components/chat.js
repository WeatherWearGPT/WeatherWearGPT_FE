import React, { useState, useEffect } from 'react';
import './chat.css';  // CSS 파일 임포트
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [userId] = useState('12345'); // setUserId 제거
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const startChat = async () => {
      try {
        const response = await axios.post("http://43.202.86.72/gpt/dialogues/start/%7BuserId%7D");
        const initialQuestion = response.data.question || "Q1. 오늘 외출을 하시나요?";
        setMessages([{ text: initialQuestion, sender: "bot" }]);
      } catch (error) {
        console.error("Error starting chat:", error);
      }
    };
    startChat();
  }, [userId]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;

    const userMessage = { text: userInput, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setIsLoading(true);
    try {
      await axios.post("http://43.202.86.72/gpt/dialogues/%7BuserId%7D", {
        message: `목적지 ${userInput}의 날씨는 ... 입니다.`
      });

      const response = await axios.post("http://43.202.86.72/gpt/respond/%7BuserId%7D");
      const botResponse = response.data.response;

      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: "bot" }]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error sending user message or receiving response:", error);
      setIsLoading(false);
    }

    setUserInput("");
  };

  return (
    <div className="page-container">
      {/* 1번 구역 */}
      <div className="section-one">
        <p>24.09.24</p>
        <p>24.09.23</p>
        <p>24.09.22</p>
      </div>

      {/* 2번 구역 */}
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