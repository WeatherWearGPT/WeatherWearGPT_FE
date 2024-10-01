import React, { useState, useEffect } from 'react';
import './chat.css';  // CSS 파일 임포트
import axios from 'axios';

const Chat = () => {
  const [dates, setDates] = useState([]); // 날짜 목록을 저장할 상태
  const [userId, setUserId] = useState(''); // 로그인된 유저 ID
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 로그인된 유저의 ID를 가져오는 로직 (예: 로컬 스토리지 또는 API)
  useEffect(() => {
    // 여기서는 로컬 스토리지에 저장된 userId를 가져오는 것으로 가정합니다.
    const storedUserId = localStorage.getItem('userId'); // userId는 로그인 시 저장된 값
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error('로그인된 유저 ID를 찾을 수 없습니다.');
    }
  }, []);

  // API에서 날짜 목록을 가져오는 함수
  useEffect(() => {
    const fetchDates = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`http://43.202.86.72/gpt/dialogues/${userId}`);
        // 서버 응답에서 날짜 정보를 추출하여 상태에 저장
        const fetchedDates = response.data.map((dialogue) => dialogue.date); // 서버 데이터 구조에 맞게 수정
        setDates(fetchedDates);
        setLoading(false);
      } catch (error) {
        console.error('날짜 데이터를 가져오는 중 오류가 발생했습니다.', error);
        setLoading(false);
      }
    };

    fetchDates();
  }, [userId]); // userId가 설정된 후에만 API 호출

  return (
    <div className="page-container">
      {/* 1번 구역: 왼쪽 반투명 회색 박스 */}
      <div className="section-one">
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          dates.map((date, index) => <p key={index}>{date}</p>) // API에서 가져온 날짜 목록을 표시
        )}
      </div>

      {/* 2번 구역: 오른쪽 반투명 박스 (채팅) */}
      <div className="section-two">
        {/* 채팅 메시지 목록 및 다른 UI 요소들이 들어갈 부분 */}
      </div>
    </div>
  );
};

export default Chat;