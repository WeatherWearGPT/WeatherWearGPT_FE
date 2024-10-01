import React, { useState, useEffect } from 'react';
import './chat.css';  // CSS 파일 임포트
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);  // 메시지 목록
  const [userInput, setUserInput] = useState('');  // 사용자 입력
  const [isLoading, setIsLoading] = useState(false);  // 로딩 상태
  const userId = 12345;  // 임시 사용자 ID (실제로는 로그인 시 얻어야 함)

  // 1. 대화 시작 - GPT가 첫 번째 질문을 물어봄
  useEffect(() => {
    const startChat = async () => {
      try {
        // GPT와 대화 시작
        const response = await axios.post(`http://43.202.86.72:8080/gpt/dialogues/start/${userId}`);
        const initialQuestion = response.data.questionAsked || "Q1. 오늘 외출을 하시나요?";  // 첫 질문
        setMessages([{ text: initialQuestion, sender: "bot" }]);  // 첫 질문을 화면에 출력
      } catch (error) {
        console.error("Error starting chat:", error);
      }
    };
    startChat();  // 컴포넌트 마운트 시 대화 시작
  }, [userId]);

  // 입력값 변화 처리
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // 2. 사용자 메시지 전송 및 GPT 응답 처리
  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;  // 빈 입력 방지

    // 사용자 메시지 추가
    const userMessage = { text: userInput, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setIsLoading(true);  // 로딩 상태 시작

    try {
      // 2. 사용자의 응답을 서버에 전송
      await axios.post(`http://43.202.86.72:8080/gpt/dialogues/respond/${userId}`, {
        userresponse: userInput  // 서버에 userresponse로 전달
      });

      // 3. GPT가 새 질문을 생성하고 응답함
      const response = await axios.post(`http://43.202.86.72:8080/gpt/dialogues/respond/${userId}`, {
        userresponse: userInput
      });

      const nextQuestion = response.data.questionAsked;  // 서버로부터 새로운 질문을 받음

      if (nextQuestion) {
        setTimeout(() => {
          setMessages((prevMessages) => [...prevMessages, { text: nextQuestion, sender: "bot" }]);
          setIsLoading(false);  // 로딩 상태 종료
        }, 1000);  // 응답 지연 시뮬레이션
      } else {
        setIsLoading(false);  // 질문이 없을 경우 로딩 종료
      }
    } catch (error) {
      console.error("Error sending user message or receiving response:", error);
      setIsLoading(false);  // 에러 발생 시 로딩 종료
    }

    // 입력 필드 초기화
    setUserInput("");
  };

  return (
    <div className="page-container">
      {/* 1번 구역: 좌측 날짜 목록 */}
      <div className="section-one">
        <p>24.09.24</p>
        <p>24.09.23</p>
        <p>24.09.22</p>
      </div>

      {/* 2번 구역: 우측 채팅 영역 */}
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