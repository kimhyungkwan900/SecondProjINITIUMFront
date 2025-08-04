import PageButton from "../PagaButton";
import { findCategoryById, CategoryData } from "../../../../mock/admin/Extracurricular/CategoryData";

const CategoryList = ({ programList = [], currentPage, itemsPerPage, onPageChange, onSelectItem }) => {
  const totalPages = Math.ceil(programList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = programList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table
          className="w-full text-sm border bg-white text-center"
          style={{ height: "240px", tableLayout: "fixed" }}
        >
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">핵심역량</th>
              <th className="border p-2">상위분류명</th>
              <th className="border p-2">프로그램분류명</th>
              <th className="border p-2">사용여부</th>
              <th className="border p-2">주관부서</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr style={{ height: "240px" }}>
                <td colSpan={6} className="text-center align-middle">조회된 카테고리가 없습니다.</td>
              </tr>
            ) : (
              <>
                {currentData.map((data, idx) => {
                  console.log("data:", data);
                  const upperCategory = findCategoryById(data.stgrId);

                  const competencyLabel =
                    upperCategory?.parentLabel ||
                    CategoryData.find(cat => cat.id === data.competency)?.label ||
                    data.competency || "";

                  const upperCategoryLabel = upperCategory?.label || data.stgrId || "";

                  return (
                    <tr key={idx} style={{ height: `${240 / itemsPerPage}px` }}>
                      <td
                        className="border p-2 text-blue-600 font-semibold cursor-pointer"
                        onClick={() => onSelectItem?.(data)}
                      >
                        {data.ctgryId}
                      </td>
                      <td className="border p-2">{competencyLabel}</td>
                      <td className="border p-2">{upperCategoryLabel}</td>
                      <td className="border p-2">{data.ctgryNm}</td>
                      <td className="border p-2">
                        <input 
                          type="checkbox"
                          checked={data.ctgryUseYn === "Y"}
                          disabled
                        />
                      </td>
                      <td className="border p-2">{data.subjectName}</td>
                    </tr>
                  );
                })}
                {/* 빈 행 채우기 */}
                {Array.from({ length: itemsPerPage - currentData.length }).map((_, idx) => (
                  <tr key={`empty-${idx}`} style={{ height: `${240 / itemsPerPage}px` }}>
                    <td className="border p-2">&nbsp;</td>
                    <td className="border p-2"></td>
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
      </div>

      <PageButton totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
    </div>
  );
};

export default CategoryList;