import { useState } from 'react';
import { submitExternalDiagnosis } from '../../../api/user/diagnostic/externalDiagnosisApi.jsx';

export const useExternalDiagnosisSubmit = () => {
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const submitTest = async (data) => {
    setSubmitting(true);
    try {
      // qestrnSeq는 문자열로 통일
      const qno = String(data.qestrnSeq);

      // answers: { 1: '5', 2: '3', ... }  ← value는 answerScore
      const toPairsSorted = (answersObj) =>
        Object.keys(answersObj)
          .map(Number)
          .sort((a, b) => a - b)
          .map((k) => [k, answersObj[k]]); // [[1,'5'], [2,'3'], ...]

      const buildAnswers = (qno, answersObj) => {
        const pairs = toPairsSorted(answersObj);

        if (qno === '6') {
          // 직업가치관(대학생) → "B1=값 B2=값 ..."
          return pairs.map(([k, v]) => `B${k}=${v}`).join(' ');
        }

        if (['8', '9', '10'].includes(qno)) {
          // 진로개발준비도/이공계전공적합도/주요능력효능감 → "값,값,값,..."
          return pairs.map(([, v]) => v).join(',');
        }

        throw new Error('지원되지 않는 검사 유형입니다.');
      };

      // data.answers가 이미 문자열이면 그대로 사용, 객체면 직렬화
      const answersString =
        typeof data.answers === 'string'
          ? data.answers
          : buildAnswers(qno, data.answers);

      const payload = {
        ...data,
        qestrnSeq: qno,
        answers: answersString, // ← 함수 레퍼런스 넣지 말고 결과 문자열 넣기!
        startDtm: data.startDtm ?? String(Date.now()),
      };

      const res = await submitExternalDiagnosis(payload);
      // api 모듈이 res.data를 반환하므로 그대로 결과
      setResult(res);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || '제출 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  return { result, submitting, submitTest };
};
