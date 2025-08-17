import { useState, useEffect } from "react";
import { fetchPrograms, updateProgramStatus } from "../../../api/admin/extracurricular/program/ProgramApi";

import AdminSectionHeader from "../../../component/admin/AdminSectionHeader.jsx";
import RequestDerail from "../../../component/admin/extracurricular/request/RequestDetail";
import RequestFilter from "../../../component/admin/extracurricular/request/RequestFilter";
import RequestList from "../../../component/admin/extracurricular/request/RequestList";
import RequestButton from "../../../component/admin/extracurricular/request/RequestButton";
import RequestApprovedModal from "../../../component/admin/extracurricular/request/RequestApprovedModal";

/** 기능은 그대로, ADMINPAGE_STYLE_GUIDE에 맞춰 레이아웃/CSS만 정리 */
const ExtracurricularProgramRequestPage = () => {
  const [filter, setFilter] = useState({ status: "", keyword: "", eduType: "" });
  const [programList, setProgramList] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showApprovedModal, setShowApprovedModal] = useState(false);

  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  // ⚠️ 기존 로직 유지(페이지 인덱스 변환 포함)
  const handleSearch = async (pageNum = 0) => {
    const data = await fetchPrograms(filter, pageNum - 1, 5);
    if (data) {
      setProgramList(data.content);
      setTotalPages(data.totalPages);
      setPage(data.number + 1);
    }
  };

  const handleSelectProgram = (program) => {
    setSelectedProgram(program);
  };

  const handlePageChange = (newPage) => {
    handleSearch(newPage);
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeStatus = async (newStatus) => {
    if (!selectedProgram) {
      alert("프로그램을 선택해주세요.");
      return;
    }

    if (newStatus === "APPROVED") {
      setShowApprovedModal(true);
      return;
    }

    try {
      // 반려 시 null 값 명시적으로 전달
      await updateProgramStatus(selectedProgram.eduMngId, newStatus, null, null);
      await handleSearch(page);
      const updated = programList.find((p) => p.eduMngId === selectedProgram.eduMngId);
      setSelectedProgram(updated || null);
      alert(`상태가 '반려'로 변경되었습니다.`);
    } catch (error) {
      console.error(error);
      alert("상태 변경에 실패했습니다.");
    }
  };

  // 승인 + 마일리지 저장
  const handleApproveWithMileage = async (surveyData) => {
    try {
      await updateProgramStatus(
        selectedProgram.eduMngId,
        "APPROVED",
        surveyData.eduMlg,
        {
          srvyTtl: surveyData.srvyTtl,
          srvyQitemCn: surveyData.srvyQitemCn,
          srvyBgngDt: surveyData.srvyBgngDt,
          srvyEndDt: surveyData.srvyEndDt,
        }
      );

      await handleSearch(page);
      const updated = programList.find((p) => p.eduMngId === selectedProgram.eduMngId);
      setSelectedProgram(updated || null);

      setShowApprovedModal(false);
      alert("승인이 완료되었습니다.");
    } catch (error) {
      console.error(error);
      alert("승인 처리에 실패했습니다.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pb-10">
      {/* 페이지 헤더 */}
      <div className="pt-6 pb-2">
        <AdminSectionHeader title="프로그램 등록 관리" />
      </div>

      {/* 검색/필터 + 액션바 한 카드 구성 */}
      <section className="adm-card p-6 mt-8">
        {/* 섹션 타이틀 */}
        <div className="flex items-center mb-4">
          <span className="text-2xl text-[#354649] select-none">|</span>
          <h2 className="ml-2 text-xl font-semibold text-[#354649]">검색 조건</h2>
        </div>
        <hr className="border-gray-200 mb-4" />

        {/* 필터 폼 (컴포넌트 내부 스타일 유지) */}
        <div className="mb-4">
          <RequestFilter filter={filter} onChangeFilter={handleFilterChange} />
        </div>

        {/* 액션 버튼 바: 우측 정렬 */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-end">
            <RequestButton
              onSearch={handleSearch}
              onChangeStatus={handleChangeStatus}
              programStatus={selectedProgram?.eduSttsNm}
            />
          </div>
        </div>
      </section>

      {/* 프로그램 목록 */}
      <section className="adm-card p-4">
        <RequestList
          programList={programList}
          onSelect={handleSelectProgram}
          selectedId={selectedProgram?.eduMngId}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>

      {/* 상세 정보 */}
      <section className="adm-card p-6">
        <div className="flex items-center mb-4">
          <span className="text-2xl text-[#354649] select-none">|</span>
          <h2 className="ml-2 text-xl font-semibold text-[#354649]">상세 정보</h2>
        </div>
        <hr className="border-gray-200 mb-4" />
        <RequestDerail program={selectedProgram} />
      </section>

      {/* 승인 모달 */}
      {showApprovedModal && selectedProgram && (
        <RequestApprovedModal
          programName={selectedProgram.eduNm}
          programEndDate={selectedProgram.eduEndDt}
          onSave={handleApproveWithMileage}
          onClose={() => setShowApprovedModal(false)}
        />
      )}
    </div>
  );
};

export default ExtracurricularProgramRequestPage;
