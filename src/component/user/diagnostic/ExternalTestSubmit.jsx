import React, { useState, useContext } from 'react';
import { submitExternalDiagnosis } from '../../../api/user/diagnostic/externalDiagnosisApi.jsx';
import { UserContext } from '../../../App.jsx';

const ExternalTestSubmit = ({ studentNo, qestrnSeq, trgetSe, answers }) => {
  const { user } = useContext(UserContext);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // 🔹 CareerNet 성별 코드 매핑
  const genderCodeMap = {
    10: '10', // 남자
    20: '10'  // 여자
  };

  // 🔹 CareerNet 학년 코드 매핑
  const gradeCodeMap = {
    1: '1',
    2: '2',
    3: '3',
    4: '4'
  };

  const handleSubmit = () => {
    const mappedGender = genderCodeMap[user?.gender] || '';
    const mappedGrade = gradeCodeMap[user?.grade] || '';
    const startDtm = Date.now();

    // 🔸 응답 직렬화 로직 (검사번호에 따라 분기)
    let serializedAnswers = '';
    if (qestrnSeq === '6') {
      // 🔸 직업가치관검사 - 일반,대학생
      serializedAnswers = Object.entries(answers)
        .map(([key, val]) => `${key}=${val}`)
        .join(' ');
    } else if (['8', '9', '10'].includes(qestrnSeq)) {
      // 🔸 진로개발준비도/이공계전공적합도/주요능력효능감
      if (Array.isArray(answers)) {
        serializedAnswers = answers.join(',');
      } else {
        serializedAnswers = Object.values(answers).join(',');
      }
    } else {
      setError("지원되지 않는 검사 유형입니다.");
      return;
    }

    // 🔍 디버깅 로그
    console.log("=== CareerNet 제출 데이터 확인 ===");
    console.log("user:", user);
    console.log("studentNo:", studentNo);
    console.log("qestrnSeq:", qestrnSeq);
    console.log("trgetSe:", trgetSe);
    console.log("gender(mapped):", mappedGender);
    console.log("grade(mapped):", mappedGrade);
    console.log("answers(serialized):", serializedAnswers);
    console.log("startDtm:", startDtm);

    // 🔸 유효성 검사
    if (!studentNo) return setError("학생 번호가 비어있습니다.");
    if (!qestrnSeq) return setError("문항 시퀀스가 비어있습니다.");
    if (!trgetSe) return setError("대상 구분 코드가 비어있습니다.");
    if (!mappedGender) return setError("성별 코드가 없습니다.");
    if (!mappedGrade) return setError("학년 코드가 없습니다.");
    if (!serializedAnswers.trim()) return setError("응답 데이터가 비어있습니다.");

    // 🔸 CareerNet API 요청
    submitExternalDiagnosis({
      studentNo,
      qestrnSeq,
      trgetSe,
      answers: serializedAnswers,
      gender: mappedGender,
      school: user?.school || "학교 정보 없음",
      grade: mappedGrade,
      startDtm
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
