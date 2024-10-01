import React, { useState, useEffect } from 'react';
import './chat.css';  // CSS 파일 임포트
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // 절대경로 url

const Chat = () => {
  const [messages, setMessages] = useState([]);  // 메시지 목록
  const [userInput, setUserInput] = useState('');  // 사용자 입력
  const [isLoading, setIsLoading] = useState(false);  // 로딩 상태
  const [chatStarted, setChatStarted] = useState(false);  // 대화 시작 여부
  const userId = 12345;  // 실제로는 로그인 시 얻어야 함

  // 1. 대화 시작 - GPT가 첫 번째 질문을 물어봄
  useEffect(() => {
    const startChat = async () => {
      if (chatStarted) return;  // 대화가 이미 시작되었으면 중단
      setChatStarted(true);  // 대화 시작 상태로 변경

      try {
        console.log("대화 시작 중...");  // 대화 시작 1회만 출력
        // GPT와 대화 시작
        const start = await axios.post(`${API_BASE_URL}/gpt/dialogues/start/${userId}`);
        console.log("API Response (Start Chat):", start.data);  // 응답 데이터 확인
        const initialQuestion = start.data.questionAsked || "Q1. 오늘 외출을 하시나요?";  // 첫 질문
        setMessages([{ text: initialQuestion, sender: "bot" }]);  // 첫 질문을 화면에 출력
      } catch (error) {
        console.error("Error starting chat:", error);
      }
    };
    startChat();  // 컴포넌트 마운트 시 대화 시작
  }, [userId, chatStarted]);

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
      // 2. 사용자의 응답을 서버에 전송
      await axios.post(`${API_BASE_URL}/gpt/dialogues/respond/${userId}`, {
        userresponse: userInput  // 서버에 userresponse로 전달
      });

      console.log("사용자 응답 전송 완료. GPT의 다음 질문을 기다리는 중...");

      // 3. GPT가 새 질문을 생성하고 응답함
      const response = await axios.post(`${API_BASE_URL}/gpt/dialogues/respond/${userId}`, {
        userresponse: userInput
      });

      console.log("API Response (Next Question):", response.data);  // 응답 데이터 확인
      const nextQuestion = response.data.questionAsked;  // 서버로부터 새로운 질문을 받음

      if (nextQuestion) {
        setTimeout(() => {
          setMessages((prevMessages) => [...prevMessages, { text: nextQuestion, sender: "bot" }]);
          setIsLoading(false);  // 로딩 상태 종료
        }, 10);  // 응답 지연 시뮬레이션
      } else {
        console.warn("다음 질문을 찾을 수 없습니다.");
        setIsLoading(false);  // 질문이 없을 경우 로딩 종료
      }
    } catch (error) {
      console.error("사용자 메시지 전송 또는 응답 수신 중 오류 발생:", error);
      setIsLoading(false);  // 에러 발생 시 로딩 종료
    }

    // 입력 필드 초기화
    setUserInput("");
  };

  return (
    <div className="page-container">
      {/* 1번 구역: 좌측 날짜 목록 */}
      <div className="section-one">
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