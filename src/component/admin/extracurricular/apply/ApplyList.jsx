import { useState } from "react";
import PageButton from "../PageButton.jsx";

const ApplyList = ({ applyList, selectedIds, onSelectionChange }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(applyList.length / itemsPerPage);

  const statusMap = {
    APPLY: "신청",
    ACCEPT: "승인",
    REJECT: "반려",
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    onSelectionChange([]); // 페이지 변경 시 선택 초기화 (부모 상태 변경)
  };

  const currentItems = applyList.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const newSelected = currentItems.map((item) => item.eduAplyId);
      onSelectionChange(newSelected);
    } else {
      onSelectionChange([]);
    }
  };

  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((x) => x !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  return (
    <div className="w-full overflow-x-auto mt-6 bg-white border rounded p-4">
      <h2 className="text-xl font-bold mb-4">신청자 목록</h2>
      <table className="w-full table-auto border-collapse border" style={{ tableLayout: "fixed" }}>
        <thead className="bg-gray-100 text-center">
          <tr>
            <th className="border p-2" style={{ width: "5%" }}>
              <input
                type="checkbox"
                checked={
                  currentItems.length > 0 &&
                  selectedIds.length === currentItems.length
                }
                onChange={handleSelectAll}
              />
            </th>
            <th className="border p-2" style={{ width: "10%" }}>
              신청 ID
            </th>
            <th className="border p-2" style={{ width: "20%" }}>
              신청일자
            </th>
            <th className="border p-2" style={{ width: "20%" }}>
              신청 상태
            </th>
            <th className="border p-2" style={{ width: "45%" }}>
              신청 내용
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan="5" className="border p-4 h-[205px] text-center text-gray-500">
                신청한 사람이 없습니다.
              </td>
            </tr>
          ) : (
            <>
              {currentItems.map((apply) => (
                <tr
                  key={apply.eduAplyId}
                  className="text-center border-t hover:bg-gray-50"
                >
                  <td className="border p-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(apply.eduAplyId)}
                      onChange={() => handleCheckboxChange(apply.eduAplyId)}
                    />
                  </td>
                  <td className="border p-2">{apply.eduAplyId}</td>
                  <td className="border p-2">{apply.eduAplyDt?.replace("T", " ")}</td>
                  <td className="border p-2">{statusMap[apply.aprySttsNm] || apply.aprySttsNm}</td>
                  <td className="border p-2 text-left">{apply.eduAplyCn || "-"}</td>
                </tr>
              ))}
              {/* 빈 행 채우기 */}
              {Array.from({ length: itemsPerPage - currentItems.length }).map((_, idx) => (
                <tr key={`empty-${idx}`} className="text-center border-t h-[40px]">
                  <td className="border p-2">&nbsp;</td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <PageButton
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ApplyList;