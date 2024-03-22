import React, { useState, useEffect } from 'react'; // useState와 useEffect를 추가합니다.
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import CameraMain from './CameraMain'
import Domestic from './Domestic';
import International from './International';
import "./Main.css";

function Main() {
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
            <div className="header">
              <h1>
                <Link to="/">VISIONERS</Link>
              </h1>
              <div className="nav">
                <ul>
                  <li><button onClick={() => handlePersonClick("선애")}>선애</button></li>
                  <li><button onClick={() => handlePersonClick("효진")}>효진</button></li>
                  <li><button onClick={() => handlePersonClick("홍민")}>홍민</button></li>
                  <li><button onClick={() => handlePersonClick("유빈")}>유빈</button></li>
                </ul>
              </div>
            </div>
            <div className="hero">
              <h2>항공기 반입 물품 체크 서비스</h2>
              <p>헷갈리는 물품이 항공기에 반입 가능한지 <br />지금 바로 확인하실 수 있습니다.</p>
              <Link to="/camera-main" onClick={handleCameraMainClick} className="btn">
                촬영으로 확인하기
              </Link>
              <button className="btn">검색으로 확인하기</button>
            </div>
            {currentPerson && (
              <div className="person-description">
                <h3>{currentPerson}</h3>
                {currentPerson === "선애" && <p>AI기능 개발을 담당하고 있어.</p>}
                {currentPerson === "효진" && <p>BackEnd 개발을 담당하고 있어.</p>}
                {currentPerson === "홍민" && <p>FrontEnd 개발을 담당하고 있어.</p>}
                {currentPerson === "유빈" && <p>FrontEnd 개발을 담당하고 있어.</p>}
              </div>
            )}
          </div>
        )}
        <Routes>
          <Route path="/camera-main" element={<CameraMain />} />
          <Route path="/domestic" element={<Domestic />} />
          <Route path="/international" element={<International />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Main;
