import { useState, useEffect } from "react";
import { fetchPrograms } from "../../../api/admin/extracurricular/program/ProgramApi";
import { attendanceList, attendanceUpdate } from "../../../api/admin/extracurricular/attendance/AttendanceApi";

import ProgramList from "../../../component/admin/extracurricular/schedule/ProgramList";
import Filter from "../../../component/admin/extracurricular/apply/Filter";
import ScheduleList from "../../../component/admin/extracurricular/schedule/ScheduleList";
import AttendanceList from "../../../component/admin/extracurricular/schedule/AttendnceList";
import AdminSectionHeader from "../../../component/admin/AdminSectionHeader";

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
    if (!data) return;

    setPrograms(data.content || []);
    setTotalPages(data.totalPages || 0);

    if (selectedProgram) {
      const updated = data.content?.find((p) => p.eduMngId === selectedProgram.eduMngId);
      setSelectedProgram(updated || null);
    }
  };

  const handleSearch = () => {
    setPage(1);
    setFilter(tempFilter);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter]);

  const handleTempFilterChange = (field, value) => {
    setTempFilter((prev) => ({ ...prev, [field]: value }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setAttendanceData([]);
    setSelectedProgram(null);
    setSelectedScheduleId(null);
  };

  const handleSelectProgram = (program) => {
    setSelectedProgram(program);
    setSelectedScheduleId(null);
    setAttendanceData([]);
  };

  const handleSelectSchedule = async (eduShdlId) => {
    setSelectedScheduleId(eduShdlId);
    try {
      const data = await attendanceList(eduShdlId);
      setAttendanceData(data || []);
    } catch (e) {
      console.error("출석 데이터 조회 실패:", e);
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
      const updated = await attendanceList(selectedScheduleId);
      setAttendanceData(updated || []);
    } catch (e) {
      console.error("출석 저장 실패:", e);
      alert("출석 저장에 실패했습니다.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pb-10">
      {/* 페이지 타이틀 */}
      <AdminSectionHeader title="비교과 출석 관리" />

      {/* 검색/필터 (카드) */}
      <section className="adm-card p-4 mt-8">
        <Filter
          filter={tempFilter}
          onFilterChange={handleTempFilterChange}
          onSearch={handleSearch}
        />
      </section>

      {/* 프로그램 목록 (섹션 붙이기: 위 카드 경계와 맞닿도록 -1px 보정) */}
      <section className="-mt-6">
        <ProgramList
          programs={programs}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onSelectProgram={handleSelectProgram}
        />
      </section>

      {/* 일정/출석 (두 카드가 위 섹션과 맞닿도록 -1px, 좌우 카드의 윗모서리/테두리 정리) */}
      <section className="-mt-px grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* 일정 리스트 */}
        <div className="adm-card p-4 rounded-t-none border-t-0">
          <div className="flex items-center mb-3">
            <span className="text-2xl text-[#354649] select-none">|</span>
            <h2 className="ml-2 text-lg font-semibold text-[#354649]">일정 목록</h2>
          </div>
          <hr className="border-gray-200 mb-3" />
          <ScheduleList
            scheduleList={selectedProgram?.scheduleList || []}
            onSelectSchedule={handleSelectSchedule}
          />
        </div>

        {/* 출석 리스트 */}
        <div className="adm-card p-4 rounded-t-none border-t-0 lg:border-l-0">
          <div className="flex items-center mb-3">
            <span className="text-2xl text-[#354649] select-none">|</span>
            <h2 className="ml-2 text-lg font-semibold text-[#354649]">출석 관리</h2>
          </div>
          <hr className="border-gray-200 mb-3" />
          <AttendanceList attendanceList={attendanceData} onSave={handleAttendanceSave} />
        </div>
      </section>
    </div>
  );
};

export default ExtracurricularSchedulePage;
