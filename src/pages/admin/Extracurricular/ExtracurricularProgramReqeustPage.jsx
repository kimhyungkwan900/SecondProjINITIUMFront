import { useState, useEffect } from "react";
import { fetchPrograms , updateProgramStatus } from "../../../api/admin/extracurricular/program/ProgramApi";

import RequestDerail from "../../../component/admin/extracurricular/request/RequestDetail";
import RequestFilter from "../../../component/admin/extracurricular/request/RequestFilter";
import RequestList from "../../../component/admin/extracurricular/request/RequestList";
import RequestButton from "../../../component/admin/extracurricular/request/RequestButton";
import RequestApprovedModal from "../../../component/admin/extracurricular/request/RequestApprovedModal";

const ExtracurricularProgramRequestPage = () => {
  const [filter, setFilter] = useState({ status: "", keyword: "", eduType:"", });
  const [programList, setProgramList] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showApprovedModal, setShowApprovedModal] = useState(false); // 🔹 모달 상태 추가

  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = async (pageNum = 0) => {
    const data = await fetchPrograms(filter, pageNum - 1 , 5);
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
    const updatedProgram = programList.find(p => p.eduMngId === selectedProgram.eduMngId);
    setSelectedProgram(updatedProgram || null);
    alert(`상태가 '반려'로 변경되었습니다.`);
  } catch (error) {
    console.error(error);
    alert("상태 변경에 실패했습니다.");
  }
};

  // 🔹 승인 + 마일리지 저장 핸들러
 const handleApproveWithMileage = async (surveyData) => {
  try {
    // surveyData = { eduMlg, srvyTtl, srvyQitemCn, srvyBgngDt, srvyEndDt }
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
    const updatedProgram = programList.find(p => p.eduMngId === selectedProgram.eduMngId);
    setSelectedProgram(updatedProgram || null);

    setShowApprovedModal(false);
    alert("승인이 완료되었습니다.");
  } catch (error) {
    console.error(error);
    alert("승인 처리에 실패했습니다.");
  }
};

  return (
    <div className="w-full p-4">
      <div className="sticky top-0 z-10 py-2">
        <h1 className="font-extrabold text-2xl text-gray-700">
          <span className="bg-sky-500 w-1 text-sky-500 select-none">1</span>
          <span className="ml-3">프로그램 등록 관리 페이지</span>
        </h1>
        <hr className="border" />
       <RequestButton
          onSearch={handleSearch}
          onChangeStatus={handleChangeStatus}
          programStatus={selectedProgram?.eduSttsNm}
        />
        <RequestFilter filter={filter} onChangeFilter={handleFilterChange} />
        <RequestList
          programList={programList}
          onSelect={handleSelectProgram}
          selectedId={selectedProgram?.eduMngId}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <RequestDerail program={selectedProgram} />  

        {/* 🔹 모달 렌더링 */}
        {showApprovedModal && selectedProgram && (
          <RequestApprovedModal
            programName={selectedProgram.eduNm}
            programEndDate={selectedProgram.eduEndDt}
            onSave={handleApproveWithMileage}
            onClose={() => setShowApprovedModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ExtracurricularProgramRequestPage;