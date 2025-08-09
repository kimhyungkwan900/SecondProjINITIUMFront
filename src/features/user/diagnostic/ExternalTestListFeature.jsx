import React from 'react';
import ExternalTestList from '../../../component/user/diagnostic/ExternalTestList.jsx';
import { useNavigate } from 'react-router-dom';

/**
 * ExternalTestListFeature
 * - 외부 진단검사(커리어넷) 목록 화면 컨테이너
 * - 검사 선택 시 ‘검사 실시’ 페이지로 이동하며 필요한 파라미터를 state로 전달
 * - props:
 *    - studentNo: 현재 사용자(학생) 식별 번호
 */
const ExternalTestListFeature = ({ studentNo }) => {
  const navigate = useNavigate();

  /**
   * 검사 선택 시 상세(응시) 페이지로 이동
   * - URL 파라미터: test.id
   * - location.state로 문항 조회 코드/대상 코드/검사명/학생번호 전달
   */
  const handleSelectTest = (test) => {
    navigate(`/external-diagnosis/conduct/${test.id}`, {
      state: {
        questionApiCode: test.questionApiCode, // 문항 조회용 CareerNet 코드(qestrnSeq)
        targetCode: test.targetCode,           // 대상 코드(trgetSe)
        name: test.name,                       // 검사명 (UI 표시용)
        studentNo                               // 현재 학생 번호(제출 시 사용)
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#f6f9fc] flex justify-center items-start py-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-[#222E8D] mb-6 text-center">
          진단검사 목록
        </h1>
        <div className="space-y-4">
          <ExternalTestList onSelectTest={handleSelectTest} />
        </div>
      </div>
    </div>
  );
};

export default ExternalTestListFeature;
