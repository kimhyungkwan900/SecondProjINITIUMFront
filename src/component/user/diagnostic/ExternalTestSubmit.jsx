import React, { useState, useContext } from 'react';
import { submitExternalDiagnosis } from '../../../api/user/diagnostic/externalDiagnosisApi.jsx';
import { UserContext } from '../../../App.jsx';

const ExternalTestSubmit = ({ studentNo, qestrnSeq, trgetSe, answers }) => {
  const { user } = useContext(UserContext); // 🔹 로그인 유저 정보 가져오기
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // 🔹 CareerNet 성별 코드 매핑
  const genderCodeMap = {
    남자: '100323',
    여자: '100324'
  };

  // 🔹 CareerNet 학년 코드 매핑 (예시: API 문서 참고)
  const gradeCodeMap = {
    1: '1', // 1학년
    2: '2', // 2학년
    3: '3', // 3학년
    4: '4'  // 4학년 (있다면)
  };

  const handleSubmit = () => {
    // CareerNet 요구 코드값 변환
    const mappedGender = genderCodeMap[user?.gender] || '';
    const mappedGrade = gradeCodeMap[user?.grade] || '';

    console.log("=== CareerNet 제출 데이터 확인 ===");
    console.log("원본 user:", user);
    console.log("studentNo:", studentNo);
    console.log("qestrnSeq:", qestrnSeq);
    console.log("trgetSe:", trgetSe);
    console.log("gender(raw):", user?.gender);
    console.log("gender(mapped):", mappedGender);
    console.log("grade(raw):", user?.grade);
    console.log("grade(mapped):", mappedGrade);
    console.log("answers(raw):", answers);

    const serializedAnswers = Object.entries(answers)
      .map(([qNum, value]) => `${qNum}=${value}`)
      .join(' ');

    console.log("answers(serialized):", serializedAnswers);

    // 유효성 체크
    if (!studentNo) {
      setError("학생 번호가 비어있습니다.");
      return;
    }
    if (!qestrnSeq) {
      setError("문항 시퀀스가 비어있습니다.");
      return;
    }
    if (!trgetSe) {
      setError("대상 구분 코드가 비어있습니다.");
      return;
    }
    if (!mappedGender) {
      setError("성별 코드가 없습니다.");
      return;
    }
    if (!mappedGrade) {
      setError("학년 코드가 없습니다.");
      return;
    }
    if (!serializedAnswers.trim()) {
      setError("응답 데이터가 비어있습니다.");
      return;
    }

    // CareerNet API 요청
    submitExternalDiagnosis({
      studentNo,
      qestrnSeq,
      trgetSe,
      answers: serializedAnswers,
      gender: mappedGender, // CareerNet 코드 적용
      school: user?.school || "학교 정보 없음",
      grade: mappedGrade
    })
      .then((res) => {
        console.log("✅ CareerNet 제출 성공:", res);
        setResult(res);
        setError(null);
      })
      .catch((err) => {
        console.error("❌ CareerNet 제출 실패:", err);
        setError("CareerNet API 제출 중 오류가 발생했습니다.");
      });
  };

  return (
    <div>
      <button onClick={handleSubmit}>외부 검사 제출</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && (
        <div>
          <p>검사 번호: {result.inspectSeq}</p>
          <p>검사명: {result.testName}</p>
          <a href={result.resultUrl} target="_blank" rel="noreferrer">
            결과 보기
          </a>
        </div>
      )}
    </div>
  );
};

export default ExternalTestSubmit;
