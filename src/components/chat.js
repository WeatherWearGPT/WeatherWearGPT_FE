import React, { useState, useEffect } from 'react';
import './chat.css';  // CSS 파일 임포트
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Chat = () => {
  const [messages, setMessages] = useState([]);  // 메시지 목록 (GPT 질문 및 사용자 응답)
  const [userInput, setUserInput] = useState('');  // 사용자 입력 필드 상태
  const [isLoading, setIsLoading] = useState(false);  // 로딩 상태 표시
  const userId = 12345;  // 실제 사용자 ID (로그인 후 받아오는 방식으로 수정 가능)

  // 1. 컴포넌트가 마운트되면, GPT와 대화 시작 (첫 질문 받아오기)
  useEffect(() => {
    const startChat = async () => {
      try {
        console.log("대화 시작 중...");
        // GPT와 대화 시작을 위해 첫 질문 API 호출
        const start = await axios.post(`${API_BASE_URL}/gpt/dialogues/start/${userId}`);
        console.log("API Response (첫 질문):", start.data);

        const initialQuestion = start.data.questionAsked || "Q1. 오늘 외출할 계획이 있으신가요?";
        setMessages([{ text: initialQuestion, sender: "bot" }]);  // 첫 질문을 화면에 출력
      } catch (error) {
        console.error("Error starting chat:", error);
      }
    };
    startChat();  // 대화 시작 함수 호출
  }, [userId]);

  // 사용자 입력 처리 (텍스트 입력값 변화에 따라 상태 업데이트)
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // 2. 사용자 메시지를 보내고 GPT로부터 응답 받기
  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;  // 빈 입력 방지

    // 사용자 메시지를 화면에 추가
    const userMessage = { text: userInput, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setIsLoading(true);  // 로딩 상태 시작

    try {
      console.log("사용자 응답 전송 중:", userInput);

      // 2.1 사용자의 응답을 서버로 전송 (백엔드 API와 연동하여 대화 진행)
      await axios.post(`${API_BASE_URL}/gpt/dialogues/respond/${userId}`, {
        userresponse: userInput  // 사용자의 입력을 서버로 전달
      });

      console.log("사용자 응답 전송 완료, GPT 응답 대기 중...");

      // 2.2 서버에서 새 질문을 받아옴
      const response = await axios.post(`${API_BASE_URL}/gpt/dialogues/respond/${userId}`, {
        userresponse: userInput
      });

      console.log("API Response (다음 질문):", response.data);

      const nextQuestion = response.data.questionAsked;  // 새 질문 받아오기

      if (nextQuestion) {
        // GPT의 질문을 메시지 목록에 추가
        setTimeout(() => {
          setMessages((prevMessages) => [...prevMessages, { text: nextQuestion, sender: "bot" }]);
          setIsLoading(false);  // 로딩 상태 종료
        }, 1000);  // 응답 지연 처리 (1초 후 출력)
      } else {
        console.warn("응답에서 새 질문을 찾을 수 없습니다.");
        setIsLoading(false);  // 질문이 없을 경우 로딩 종료
      }
    } catch (error) {
      console.error("Error receiving GPT response:", error);
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