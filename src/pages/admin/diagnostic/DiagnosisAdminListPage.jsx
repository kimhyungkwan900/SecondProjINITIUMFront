import React, { useEffect, useState, useCallback } from "react";
import { fetchPagedTests } from "../../../api/user/diagnostic/diagnosisApi.jsx";
import { deleteAdminDiagnosticTest } from "../../../api/user/diagnostic/diagnosisAdminApi.jsx";
import AdminSectionHeader from "../../../component/admin/AdminSectionHeader.jsx";
import TextInput from "../../../component/common/TextInput.jsx";
import { useNavigate } from "react-router-dom";
import PageButton from "../../../component/admin/extracurricular/PageButton.jsx";

const PAGE_SIZE = 5;

const DiagnosisAdminListPage = () => {
  const [tests, setTests] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedTest, setSelectedTest] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadTests = useCallback(() => {
    setLoading(true);
    fetchPagedTests(keyword, page, PAGE_SIZE)
      .then((res) => {
        const content = res?.content || [];
        setTests(content);
        setTotalPages(res?.totalPages ?? 0);
        if (!content.some((t) => t.id === selectedTest?.id)) {
          setSelectedTest(null);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [keyword, page, selectedTest?.id]);

  useEffect(() => {
    loadTests();
  }, [loadTests]);

  const handleDelete = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteAdminDiagnosticTest(id)
        .then(() => {
          alert("삭제 완료");
          loadTests();
        })
        .catch((err) => {
          alert("삭제 실패");
          console.error(err);
        });
    }
  };

  const handleSearch = () => {
    setPage(0);
    loadTests();
  };

  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      <main className="max-w-7xl mx-auto px-6 pb-10">
        {/* 헤더 (Outlet 안쪽 헤더 규칙) */}
        <div className="pt-6">
          <AdminSectionHeader title="진단평가 목록" />
        </div>

        {/* 검색 / 필터 바 */}
        <div className="flex mb-4 items-center gap-2">
          <TextInput
            placeholder="검사명 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-auto rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1"
          />
          <button
            onClick={handleSearch}
            className="bg-[#222E8D] text-white px-3 py-1 rounded text-sm font-semibold hover:bg-blue-800 transition"
          >
            검색
          </button>
        </div>

        {/* 테이블 컨테이너 */}
        <div className="overflow-x-auto rounded-lg shadow-sm bg-white">
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-700 font-semibold border-b">
                <th className="px-3 py-2 border-b border-gray-200 text-center w-1/4">ID</th>
                <th className="px-3 py-2 border-b border-gray-200 text-center w-2/4">검사명</th>
                <th className="px-3 py-2 border-b border-gray-200 text-center w-1/4">관리</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="text-center text-gray-400 py-8">로딩 중...</td>
                </tr>
              ) : tests.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center text-gray-400 py-8">등록된 검사가 없습니다.</td>
                </tr>
              ) : (
                tests.map((test) => (
                  <tr
                    key={test.id}
                    className={`hover:bg-gray-50 cursor-pointer ${selectedTest?.id === test.id ? "bg-gray-50" : ""}`}
                    onClick={() => setSelectedTest(test)}
                  >
                    <td className="px-3 py-2 border-b border-gray-200 text-center">{test.id}</td>
                    <td className="px-3 py-2 border-b border-gray-200 text-center">{test.name}</td>
                    <td className="px-3 py-2 border-b border-gray-200 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/admin/diagnosis/edit/${test.id}`);
                        }}
                        className="bg-[#222E8D] text-white px-3 py-1 rounded text-sm font-semibold hover:bg-blue-800 transition mr-2"
                      >
                        수정
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(test.id);
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-red-600 transition"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 상세보기 카드 */}
        <section className="overflow-x-auto rounded-lg shadow-sm bg-white p-4 mt-4">
          {/* 제목 줄 (가이드) */}
          <div className="flex items-center gap-2">
            <span className="text-[26px] text-blue-600">|</span>
            <h2 className="text-[26px] font-semibold">검사 상세 정보</h2>
          </div>
          <hr className="my-4 border-gray-200" />

          {selectedTest ? (
            <div className="space-y-2 text-gray-700">
              <p><strong>ID:</strong> {selectedTest.id}</p>
              <p><strong>검사명:</strong> {selectedTest.name}</p>
              <p><strong>설명:</strong> {selectedTest.description || "설명 없음"}</p>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">상세보기를 위해 검사를 선택하세요.</div>
          )}
        </section>

        {/* 페이징 바 컨테이너 (가이드) */}
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">총 페이지: {totalPages}</div>
          <PageButton
            totalPages={totalPages}
            currentPage={page + 1} // PageButton은 1-based
            onPageChange={(p) => setPage(p - 1)} // 내부 state는 0-based
          />
        </div>
      </main>
    </div>
  );
};

export default DiagnosisAdminListPage;
