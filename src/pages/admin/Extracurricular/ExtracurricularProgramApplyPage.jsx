import { useEffect, useState } from "react";
import { fetchPrograms } from "../../../api/admin/extracurricular/program/ProgramApi";
import { updateApply } from "../../../api/admin/extracurricular/program/ApplyApi";

import Filter from "../../../component/admin/extracurricular/apply/Filter";
import ProgramList from "../../../component/admin/extracurricular/apply/ProgramList";
import ApplyList from "../../../component/admin/extracurricular/apply/ApplyList";
import ApplyButton from "../../../component/admin/extracurricular/apply/ApplyButton";
import AdminSectionHeader from "../../../component/admin/AdminSectionHeader";

const ExtracurricularProgramApplyPage = () => {
  const [filter, setFilter] = useState({ keyword: "", eduType: "", status: "APPROVED" });
  const [programs, setPrograms] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedApplyIds, setSelectedApplyIds] = useState([]);

  const handleSelectedApplyChange = (selectedIds) => setSelectedApplyIds(selectedIds);

  const handleFilterChange = (field, value) => {
    setFilter((prev) => ({ ...prev, [field]: value }));
  };

  const fetchData = async () => {
    const data = await fetchPrograms(filter, page - 1, 5);
    if (!data) return;

    setPrograms(data.content || []);
    setTotalPages(data.totalPages || 0);

    if (!selectedProgram && data.content?.length) {
      setSelectedProgram(data.content[0]);
      return;
    }
    if (selectedProgram) {
      const updated = data.content?.find((p) => p.id === selectedProgram.id);
      setSelectedProgram(updated || null);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter]);

  const handlePageChange = (newPage) => setPage(newPage);
  const handleSelectProgram = (program) => setSelectedProgram(program);

  const handleUpdateStatus = async (applyIds, newStatus) => {
    if (!selectedProgram) {
      alert("프로그램을 선택해주세요.");
      return;
    }
    try {
      const updates = applyIds.map((id) => ({ eduAplyId: id, aprySttsNm: newStatus }));
      await updateApply(updates);
      alert("상태가 성공적으로 변경되었습니다.");
      fetchData();
      setSelectedApplyIds([]);
    } catch (error) {
      alert("상태 변경에 실패했습니다: " + error.message);
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-6 pb-10">
      {/* 페이지 헤더 */}
      <div className="pt-6 pb-2">
        <AdminSectionHeader title="프로그램 신청 관리" />
      </div>
      <div className="bg-white mt-8">
        {/* 검색/필터 섹션 */}
        <section className="adm-card p-6">
          <div className="flex items-center mb-4">
            <span className="text-2xl text-[#354649] select-none">|</span>
            <h2 className="ml-2 text-xl font-semibold text-[#354649]">검색 조건</h2>
          </div>
          <Filter filter={filter} onFilterChange={handleFilterChange} onSearch={fetchData} />
        </section>

        {/* 프로그램 목록 */}
        <div className="mx-6">
          <ProgramList
            programs={programs}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onSelectProgram={handleSelectProgram}
          />
        </div>

        {/* 액션 바 */}
        <section className="adm-card p-4">
          <div className="flex items-center justify-end">
            <ApplyButton
              selectedApplyIds={selectedApplyIds}
              onUpdateStatus={handleUpdateStatus}
              onRefresh={fetchData}
            />
          </div>
        </section>

        {/* 신청자 목록 */}
        {selectedProgram && (
          <section className="adm-card p-6 mt-4">
            <div className="flex items-center mb-4">
              <span className="text-2xl text-[#354649] select-none">|</span>
              <h2 className="ml-2 text-xl font-semibold text-[#354649]">
                신청자 목록 — {selectedProgram.eduNm || "선택된 프로그램"}
              </h2>
            </div>
            <hr className="border-gray-200 mb-4" />
            <ApplyList
              applyList={selectedProgram.applyList}
              selectedIds={selectedApplyIds}
              onSelectionChange={handleSelectedApplyChange}
            />
          </section>
        )}
      </div>
    </div>
  );
};

export default ExtracurricularProgramApplyPage;
