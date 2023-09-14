import React, { useState, useEffect } from 'react';

const Clock = (props) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const font = props.size
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // 1초마다 현재 시간 업데이트

    return () => {
      clearInterval(intervalId); // 컴포넌트가 언마운트되면 타이머 정리
    };
  }, []);

  // 현재 시간을 12시간 형식 (AM/PM)으로 포맷팅
  const formattedTime = currentTime.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false,
});
  
  return (
    <div
      style = {{
        position: 'absolute',
        left: '4%',
        fontSize : font,
        
      }}
    >
      <p
        style={{
            fontWeight: '700',
        }}
      >{formattedTime}</p>
    </div>
  );
};

export default Clock;
