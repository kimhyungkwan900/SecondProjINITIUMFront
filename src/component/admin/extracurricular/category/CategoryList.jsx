import PageButton from "../PageButton.jsx";

const CategoryList = ({
  programList = [],
  currentPage,
  itemsPerPage,
  onPageChange,
  onSelectItem,
}) => {
  const totalPages = Math.ceil(programList.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = programList.slice(startIndex, startIndex + itemsPerPage);

  const rowHeight = 240 / itemsPerPage; // 테이블 고정 높이(240px) 기준 행 높이

  return (
    <div className="adm-card overflow-hidden w-full">
      <div className="overflow-x-auto">
        <table
          className="w-full text-sm text-center table-fixed"
          style={{ height: "240px" }}
        >
          <thead>
            <tr>
              <th className="adm-th w-[10%]">ID</th>
              <th className="adm-th">핵심역량</th>
              <th className="adm-th w-[15%]">상위분류명</th>
              <th className="adm-th w-[20%]">프로그램분류명</th>
              <th className="adm-th w-[10%]">사용여부</th>
              <th className="adm-th w-[15%]">주관부서</th>
            </tr>
          </thead>

          <tbody>
            {currentData.length === 0 ? (
              <tr style={{ height: "240px" }}>
                <td
                  colSpan={6}
                  className="adm-td text-center align-middle text-gray-500"
                >
                  조회된 카테고리가 없습니다.
                </td>
              </tr>
            ) : (
              <>
                {currentData.map((data) => (
                  // ✅ 중첩 <tr> 제거 (구문 오류 수정)
                  <tr
                    key={data.ctgryId}
                    style={{ height: `${rowHeight}px` }}
                    className="hover:bg-gray-50 even:bg-gray-50/50 text-gray-700"
                  >
                    <td
                      className="adm-td font-semibold cursor-pointer"
                      onClick={() => onSelectItem?.(data)}
                      title="상세 보기"
                    >
                      {data.ctgryId}
                    </td>
                    <td className="adm-td">{data.coreCategory}</td>
                    <td className="adm-td">{data.subCategory}</td>
                    <td className="adm-td">{data.ctgryNm}</td>
                    <td className="adm-td">
                      <input
                        type="checkbox"
                        checked={data.ctgryUseYn === "Y"}
                        disabled
                        className="pointer-events-none accent-[#222E8D]"
                        aria-label="사용 여부"
                      />
                    </td>
                    <td className="adm-td">{data.subjectName}</td>
                  </tr>
                ))}

                {/* 빈 행 채우기: 고정 높이 유지 */}
                {Array.from({ length: itemsPerPage - currentData.length }).map(
                  (_, idx) => (
                    <tr
                      key={`empty-${startIndex + idx}`}
                      style={{ height: `${rowHeight}px` }}
                      className="even:bg-gray-50/50"
                    >
                      <td className="adm-td">&nbsp;</td>
                      <td className="adm-td" />
                      <td className="adm-td" />
                      <td className="adm-td" />
                      <td className="adm-td" />
                      <td className="adm-td" />
                    </tr>
                  )
                )}
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* 하단 컨트롤 바(가이드 규격) */}
      <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-end">
        <PageButton
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default CategoryList;
