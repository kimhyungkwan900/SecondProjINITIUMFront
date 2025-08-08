import React, { useEffect, useState, useContext } from 'react';
import { fetchExternalQuestionsParsed, submitExternalDiagnosis } from '../../../api/user/diagnostic/externalDiagnosisApi.jsx';
import { UserContext } from '../../../App.jsx';

const ExternalTestQuestions = ({ qestrnSeq, trgetSe, studentNo, testName }) => {
  const { user } = useContext(UserContext);
  const [questions, setQuestions] = useState([]); // [{ questionText, options:[{text, value}] }]
  const [answers, setAnswers] = useState({});     // { 문항번호: 값(answerScore) }
  const [result, setResult] = useState(null);     // 제출 결과 저장
  const [error, setError] = useState(null);       // 오류 메시지

  /**
   *  외부 진단검사 문항 불러오기
   * - CareerNet API에서 문항을 파싱된 형태로 가져옴
   * - qestrnSeq만 필요 (v1 API)
   */
  useEffect(() => {
    setError(null);
    fetchExternalQuestionsParsed(String(qestrnSeq))
      .then((res) => setQuestions(res?.questions || []))
      .catch((e) => {
        console.error(e);
        setError('문항을 불러오지 못했습니다.');
      });
  }, [qestrnSeq]);

  /**
   * 특정 문항의 선택값 변경
   * - questionNumber: 문항 번호 (1부터 시작)
   * - value: 선택된 답변 값(answerScore)
   */
  const handleAnswerChange = (questionNumber, value) => {
    setAnswers((prev) => ({ ...prev, [questionNumber]: value }));
  };

  /**
   * 성별을 CareerNet 코드로 변환
   * - 남: 100323 / 여: 100324
   */
  const mapGenderToCode = (g) => {
    if (g == null) return '';
    const s = String(g).toLowerCase().trim(); // '10','20','m','남', 등
    if (['m', 'male', '1', '남', '남자', '100323', '10'].includes(s)) return '100323';
    if (['f', 'female', '2', '여', '여자', '100324', '20'].includes(s)) return '100324';
    return '';
  };

  // 응답 객체를 [문항번호, 값] 배열로 변환 (번호 오름차순)
  const toPairsSorted = (answersObj) =>
    Object.keys(answersObj)
      .map(Number)
      .sort((a, b) => a - b)
      .map((k) => [k, answersObj[k]]);

  /**
   * CareerNet 제출 규격에 맞춰 답변 직렬화
   * - 검사 종류별 응답 포맷 다름
   */
  const buildAnswers = () => {
    const qno = String(qestrnSeq);
    const total = questions.length;

    // 미응답 체크
    const missing = [];
    for (let i = 1; i <= total; i++) if (!answers[i]) missing.push(i);
    if (missing.length) {
      setError(`${missing.length}개 문항 미응답: ${missing.slice(0, 5).join(', ')}${missing.length > 5 ? ' ...' : ''}`);
      return null;
    }

    const pairs = toPairsSorted(answers);

    if (qno === '6') {
      // 직업가치관(대학생) → "B1=값 B2=값 ..."
      return pairs.map(([k, v]) => `B${k}=${v}`).join(' ');
    }

    if (['8', '9', '10'].includes(qno)) {
      // 진로개발준비도/이공계전공적합도/주요능력효능감 → "값,값,값,..."
      return pairs.map(([, v]) => v).join(',');
    }

    setError('지원되지 않는 검사 유형입니다.');
    return null;
  };

  const handleSubmit = async () => {
    setError(null);

    const genderCode = mapGenderToCode(user?.gender);
    const grade = user?.grade ? String(user.grade) : '';
    const serialized = buildAnswers();

    if (!studentNo || !qestrnSeq || !trgetSe || !genderCode || !grade || !serialized) {
      setError('필수 정보가 누락되었거나 모든 문항에 응답하지 않았습니다.');
      return;
    }

    const payload = {
      studentNo,
      qestrnSeq: String(qestrnSeq),
      trgetSe: String(trgetSe),
      answers: serialized,                 
      gender: genderCode,                  
      school: user?.school || '학교 정보 없음',
      grade,
      startDtm: String(Date.now()),
      name: user?.name || '홍길동',
      email: user?.email || 'user@example.com',
    };

    try {
      const data = await submitExternalDiagnosis(payload);
      setResult(data);
    } catch (err) {
      console.error('❌ CareerNet 제출 실패:', err);
      setError('제출 중 오류가 발생했습니다.');
    }
  };

  if (result) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold text-[#28B8B2]">검사가 성공적으로 제출되었습니다.</h2>
        <p>검사 번호: {result.inspectSeq}</p>
        <p>검사명: {result.testName || testName}</p>
        <a href={result.resultUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">
          결과 보기
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
      <h2 className="text-2xl font-bold text-[#222E8D] text-center mb-6">진단검사 문항</h2>

      {questions.map((q, idx) => (
        <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm">
          <p className="font-medium text-gray-800 mb-3">
            {idx + 1}. {q.questionText}
          </p>

          <div className="space-y-2">
            {q.options.map((opt, i) => (
              <label
                key={i}
                className="flex items-center gap-2 text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition"
              >
                <input
                  type="radio"
                  name={`q-${idx + 1}`}
                  value={opt.value}                                // ★ 실제 전송값(answerScore)
                  className="accent-[#28B8B2]"
                  onChange={() => handleAnswerChange(idx + 1, opt.value)} // ★ value 저장
                />
                {opt.text}
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center">
        <button
          onClick={handleSubmit}
          className="bg-[#28B8B2] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1a807b] transition"
        >
          제출하기
        </button>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default ExternalTestQuestions;
