
import {useState, useEffect} from "react"
import { fetchPrograms } from "../../../api/admin/extracurricular/program/ProgramApi";
import { fetchSurveyByProgram } from "../../../api/admin/extracurricular/survey/SurveyApi";

import ProgramList from "../../../component/admin/extracurricular/schedule/ProgramList";
import Filter from "../../../component/admin/extracurricular/apply/Filter";
import SurveyList from "../../../component/admin/extracurricular/survey/SurveyList";
import SurveyProgramList from "../../../component/admin/extracurricular/survey/SurveyProgramList";

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
    if (data) {
      setPrograms(data.content || []);
      setTotalPages(data.totalPages || 0);

      if (selectedProgram) {
        const updatedProgram = data.content?.find(p => p.eduMngId === selectedProgram.eduMngId);
        setSelectedProgram(updatedProgram || null);
      }
    }
  };
  const fetchSurvey = async (programId) => {
    if (!programId) {
      setSurveyData([]);
      return;
    }
    const data = await fetchSurveyByProgram(programId);
    setSurveyData(data?.content || []); // Page 객체의 content 사용
  };

  const handleSearch = () => {
    setPage(1); // 페이지 초기화
    setFilter(tempFilter);
  };

  useEffect(() => {
    fetchData();
  }, [page, filter]);

   useEffect(() => {
    fetchSurvey(selectedProgram?.eduMngId);
  }, [selectedProgram]);

  const handleTempFilterChange = (field, value) => {
    setTempFilter(prev => ({ ...prev, [field]: value }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSelectedProgram(null);
    setSurveyData([]);
  };

  const handleSelectProgram = (program) => {
    setSelectedProgram(program);
  };



    return(
        <div className="w-full p-4">
      <div className="sticky top-0 z-10 py-2">
        <h1 className="font-extrabold text-2xl text-gray-700">
          <span className="bg-rose-400 w-1 text-rose-400 select-none">1</span>
          <span className="ml-3">프로그램 만족도 페이지</span>
        </h1>
        <hr className="border" />
         <Filter
          filter={tempFilter}
          onFilterChange={handleTempFilterChange}
          onSearch={handleSearch}
        />


        <SurveyProgramList
          programs={programs}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onSelectProgram={handleSelectProgram}
        />

        {selectedProgram && (
          <div className="mt-6 ">
            <h2 className="font-bold text-lg mb-2">
              {selectedProgram.eduNm} 설문조사 결과
            </h2>
            <SurveyList surveyData={surveyData} />
          </div>
        )}

      </div>
      </div>
    )
}

export default ExtracurricularSurveyPage;