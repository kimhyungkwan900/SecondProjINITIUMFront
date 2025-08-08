import { useState } from "react";

// 관리자 진단 평가 리스트 테이블 컴포넌트
const AdminAssessmentListTable = ({ assessmentList, setSelectedAssessment }) => {

  // 현재 페이지 상태 (기본값 1페이지)
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPage = 5; // 한 페이지당 보여줄 항목 수

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(assessmentList.length / itemsPage);

  // 현재 페이지에 해당하는 데이터의 시작 인덱스
  const startIndex = (currentPage - 1) * itemsPage;

  // 현재 페이지에서 보여줄 항목들 추출
  const currentItems = assessmentList.slice(startIndex, startIndex + itemsPage);

  // 날짜 포맷 함수 (yyyymmdd → yyyy-mm-dd)
  const formatDate = (yyyymmdd) => {
    if (!yyyymmdd || yyyymmdd.length !== 8) return "";
    return `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6, 8)}`;
  };

  return (
    <div className="w-full px-0">
      {/* 테이블 박스 */}
      <div className="overflow-x-auto shadow rounded bg-white">
        <table className="w-full border text-sm text-center">
          {/* 테이블 헤더 */}
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="border px-4 py-2">진단번호</th>
              <th className="border px-4 py-2">진단명</th>
              <th className="border px-4 py-2">등록일자</th>
              <th className="border px-4 py-2">진단 시작일</th>
              <th className="border px-4 py-2">진단 종료일</th>
              <th className="border px-4 py-2">온라인 실시</th>
              <th className="border px-4 py-2">학년도</th>
              <th className="border px-4 py-2">학기</th>
              <th className="border px-4 py-2">관리부서</th>
            </tr>
          </thead>
          {/* 테이블 바디 */}
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr
                  key={`${item.assessmentNo}-${index}`} // 고유 키 구성
                  onClick={() => setSelectedAssessment(item)} // 행 클릭 시 선택된 진단 설정
                  className="cursor-pointer hover:bg-blue-50 transition" // 마우스 오버 효과
                >
                  <td className="border px-4 py-2">{item.assessmentNo}</td>
                  <td className="border px-4 py-2">{item.assessmentName}</td>
                  <td className="border px-4 py-2">{formatDate(item.registerDate)}</td>
                  <td className="border px-4 py-2">{formatDate(item.startDate)}</td>
                  <td className="border px-4 py-2">{formatDate(item.endDate)}</td>
                  <td className="border px-4 py-2">{item.onlineYn}</td>
                  <td className="border px-4 py-2">{item.academicYear}</td>
                  <td className="border px-4 py-2">{item.semesterCode}</td>
                  <td className="border px-4 py-2">{item.departmentName}</td>
                </tr>
              ))
            ) : (
              // 데이터가 없을 경우 표시
              <tr>
                <td colSpan="9" className="text-center text-gray-500 py-6">
                  조회된 진단이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 버튼 영역 */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)} // 버튼 클릭 시 해당 페이지로 이동
              className={`px-3 py-1 rounded border ${
                currentPage === page
                  ? "bg-blue-600 text-white" // 현재 페이지 버튼 강조
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

export default AdminAssessmentListTable;
