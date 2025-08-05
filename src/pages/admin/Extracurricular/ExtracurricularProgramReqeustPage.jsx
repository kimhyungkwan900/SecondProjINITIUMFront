import { useState, useEffect } from "react";

import { fetchPrograms , updateProgramStatus } from "../../../api/admin/extracurricular/program/ProgramApi";

import RequestDerail from "../../../component/admin/extracurricular/request/RequestDetail";
import RequestFilter from "../../../component/admin/extracurricular/request/RequestFilter";
import RequestList from "../../../component/admin/extracurricular/request/RequestList";
import RequestButton from "../../../component/admin/extracurricular/request/RequestButton";


const ExtracurricularProgramRequestPage = () => {
  const [filter, setFilter] = useState({ status: "", keyword: "" });
  const [programList, setProgramList] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

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
    try {
      // 예시: updateProgramStatus(프로그램ID, 새 상태)
      await updateProgramStatus(selectedProgram.eduMngId, newStatus);

      // 상태 변경 후 리스트 다시 조회 (현재 페이지 유지)
      await handleSearch(page);

      // 선택된 프로그램 다시 선택 (업데이트된 정보가 반영되도록)
      const updatedProgram = programList.find(p => p.eduMngId === selectedProgram.eduMngId);
      setSelectedProgram(updatedProgram || null);

      alert(`상태가 '${newStatus === "APPROVED" ? "승인" : "반려"}'로 변경되었습니다.`);
    } catch (error) {
      console.error(error);
      alert("상태 변경에 실패했습니다.");
    }
  };
  return (
    <div className="w-full p-4">
      <div className="sticky top-0 bg-white z-10 py-2">
        <h1 className="font-extrabold text-2xl text-gray-700">
          <span className="bg-sky-500 w-1 text-sky-500 select-none">1</span>
          <span className="ml-3">프로그램 등록 관리 페이지</span>
        </h1>
        <hr className="border" />
        <RequestButton 
        onSearch={() => handleSearch(0)} 
        onChangeStatus={handleChangeStatus}  // 상태 변경 함수 전달
      />
        <RequestFilter filter={filter} onChangeFilter={handleFilterChange} />
        <RequestList
          programList={programList}
          onSelect={handleSelectProgram}
          selectedId={selectedProgram?.id}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <RequestDerail program={selectedProgram} />
      </div>
    </div>
  );
};

export default ExtracurricularProgramRequestPage;