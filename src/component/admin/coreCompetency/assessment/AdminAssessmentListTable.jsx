import { useState } from "react";

const AdminAssessmentListTable = ({
  assessmentList,
  selectedAssessment,
  setSelectedAssessment,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPage = 5;

  const totalPages = Math.ceil(assessmentList.length / itemsPage);
  const startIndex = (currentPage - 1) * itemsPage;
  const currentItems = assessmentList.slice(startIndex, startIndex + itemsPage);

  // 날짜 포맷: yyyymmdd → yyyy-MM-dd
  const formatDate = (yyyymmdd) => {
    if (!yyyymmdd || String(yyyymmdd).length !== 8) return "";
    const s = String(yyyymmdd);
    return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`;
  };


  return (
    <div className="w-full">
      {/* 테이블 카드 컨테이너 */}
      <div className="adm-card overflow-x-auto">
        <table className="w-full text-sm">
          {/* 헤더 */}
          <thead>
            <tr className="adm-grid-9 hidden" aria-hidden /> {/* grid 클래스 충돌 방지용(무의미 요소) */}
            <tr>
              <th scope="col" className="adm-th text-center">진단번호</th>
              <th scope="col" className="adm-th text-center">진단명</th>
              <th scope="col" className="adm-th text-center">등록일자</th>
              <th scope="col" className="adm-th text-center">진단 시작일</th>
              <th scope="col" className="adm-th text-center">진단 종료일</th>
              <th scope="col" className="adm-th text-center">온라인 실시</th>
              <th scope="col" className="adm-th text-center">학년도</th>
              <th scope="col" className="adm-th text-center">학기</th>
              <th scope="col" className="adm-th text-center">관리부서</th>
            </tr>
          </thead>

          {/* 본문 */}
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => {
                const selected = selectedAssessment?.id === item.id;
                return (
                  <tr
                    key={`${item.assessmentNo}-${index}`}
                    onClick={() => setSelectedAssessment(item)}
                    aria-selected={selected ? "true" : "false"}
                    className={`cursor-pointer hover:bg-gray-50 even:bg-gray-50/50 transition-colors ${
                      selected ? "bg-indigo-50 ring-1 ring-inset ring-indigo-200 font-semibold" : "bg-white"
                    }`}
                  >
                    <td className="adm-td align-middle text-center">{item.assessmentNo}</td>
                    <td className="adm-td align-middle text-center">{item.assessmentName}</td>
                    <td className="adm-td align-middle text-center">{formatDate(item.registerDate)}</td>
                    <td className="adm-td align-middle text-center">{formatDate(item.startDate)}</td>
                    <td className="adm-td align-middle text-center">{formatDate(item.endDate)}</td>
                    <td className="adm-td align-middle text-center">{item.onlineYn}</td>
                    <td className="adm-td align-middle text-center">{item.academicYear}</td>
                    <td className="adm-td align-middle text-center">{item.semesterCode}</td>
                    <td className="adm-td align-middle text-center">{item.departmentName}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={9} className="adm-empty">
                  조회된 진단이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 py-3">
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => {
            const active = currentPage === page;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`adm-btn ${active ? "adm-btn--primary" : "adm-btn--secondary"} h-9 text-xs px-3`}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminAssessmentListTable;
