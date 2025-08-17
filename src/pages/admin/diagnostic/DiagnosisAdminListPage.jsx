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
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* 헤더 */}
        <AdminSectionHeader title="진단평가 목록" />

        {/* 검색 / 필터 바 */}
        <div className="adm-card adm-toolbar pt-6">
          <div className="flex-1">
            <TextInput
              placeholder="검사명 검색"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="adm-control w-full !md:w-full"
            />
          </div>
          <button onClick={handleSearch} className="adm-btn adm-btn--primary">
            검색
          </button>
        </div>

        {/* 리스트 카드(테이블) */}
        <div className="adm-card overflow-hidden">
          {/* 헤더 */}
          <div className="grid grid-cols-3">
            <div className="adm-th">ID</div>
            <div className="adm-th">검사명</div>
            <div className="adm-th">관리</div>
          </div>

          {/* 본문 */}
          <div>
            {loading ? (
              <div className="adm-loading">로딩 중...</div>
            ) : tests.length === 0 ? (
              <div className="adm-empty">등록된 검사가 없습니다.</div>
            ) : (
              tests.map((test) => {
                const selected = selectedTest?.id === test.id;
                return (
                  <div
                    key={test.id}
                    className={`grid grid-cols-3 hover:bg-gray-50 even:bg-gray-50/50 ${selected ? "bg-indigo-50 font-semibold" : "bg-white"}`}
                    onClick={() => setSelectedTest(test)}
                    aria-selected={selected}
                    role="row"
                  >
                    <div className="adm-td">{test.id}</div>
                    <div className="adm-td">{test.name}</div>
                    <div className="adm-td">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/admin/diagnosis/edit/${test.id}`);
                        }}
                        className="adm-btn adm-btn--primary mr-2"
                      >
                        수정
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(test.id);
                        }}
                        className="adm-btn adm-btn--dangerOutline"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* 하단 컨트롤 바 */}
          <div className="px-4 py-3 flex justify-between items-center border-t border-gray-200">
            <div className="text-sm text-gray-600">총 페이지: <b>{totalPages}</b></div>
            <PageButton
              totalPages={totalPages}
              currentPage={page + 1}
              onPageChange={(p) => setPage(p - 1)}
            />
          </div>
        </div>

        {/* 상세보기 카드 */}
        <section className="adm-card p-6">
          <h2 className="text-base font-semibold text-gray-700">검사 상세 정보</h2>
          <div className="my-3 border-t border-gray-200" />
          {selectedTest ? (
            <div className="space-y-2 text-gray-700">
              <p><strong>ID:</strong> {selectedTest.id}</p>
              <p><strong>검사명:</strong> {selectedTest.name}</p>
              <p><strong>설명:</strong> {selectedTest.description || "설명 없음"}</p>
            </div>
          ) : (
            <div className="adm-empty">상세보기를 위해 검사를 선택하세요.</div>
          )}
        </section>
      </main>
    </div>
  );
};

export default DiagnosisAdminListPage;
