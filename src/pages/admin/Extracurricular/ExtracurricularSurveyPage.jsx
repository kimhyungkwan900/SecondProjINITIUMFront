import { useState, useEffect } from "react";
import { fetchPrograms } from "../../../api/admin/extracurricular/program/ProgramApi";
import { fetchSurveyByProgram } from "../../../api/admin/extracurricular/survey/SurveyApi";

import Filter from "../../../component/admin/extracurricular/apply/Filter";
import SurveyList from "../../../component/admin/extracurricular/survey/SurveyList";
import SurveyProgramList from "../../../component/admin/extracurricular/survey/SurveyProgramList";
import AdminSectionHeader from "../../../component/admin/AdminSectionHeader";

const ExtracurricularSurveyPage = () => {
  const [filter, setFilter] = useState({ keyword: "", eduType: "", status: "APPROVED" });
  const [tempFilter, setTempFilter] = useState({ keyword: "", eduType: "", status: "APPROVED" });

  const [programs, setPrograms] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedProgram, setSelectedProgram] = useState(null);
  const [surveyData, setSurveyData] = useState([]);

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

  const fetchSurvey = async (programId) => {
    if (!programId) {
      setSurveyData([]);
      return;
    }
    const data = await fetchSurveyByProgram(programId);
    setSurveyData(data?.content || []);
  };

  const handleSearch = () => {
    setPage(1);
    setFilter(tempFilter);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter]);

  useEffect(() => {
    fetchSurvey(selectedProgram?.eduMngId);
  }, [selectedProgram]);

  const handleTempFilterChange = (field, value) => {
    setTempFilter((prev) => ({ ...prev, [field]: value }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSelectedProgram(null);
    setSurveyData([]);
  };

  const handleSelectProgram = (program) => {
    setSelectedProgram(program);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pb-10 space-y-6">
      {/* 페이지 타이틀 */}
      <AdminSectionHeader title="프로그램 만족도" />

      {/* 1) 검색/필터 */}
      <section className="adm-card p-4">
        <Filter
          filter={tempFilter}
          onFilterChange={handleTempFilterChange}
          onSearch={handleSearch}
        />
      </section>

      {/* 2) 프로그램 목록 */}
      <section>
        <SurveyProgramList
          programs={programs}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onSelectProgram={handleSelectProgram}
        />
      </section>

      {/* 3) 설문 결과 (선택 시 표시) */}
      {selectedProgram && (
        <section className="adm-card p-6">
          <div className="flex items-center mb-3">
            <span className="text-2xl text-[#354649] select-none">|</span>
            <h2 className="ml-2 text-lg font-semibold text-[#354649]">
              {selectedProgram.eduNm} 설문조사 결과
            </h2>
          </div>
          <hr className="border-gray-200 mb-4" />
          <SurveyList surveyData={surveyData} />
        </section>
      )}
    </div>
  );
};

export default ExtracurricularSurveyPage;
