import React, { useEffect, useState } from 'react';
import { fetchStudentInfo } from '../../api/studentApi.jsx';
import { fetchExternalTests } from '../../../api/user/diagnostic/externalDiagnosisApi.jsx';

const ExternalResultFeature = ({ studentNo }) => {
  const [studentInfo, setStudentInfo] = useState(null);
  const [externalTests, setExternalTests] = useState([]);

  useEffect(() => {
    fetchStudentInfo(studentNo)
      .then((res) => setStudentInfo(res.data))
      .catch(console.error);

    fetchExternalTests()
      .then((res) => setExternalTests(res.data))
      .catch(console.error);
  }, [studentNo]);

  return (
    <div>
      <h2>외부 진단검사 결과</h2>
      {studentInfo && <p>학생명: {studentInfo.name} | 학년: {studentInfo.grade}</p>}
      <ul>
        {externalTests.map((test) => (
          <li key={test.id}>{test.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExternalResultFeature;