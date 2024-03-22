import React, { useState, useEffect } from 'react'; // useState와 useEffect를 추가합니다.
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import CameraMain from './CameraMain'
import Domestic from './Domestic';
import International from './International';
import "./Resultok.css";

function ResultOk() {
  const [currentPerson, setCurrentPerson] = useState(null);
  const [cameraMainClicked, setCameraMainClicked] = useState(false);

  const handlePersonClick = (person) => {
    setCurrentPerson(person);
  };

  const handleCameraMainClick = () => {
    setCameraMainClicked(true);
  };

  useEffect(() => {
    let timer;
    if (currentPerson) {
      timer = setTimeout(() => setCurrentPerson(null), 5000); // 5초 후에 person을 null로 설정하여 설명 숨김
    }
    return () => clearTimeout(timer); // 컴포넌트가 언마운트되거나 다시 렌더링되기 전에 타이머 정리
  }, [currentPerson]); // `currentPerson` 상태가 변경될 때만 이 효과를 실행합니다.

  return (
    <Router>
      <div className="main">
        {!cameraMainClicked && (
          <div className="container">
            {/* ...header and hero content... */}
          </div>
        )}

             {/* 새로운 정보 메시지 및 링크 추가 */}
        <div className="info-section">
          <span className="info-message">
            이 물품은 반입이 가능합니다.
            <span className="info-icon"></span> {/* 아이콘 자리 */}
          </span>
          <div
            className="detail-link"
            onClick={() => {/* 상세 정보 확인 로직 */}}
          >
            자세한 정보 확인해보기
          </div>
        </div>

        {/* 라우트 설정 */}
        <Routes>
          <Route path="/camera-main" element={<CameraMain />} />
          <Route path="/camera-main/domestic" element={<Domestic />} />
          <Route path="/camera-main/international" element={<International />} />
        </Routes>
      </div>
    </Router>
  );
}

export default ResultOk;