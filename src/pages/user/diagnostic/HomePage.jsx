import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>학생 역량 관리 시스템</h1>
      <ul>
        <li><Link to="/diagnosis">내부 진단검사</Link></li>
        <li><Link to="/external-diagnosis">외부 진단검사</Link></li>
        <li><Link to="/all-results">내 모든 진단검사 결과</Link></li>
      </ul>
    </div>
  );
};

export default HomePage;