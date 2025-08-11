import { useEffect, useState } from "react";
import { fetchPrograms } from "../../../api/admin/extracurricular/program/ProgramApi";
import { updateApply } from "../../../api/admin/extracurricular/program/ApplyApi";

import Filter from "../../../component/admin/extracurricular/apply/Filter";
import ProgramList from "../../../component/admin/extracurricular/apply/ProgramList";
import ApplyList from "../../../component/admin/extracurricular/apply/ApplyList";
import ApplyButton from "../../../component/admin/extracurricular/apply/ApplyButton";

const ExtracurricularProgramApplyPage = () => {
  const [filter, setFilter] = useState({ keyword: "", eduType: "", status: "APPROVED" });
  const [programs, setPrograms] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedProgram, setSelectedProgram] = useState(null); // ✅ 추가
  const [selectedApplyIds, setSelectedApplyIds] = useState([]);

  const handleSelectedApplyChange = (selectedIds) => {
  setSelectedApplyIds(selectedIds);
};

  const handleFilterChange = (field, value) => {
    setFilter((prev) => ({ ...prev, [field]: value }));
  };

const fetchData = async () => {
  const data = await fetchPrograms(filter, page -1, 5); 
  if (data) {
    setPrograms(data.content || []);
    setTotalPages(data.totalPages || 0);

    if (!selectedProgram && data.content && data.content.length > 0) {
      setSelectedProgram(data.content[0]);
    } else if (selectedProgram) {
      const updatedProgram = data.content?.find(
        (p) => p.id === selectedProgram.id
      );
      if (updatedProgram) {
        setSelectedProgram(updatedProgram);
      } else {
        setSelectedProgram(null);
      }
    }
  }
};

 useEffect(() => {
  fetchData();
}, [page, filter]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSelectProgram = (program) => {
    setSelectedProgram(program); // ✅ 선택된 프로그램 저장
  };
  const handleUpdateStatus = async (applyIds, newStatus) => {
  if (!selectedProgram) {
    alert("프로그램을 선택해주세요.");
    return;
  }

  try {
    const updates = applyIds.map((id) => ({
      eduAplyId: id,
      aprySttsNm: newStatus,
    }));

    await updateApply(updates);

    alert("상태가 성공적으로 변경되었습니다.");
    fetchData();
    setSelectedApplyIds([]); // 여기서 체크박스 선택 초기화
  } catch (error) {
    alert("상태 변경에 실패했습니다: " + error.message);
  }
};

  return (
    <div className="w-full p-4">
      <div className="sticky top-0 z-10 py-2">
        <h1 className="font-extrabold text-2xl text-gray-700">
          <span className="bg-cyan-700 w-1 text-cyan-700 select-none">1</span>
          <span className="ml-3">프로그램 신청 관리 페이지</span>
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
      
      <ApplyButton
        selectedApplyIds={selectedApplyIds}
        onUpdateStatus={handleUpdateStatus}
        onRefresh={fetchData}
      />

      {selectedProgram && (
      <ApplyList
        applyList={selectedProgram.applyList}
        selectedIds={selectedApplyIds}         // 선택 상태를 props로 넘김
        onSelectionChange={handleSelectedApplyChange}
      />
    )}
    </div>
  );
};

export default ExtracurricularProgramApplyPage;