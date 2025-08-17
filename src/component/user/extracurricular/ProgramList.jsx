import React, { useState } from "react";
import SurveyModal from "./SurveyModal";
import { generateCertificatePDF } from "./CertificateUtils";
import { useAuth } from "../../../hooks/useAuth.jsx";

const ProgramList = ({ programs, loading, onDataChange, selectedIds, setSelectedIds }) => {
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const { user } = useAuth();
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
    <div className="border border-gray-300 rounded-md overflow-hidden mt-4">
      {/* 테이블 헤더 */}
      <div className="grid grid-cols-8 gap-4 bg-[#E0E7E9] text-[#354649] px-4 py-3 text-center font-semibold text-sm">
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            onChange={handleSelectAll}
            checked={selectedIds.size === programs.length && programs.length > 0}
            aria-label="전체 선택"
          />
        </div>
        <div>프로그램 이름</div>
        <div>수료 조건</div>
        <div>현재 출석률</div>
        <div>교육 마지막일</div>
        <div>수료 여부</div>
        <div>설문 여부</div>
        <div>수료증발급</div>
      </div>

      {/* 테이블 본문 */}
      <div className="text-sm">
        {!programs || programs.length === 0 ? (
          <div className="p-6 text-[#6C7A89] text-center">조회된 프로그램이 없습니다.</div>
        ) : (
          programs.map((program, idx) => {
            const eduEndDate = new Date(program.eduEndYmd);
            const showSurveyButton = program.surveyYn === false && new Date() >= eduEndDate;

            return (
              <div
                key={program.eduMngId}
                className={`grid grid-cols-8 gap-4 items-center px-4 py-3 border-t border-gray-200 text-center ${
                  idx % 2 === 1 ? "bg-gray-50/50" : "bg-white"
                } hover:bg-gray-50`}
              >
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(program.eduAplyId)}
                    onChange={() => handleCheckboxChange(program.eduAplyId)}
                    aria-label={`선택 ${program.eduNm}`}
                  />
                </div>
                <div>{program.eduNm}</div>
                <div>출석 {program.cndCn}</div>
                <div>{program.attendance}%</div>
                <div>{program.eduEndYmd}</div>
                <div>
                  {program.eduFnshYn === "Y" ? (
                    <div className="font-bold text-green-600">수료</div>
                  ) : (
                    <span className="font-semibold text-red-500">미수료</span>
                  )}
                </div>
                <div>
                  {showSurveyButton ? (
                    <button
                      className="py-2 px-4 rounded-md bg-[#354649] text-white font-semibold text-sm hover:bg-[#6C7A89] transition-colors"
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
                </div>
                <div>
                  {program.eduFnshYn === "Y" ? (
                    <button
                      className="py-2 px-4 rounded-md bg-green-600 text-white font-semibold text-sm hover:bg-green-700 transition-colors"
                      onClick={() => {
                        generateCertificatePDF(name, program.eduNm, studentNo, schoolSubject);
                      }}
                    >
                      발급
                    </button>
                  ) : (
                    <span className="font-semibold text-red-500">발급불가</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

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