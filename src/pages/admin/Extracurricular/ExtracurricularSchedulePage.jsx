import { useState, useEffect } from "react";
import { fetchPrograms } from "../../../api/admin/extracurricular/program/ProgramApi";
import { attendanceList, attendanceUpdate } from "../../../api/admin/extracurricular/attendance/AttendanceApi"; // API 함수 임포트

import ProgramList from "../../../component/admin/extracurricular/schedule/ProgramList";
import Filter from "../../../component/admin/extracurricular/apply/Filter";
import ScheduleList from "../../../component/admin/extracurricular/schedule/ScheduleList";
import AttendanceList from "../../../component/admin/extracurricular/schedule/AttendnceList";

const ExtracurricularSchedulePage = () => {
  const [filter, setFilter] = useState({ keyword: "", eduType: "", status: "APPROVED" });
  const [tempFilter, setTempFilter] = useState({ keyword: "", eduType: "", status: "APPROVED" });
  const [programs, setPrograms] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const fetchData = async () => {
    const data = await fetchPrograms(filter, page - 1, 5);
    if (data) {
      setPrograms(data.content || []);
      setTotalPages(data.totalPages || 0);

      if (selectedProgram) {
        const updatedProgram = data.content?.find(p => p.eduMngId === selectedProgram.eduMngId);
        setSelectedProgram(updatedProgram || null);
      }
    }
  };

  const handleSearch = () => {
    setPage(1); // 페이지 초기화
    setFilter(tempFilter);
  };

  useEffect(() => {
    fetchData();
  }, [page, filter]);


  const handleTempFilterChange = (field, value) => {
    setTempFilter(prev => ({ ...prev, [field]: value }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setAttendanceData([]);  
    setSelectedProgram(null);
    setSelectedScheduleId(null);
  };

  const handleSelectProgram = (program) => {
    setSelectedProgram(program);
    setSelectedScheduleId(null); // 일정 선택 초기화
    setAttendanceData([]); // 출석 데이터 초기화
  };

    const handleSelectSchedule = async (eduShdlId) => {
  setSelectedScheduleId(eduShdlId);
  try {
    const data = await attendanceList(eduShdlId);  // data가 이미 배열
    setAttendanceData(data || []);
    console.log(data);
  } catch (error) {
    console.error("출석 데이터 조회 실패:", error);
    setAttendanceData([]);
  }
};

  const handleAttendanceSave = async (checkedMap) => {
    if (!selectedScheduleId) {
      alert("출석 일정을 먼저 선택해주세요.");
      return;
    }

    try {
      await attendanceUpdate(selectedScheduleId, checkedMap);
      alert("출석 상태가 저장되었습니다.");

      // 저장 후 다시 최신 출석 데이터 불러오기 (선택한 일정 기준)
      const updatedData = await attendanceList(selectedScheduleId);
      setAttendanceData(updatedData);
    } catch (error) {
      console.error("출석 저장 실패:", error);
      alert("출석 저장에 실패했습니다.");
    }
  };

  return (
    <div className="w-full p-4">
      <div className="sticky top-0 z-10 py-2">
        <h1 className="font-extrabold text-2xl text-gray-700">
          <span className="bg-rose-700 w-1 text-rose-700 select-none">1</span>
          <span className="ml-3">비교과 출석 관리 페이지</span>
        </h1>
        <hr className="border" />
        <Filter
          filter={tempFilter}
          onFilterChange={handleTempFilterChange}
          onSearch={handleSearch}
        />

        <ProgramList
          programs={programs}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onSelectProgram={handleSelectProgram}
        />

      </div>
        <div className="flex justify-between">
            <ScheduleList
            scheduleList={selectedProgram?.scheduleList || []}
            onSelectSchedule={handleSelectSchedule}
            />

            <AttendanceList
                attendanceList={attendanceData}
                onSave={handleAttendanceSave}
                />
        </div>
    </div>
  );
};

export default ExtracurricularSchedulePage;