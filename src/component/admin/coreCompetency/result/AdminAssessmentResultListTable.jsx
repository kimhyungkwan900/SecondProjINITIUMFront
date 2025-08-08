import { useState } from "react";
import AdminAssessmentDetailPanel from "../assessment/AdminAssessmentDetailPanel";

// 핵심역량 진단결과 목록 테이블 컴포넌트
const AdminAssessmentResultListTable = ({ assessmentList, setSelectedAssessment }) => {
  // 현재 페이지 번호 (기본 1페이지)
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPage = 5; // 한 페이지에 표시할 항목 수

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(assessmentList.length / itemsPage);

  // 현재 페이지에 해당하는 데이터의 시작 인덱스
  const startIndex = (currentPage - 1) * itemsPage;

  // 현재 페이지에서 보여줄 데이터 슬라이싱
  const currentItems = assessmentList.slice(startIndex, startIndex + itemsPage);

  // 날짜 포맷: yyyymmdd → yyyy-MM-dd
  const formatDate = (yyyymmdd) => {
    if (!yyyymmdd || yyyymmdd.length !== 8) return "";
    return `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6, 8)}`;
  };

  return (
    <div className="">
      {/* 테이블 박스 */}
      <div className="overflow-x-auto shadow rounded bg-white">
        <table className="w-full border text-sm text-center">
          {/* 테이블 헤더 */}
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="border px-4 py-2">진단번호</th>
              <th className="border px-4 py-2">진단명</th>
              <th className="border px-4 py-2">진단 시작일</th>
              <th className="border px-4 py-2">진단 종료일</th>
              <th className="border px-4 py-2">차트표시선택</th>
              <th className="border px-4 py-2">분석계산기준</th>
            </tr>
          </thead>

          {/* 테이블 바디 */}
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr
                  key={`${item.assessmentNo}-${index}`} // 고유 key 지정
                  onClick={() => setSelectedAssessment(item)} // 행 클릭 시 선택된 진단 설정
                  className="cursor-pointer hover:bg-blue-50 transition" // 마우스 오버 효과
                >
                  <td className="border px-4 py-2">{item.assessmentNo}</td>
                  <td className="border px-4 py-2">{item.assessmentName}</td>
                  <td className="border px-4 py-2">{formatDate(item.startDate)}</td>
                  <td className="border px-4 py-2">{formatDate(item.endDate)}</td>
                  <td className="border px-4 py-2">{item.chart}</td>
                  <td className="border px-4 py-2">{item.analysisStandard}</td>
                </tr>
              ))
            ) : (
              // 데이터 없을 경우 메시지 출력
              <tr>
                <td colSpan="9" className="text-center text-gray-500 py-6">
                  조회된 진단이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 버튼 */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)} // 페이지 번호 클릭 시 상태 변경
              className={`px-3 py-1 rounded border ${
                currentPage === page
                  ? "bg-blue-600 text-white" // 현재 페이지 강조
                  : "bg-white text-gray-700"
              } hover:bg-blue-100`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAssessmentResultListTable;
