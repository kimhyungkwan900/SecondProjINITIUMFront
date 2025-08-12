import { useEffect, useState } from "react";

// 핵심역량 진단결과 목록 테이블 컴포넌트
const AdminAssessmentResultListTable = ({
  assessmentList,
  selectedAssessment,
  setSelectedAssessment,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPage = 5;

  // 목록이 바뀌면 페이지를 1로 초기화한다.
  useEffect(() => {
    setCurrentPage(1);
  }, [assessmentList]);

  const totalPages = Math.ceil((assessmentList?.length ?? 0) / itemsPage) || 1;
  const startIndex = (currentPage - 1) * itemsPage;
  const currentItems = (assessmentList ?? []).slice(startIndex, startIndex + itemsPage);

  // 날짜 포맷: yyyymmdd → yyyy-MM-dd
  const formatDate = (yyyymmdd) => {
    if (!yyyymmdd || String(yyyymmdd).length !== 8) return "";
    const s = String(yyyymmdd);
    return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`;
  };

  return (
    <div>
      <div className="overflow-x-auto shadow rounded bg-white">
        <table className="w-full border text-sm text-center">
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

          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item) => {
                const isSelected = selectedAssessment?.assessmentNo === item.assessmentNo;
                return (
                  <tr
                    key={item.assessmentNo}
                    onClick={() =>
                      setSelectedAssessment(isSelected ? null : item)
                    }
                    className={`cursor-pointer hover:bg-blue-50 transition ${
                      isSelected ? "bg-blue-100 font-semibold" : ""
                    }`}
                  >
                    <td className="border px-4 py-2">{item.assessmentNo}</td>
                    <td className="border px-4 py-2">{item.assessmentName}</td>
                    <td className="border px-4 py-2">{formatDate(item.startDate)}</td>
                    <td className="border px-4 py-2">{formatDate(item.endDate)}</td>
                    <td className="border px-4 py-2">{item.chart}</td>
                    <td className="border px-4 py-2">{item.analysisStandard}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-gray-500 py-6">
                  조회된 진단이 없습니다.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded border ${
                currentPage === page
                  ? "bg-blue-600 text-white"
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
