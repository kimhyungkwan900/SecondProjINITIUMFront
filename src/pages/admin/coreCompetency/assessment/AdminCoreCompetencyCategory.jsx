import axios from "axios";
import { useEffect, useState } from "react";

const AdminCoreCompetencyCategory = ({ assessment }) => {
  const [coreList, setCoreList] = useState([]);
  const [selectedCoreId, setSelectedCoreId] = useState(null);
  const [subList, setSubList] = useState([]);

  const [currentPageCore, setCurrentPageCore] = useState(1);
  const [currentPageSub, setCurrentPageSub] = useState(1);
  const itemsPerPage = 5;

  // 핵심역량 페이징 계산
  const totalPagesCore = Math.ceil(coreList.length / itemsPerPage);
  const currentCoreList = coreList.slice(
    (currentPageCore - 1) * itemsPerPage,
    currentPageCore * itemsPerPage
  );

  // 하위역량 페이징 계산
  const totalPagesSub = Math.ceil(subList.length / itemsPerPage);
  const currentSubList = subList.slice(
    (currentPageSub - 1) * itemsPerPage,
    currentPageSub * itemsPerPage
  );

  // 핵심역량 목록 불러오기
  useEffect(() => {
    axios
      .get(`/api/admin/assessments/${assessment}/core`)
      .then((res) => {
        setCoreList(res.data);
        setCurrentPageCore(1);
      })
      .catch((err) => console.error("핵심역량 불러오기 실패", err));
  }, [assessment]);

  // 하위역량 목록 불러오기
  useEffect(() => {
    if (selectedCoreId) {
      axios
        .get(`/api/admin/assessments/${selectedCoreId}/subcategories`)
        .then((res) => {
          setSubList(res.data);
          setCurrentPageSub(1); // 핵심역량 선택 시 하위역량 페이지 초기화
        })
        .catch((err) => console.error("하위역량 불러오기 실패", err));
    } else {
      setSubList([]);
    }
  }, [selectedCoreId]);

  return (
    <div className="mt-6 px-6 py-6 bg-white rounded-xl shadow-md border border-gray-300">
      <div className="flex gap-4">
        {/* 왼쪽: 핵심역량 테이블 */}
        <div className="w-1/3">
          <span className="text-xl text-black font-bold">▐ 핵심역량</span>
          <table className="w-full mt-3 text-[16px] border border-gray-300 rounded-md overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-center">
              <tr>
                <th className="border p-2 w-1/4">번호</th>
                <th className="border p-2">핵심역량명</th>
              </tr>
            </thead>
            <tbody>
              {currentCoreList.map((core) => (
                <tr
                  key={core.id}
                  onClick={() => setSelectedCoreId(core.id)}
                  className={`cursor-pointer hover:bg-blue-50 ${
                    selectedCoreId === core.id ? "bg-blue-100 font-semibold" : ""
                  }`}
                >
                  <td className="border p-2 text-center">{core.id}</td>
                  <td className="border p-2 text-center">{core.name}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 핵심역량 페이징 */}
          {coreList.length > itemsPerPage && (
            <div className="mt-3 flex justify-center gap-2 text-sm">
              <button
                onClick={() => setCurrentPageCore((prev) => Math.max(prev - 1, 1))}
                disabled={currentPageCore === 1}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                이전
              </button>
              <span>
                {currentPageCore} / {totalPagesCore}
              </span>
              <button
                onClick={() =>
                  setCurrentPageCore((prev) =>
                    Math.min(prev + 1, totalPagesCore)
                  )
                }
                disabled={currentPageCore === totalPagesCore}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                다음
              </button>
            </div>
          )}
        </div>

        {/* 오른쪽: 하위역량 테이블 */}
        <div className="w-2/3">
          <span className="text-xl text-black font-bold">▐ 하위역량</span>
          <table className="w-full mt-3 text-[16px] border border-gray-300 rounded-md overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-center">
              <tr>
                <th className="border p-2 w-28">번호</th>
                <th className="border p-2 w-1/4">하위역량명</th>
                <th className="border p-2">정의</th>
              </tr>
            </thead>
            <tbody>
              {currentSubList.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-gray-500 py-4">
                    하위역량이 없습니다.
                  </td>
                </tr>
              ) : (
                currentSubList.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50">
                    <td className="border p-2 text-center">{sub.id}</td>
                    <td className="border p-2 text-center">{sub.name}</td>
                    <td className="border p-2 text-gray-600">
                      {sub.description || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* 하위역량 페이징 */}
          {subList.length > itemsPerPage && (
            <div className="mt-3 flex justify-center gap-2 text-sm">
              <button
                onClick={() => setCurrentPageSub((prev) => Math.max(prev - 1, 1))}
                disabled={currentPageSub === 1}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                이전
              </button>
              <span>
                {currentPageSub} / {totalPagesSub}
              </span>
              <button
                onClick={() =>
                  setCurrentPageSub((prev) =>
                    Math.min(prev + 1, totalPagesSub)
                  )
                }
                disabled={currentPageSub === totalPagesSub}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                다음
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCoreCompetencyCategory;
