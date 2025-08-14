import React, { useState, useContext } from "react";
import SurveyModal from "./SurveyModal";
import { generateCertificatePDF } from "./CertificateUtils";
import { UserContext } from "../../../App";

const ProgramList = ({ programs, loading, onDataChange, selectedIds, setSelectedIds }) => {
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const { user } = useContext(UserContext);
  const name = user?.name || ""; 
  const studentNo = user?.studentNo || ""; 
  const schoolSubject = user?.schoolSubject || "";
  
  if (loading) {
    return (
      <div className="text-center text-gray-400 py-8">로딩중...</div>
    );
  }

  if (!programs || programs.length === 0) {
    return (
      <div className="overflow-x-auto rounded-lg shadow-sm bg-white mt-4">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-50 text-gray-700 font-semibold border-b">
            <tr>
              <th className="px-3 py-2 border-b border-gray-200 text-center">프로그램 이름</th>
              <th className="px-3 py-2 border-b border-gray-200 text-center">분류</th>
              <th className="px-3 py-2 border-b border-gray-200 text-center">수료 조건</th>
              <th className="px-3 py-2 border-b border-gray-200 text-center">교육 마지막일</th>
              <th className="px-3 py-2 border-b border-gray-200 text-center">수료 여부</th>
              <th className="px-3 py-2 border-b border-gray-200 text-center">설문 여부</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                className="px-3 py-2 border-b border-gray-200 text-center h-[100px]"
                colSpan={6}
              >
                조회된 프로그램이 없습니다.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  const now = new Date();

  const handleCheckboxChange = (eduAplyId) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eduAplyId)) {
        newSet.delete(eduAplyId);
      } else {
        newSet.add(eduAplyId);
      }
      return newSet;
    });
  };
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = programs.map(p => p.eduMngId);
      setSelectedIds(new Set(allIds));
    } else {
      setSelectedIds(new Set());
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-sm bg-white mt-4">
      <table className="w-full table-auto text-sm">
        <thead className="bg-gray-50 text-gray-700 font-semibold border-b">
          <tr>
            <th className="px-3 py-2 border-b border-gray-200 text-center">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedIds.size === programs.length && programs.length > 0}
                aria-label="전체 선택"
              />
            </th>
            <th className="px-3 py-2 border-b border-gray-200 text-center">프로그램 이름</th>
            <th className="px-3 py-2 border-b border-gray-200 text-center">수료 조건</th>
            <th className="px-3 py-2 border-b border-gray-200 text-center">현재 출석률</th>
            <th className="px-3 py-2 border-b border-gray-200 text-center">교육 마지막일</th>
            <th className="px-3 py-2 border-b border-gray-200 text-center">수료 여부</th>
            <th className="px-3 py-2 border-b border-gray-200 text-center">설문 여부</th>
            <th className="px-3 py-2 border-b border-gray-200 text-center">수료증발급</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program) => {
            const eduEndDate = new Date(program.eduEndYmd);
            const showSurveyButton =
              program.surveyYn === false && now >= eduEndDate;

            return (
              <tr key={program.eduMngId} className="hover:bg-gray-100 cursor-pointer">
                <td className="px-3 py-2 border-b border-gray-200 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(program.eduAplyId)}
                    onChange={() => handleCheckboxChange(program.eduAplyId)}
                    aria-label={`선택 ${program.eduNm}`}
                  />
                </td>
                <td className="px-3 py-2 border-b border-gray-200 text-center">
                  {program.eduNm}
                </td>
                <td className="px-3 py-2 border-b border-gray-200 text-center">
                  출석 {program.cndCn}
                </td>
                <td className="px-3 py-2 border-b border-gray-200 text-center">
                  {program.attendance}%
                </td>
                <td className="px-3 py-2 border-b border-gray-200 text-center">
                  {program.eduEndYmd}
                </td>
               <td className="px-3 py-2 border-b border-gray-200 text-center">
                {program.eduFnshYn === "Y" ? (
                  <div
                    className="px-2 py-1 text-green-600 rounded"
                  >
                    수료
                  </div>
                ) : (
                  <span className="text-red-500 font-semibold">미수료</span>
                )}
              </td>
                <td className="px-3 py-2 border-b border-gray-200 text-center">
                  {showSurveyButton ? (
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => {
                        setSelectedProgram(program);
                        setIsSurveyOpen(true);
                      }}
                    >
                      참여
                    </button>
                  ) : program.surveyYn === true ? (
                    "등록완료"
                  ) : (
                    "미등록"
                  )}
                </td>

                <td className="px-3 py-2 border-b border-gray-200 text-center">
                {program.eduFnshYn === "Y" ? (
                  <button
                    className="px-2 py-1 text-white font-bold rounded bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      generateCertificatePDF(name,program.eduNm , studentNo, schoolSubject);
                    }}
                  >
                    발급
                  </button>
                ) : (
                  <span className="text-red-500 font-semibold">발급불가</span>
                )}
              </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* 설문 모달 */}
      <SurveyModal
        isOpen={isSurveyOpen}
        onClose={() => setIsSurveyOpen(false)}
        program={selectedProgram}
        onSubmitSuccess={() => {
          setIsSurveyOpen(false);
          if (onDataChange) onDataChange();
        }}
      />
    </div>
  );
};

export default ProgramList;