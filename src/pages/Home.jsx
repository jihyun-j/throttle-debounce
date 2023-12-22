import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  // throttling과 debouncing을 제어하는 key
  let timerId = null;
  const [state, setState] = useState(true);

  // 메모리 누수 방지
  useEffect(() => {
    return () => {
      // 만약 유저가 throttling을 눌렀을 때 throttle에 함수가 실행 중
      // 그럼 다음 페이지로 갔을 때 그 동작이 메모리에 저장되어 실행 됨
      // 이것을 방지하기 위해 다음 페이지로 갔을 때 clearTimeout을 해줌
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  });

  const throttle = (delay) => {
    if (timerId) {
      // timerId가 있으면 바로 함수 종료
      return;
    }

    // 리렌더링 되면서 15번째까지만 동작하고 그 이후로는 동작하지 않음
    setState(!state);
    console.log(`API요청 실행! ${delay}ms 동안 추가요청은 안받습니다`);
    timerId = setTimeout(() => {
      console.log(`${delay}ms 지남 추가요청 받습니다`);
      timerId = null;
    }, delay);
  };

  // 반복적인 이벤트 이후, delay가 지나면 function
  const debounce = (delay) => {
    if (timerId) {
      // 할당되어 있는 timerId에 해당하는 타이머 제거
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      console.log(`마지막 요청으로부터 ${delay}ms 지났으므로 API 요청 실행`);
      timerId = null;
    }, delay);
  };

  return (
    <div style={{ paddingLeft: 20, paddingRight: 20 }}>
      <h1>Button 이벤트 예제</h1>

      <button onClick={() => throttle(2000)}>Throttle</button>
      <button onClick={() => debounce(2000)}>Debounce</button>
      <div>
        <button onClick={() => navigate("/company")}>페이지 이동</button>
      </div>
    </div>
  );
};

export default Home;
