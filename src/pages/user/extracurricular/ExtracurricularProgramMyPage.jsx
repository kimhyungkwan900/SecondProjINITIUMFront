import { useState, useEffect, useCallback, useMemo } from "react";
import { getMyProgramList } from "../../../api/user/extracurricular/UserProgramApi";
import { deletePrograms } from "../../../api/user/extracurricular/UserSurveyApi";

import PageHeader from "../../../component/common/PageHeader";
import Filter from "../../../component/user/extracurricular/Filter";
import ProgramList from "../../../component/user/extracurricular/ProgramList";
import { useAuth } from "../../../hooks/useAuth.jsx";
import Button from "../../../component/user/extracurricular/Button";
import PageButton from "../../../component/admin/extracurricular/PageButton";

const ExtracurricularProgramMyPage = () => {
  const { user } = useAuth();

  // 검색 필터
  const [filter, setFilter] = useState({ status: "", keyword: "" });

  // 목록/상태
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [error, setError] = useState(null);

  // 페이지네이션
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 학생번호
  const studentNo = useMemo(
    () => user?.studentNo ?? user?.loginId ?? "",
    [user]
  );

  const handleFilterChange = useCallback((field, value) => {
    setFilter((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSearch = useCallback(
    async (goPage = 1) => {
      if (!studentNo) {
        setPrograms([]);
        setTotalPages(1);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const data = await getMyProgramList({
          // 백엔드 파라미터명이 stdntNo라면 맞춰 변경
          stdfntNo: studentNo,
          eduFnshYn: filter.status || null,
          keyword: filter.keyword || null,
          page: goPage - 1,
          size: 10,
        });

        setPrograms(data?.content ?? []);
        setSelectedIds(new Set());

        // 페이지 정보(백엔드 스키마에 맞게 보정)
        const nextTotalPages =
          data?.totalPages ?? data?.page?.totalPages ?? 1;
        const nextPage = ((data?.number ?? 0) + 1) || goPage;

        setTotalPages(nextTotalPages);
        setPage(nextPage);
      } catch (e) {
        console.error("프로그램 조회 실패", e);
        setPrograms([]);
        setError("프로그램을 불러오는 중 오류가 발생했습니다.");
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    },
    [studentNo, filter.status, filter.keyword]
  );

  useEffect(() => {
    handleSearch(1);
  }, [handleSearch]);

  const handleDeleteSelected = useCallback(
    async () => {
      if (selectedIds.size === 0) {
        alert("삭제할 프로그램을 선택하세요.");
        return;
      }
      if (!window.confirm("선택한 프로그램을 삭제하시겠습니까?")) return;

      try {
        await deletePrograms(Array.from(selectedIds));
        alert("삭제 완료");
        await handleSearch(page);
      } catch (e) {
        console.error("삭제 실패", e);
        alert("삭제 중 오류가 발생했습니다.");
      }
    },
    [selectedIds, handleSearch, page]
  );

  const handlePageChange = useCallback(
    (next) => {
      if (next > 0 && next <= totalPages && next !== page) {
        handleSearch(next);
      }
    },
    [handleSearch, page, totalPages]
  );

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="참여 비교과 프로그램"
        breadcrumb={[
          { label: "마이페이지(학생)", link: "/mypage" },
          { label: "참여 비교과 프로그램 참여 현황", active: false },
          { label: "참여 비교과 프로그램", active: true }
        ]}
      />

      {/* 섹션 1: 검색 */}
      <section className="bg-white shadow-sm">
        <header className="px-5 py-4 bg-white">
          <h3 className="text-lg font-semibold text-[#354649]">검색</h3>
        </header>

        <div className="p-5">
          <Filter
            filter={filter}
            onFilterChange={handleFilterChange}
            onSearch={() => handleSearch(1)}
          />
        </div>
      </section>

      {/* 섹션 2: 결과 */}
      <section className="bg-white shadow-sm">
        <header className="flex items-center justify-between px-5 py-4 bg-white">
          <h3 className="text-lg font-semibold text-[#354649]">참여 내역</h3>
          <Button selectedIds={selectedIds} onDelete={handleDeleteSelected} />
        </header>

        <div className="p-5">
          {loading ? (
            <div className="p-4 text-sm text-[#6C7A89]">로딩중…</div>
          ) : error ? (
            <div className="p-4 text-sm text-red-500">{error}</div>
          ) : (
            <>
              <ProgramList
                programs={programs}
                loading={loading}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                onDataChange={() => handleSearch(page)}
              />

              <div className="mt-4 flex justify-end">
                <PageButton
                  totalPages={totalPages}
                  currentPage={page}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default ExtracurricularProgramMyPage;
