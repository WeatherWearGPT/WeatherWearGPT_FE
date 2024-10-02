import React, { useState, useEffect } from 'react';
import './chat.css';  // CSS 파일 임포트
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://43.202.86.72:8080/';  // 절대경로 url

const Chat = () => {
  const [messages, setMessages] = useState([]);  // 메시지 목록
  const [userInput, setUserInput] = useState('');  // 사용자 입력
  const [isLoading, setIsLoading] = useState(false);  // 로딩 상태
  const [userId, setUserId] = useState(null);  // 로그인한 사용자의 userId

  // 1. 대화 시작 - GPT가 첫 번째 질문을 물어봄
  useEffect(() => {
    const startChat = async () => {
      try {
        console.log("대화 시작 중...");
        // GPT와 대화 시작
        const response = await axios.post(`${API_BASE_URL}/gpt/dialogues/start/${userId}`);
        console.log("API 응답 (첫 질문):", response.data);  // 서버 응답 디버깅

        const initialQuestion = response.data.questionAsked || "Q1. 오늘 외출을 하시나요?";
        setMessages([{ text: initialQuestion, sender: "bot" }]);  // 메시지 상태 업데이트
      } catch (error) {
        console.error("대화 시작 오류:", error);
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
      console.log("사용자 메시지 전송 중:", userInput);  // 사용자 메시지 로그 출력
      // 사용자의 응답을 서버에 전송
      await axios.post(`${API_BASE_URL}/gpt/dialogues/respond/${userId}`, {
        userresponse: userInput  // 서버에 userresponse로 전달
      });

      console.log("사용자 응답이 전송되었습니다. GPT의 질문을 기다리는 중...");

      // GPT가 새 질문을 생성하고 응답
      const response = await axios.post(`${API_BASE_URL}/gpt/dialogues/respond/${userId}`, {
        userresponse: userInput
      });

      console.log("API 응답 (다음 질문):", response.data);  // 서버 응답 디버깅
      const nextQuestion = response.data.questionAsked;  // 서버로부터 새로운 질문을 받음

      if (nextQuestion) {
        setTimeout(() => {
          setMessages((prevMessages) => [...prevMessages, { text: nextQuestion, sender: "bot" }]);
          setIsLoading(false);  // 로딩 상태 종료
        }, 10);  // 응답 지연 시뮬레이션
      } else {
        console.warn("응답에서 다음 질문을 찾을 수 없습니다.");
        setIsLoading(false);  // 질문이 없을 경우 로딩 종료
      }
    } catch (error) {
      console.error("사용자 메시지 전송 중 오류:", error);
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