import { useEffect, useState } from "react";
import { fetchPrograms } from "../../../api/admin/extracurricular/program/ProgramApi";

import Filter from "../../../component/admin/extracurricular/apply/Filter";
import ProgramList from "../../../component/admin/extracurricular/apply/ProgramList";
import ApplyList from "../../../component/admin/extracurricular/apply/ApplyList";

const ExtracurricularProgramApplyPage = () => {
  const [filter, setFilter] = useState({ keyword: "", eduType: "", status: "APPROVED" });
  const [programs, setPrograms] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedProgram, setSelectedProgram] = useState(null); // ✅ 추가

  const handleFilterChange = (field, value) => {
    setFilter((prev) => ({ ...prev, [field]: value }));
  };

  const fetchData = async () => {
    const data = await fetchPrograms(filter, page - 1, 5);
    if (data) {
      setPrograms(data.content || []);
      setTotalPages(data.totalPages || 0);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSelectProgram = (program) => {
    setSelectedProgram(program); // ✅ 선택된 프로그램 저장
  };

  return (
    <div className="w-full p-4">
      <div className="sticky top-0 bg-white z-10 py-2">
        <h1 className="font-extrabold text-2xl text-gray-700">
          <span className="bg-cyan-700 w-1 text-cyan-700 select-none">1</span>
          <span className="ml-3">프로그램 등록 신청 페이지</span>
        </h1>
        <hr className="border" />
      </div>

      <Filter 
        filter={filter} 
        onFilterChange={handleFilterChange} 
        onSearch={fetchData}
      />

      <ProgramList
        programs={programs}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onSelectProgram={handleSelectProgram} // ✅ 전달
      />

      {selectedProgram && <ApplyList applyList={selectedProgram.applyList} />}
    </div>
  );
};

export default ExtracurricularProgramApplyPage;