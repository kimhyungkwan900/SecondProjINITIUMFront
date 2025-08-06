import { useEffect, useState } from "react";
import { filterProgramList } from "../../../api/user/extracurricular/UserProgramApi";
import { useParams } from "react-router-dom"

import ProgramCard from "../../../features/user/programs/ProgramCard";
import UserTopBar from "../../../component/user/mainpage/UserTopBar";
import MainHeader from "../../../features/user/mainpage/MainHeader";
import FilterMenu from "../../../component/user/extracurricular/FIlterMenu";
import SearchBar from "../../../component/user/extracurricular/SearchBar";
import PageButton from "../../../component/admin/extracurricular/PagaButton";


const ExtracurricularProgramListPage = () => {
  const [competencyIds, setCompetencyIds] = useState(null); // 역량 필터
  const [programName, setProgramName] = useState("");        // 검색어
  const [programs, setPrograms] = useState([]);              // 목록
  const [loading, setLoading] = useState(false);             // 로딩 상태
  const [currentPage, setCurrentPage] = useState(1);         // 페이지 번호
  const [totalPages, setTotalPages] = useState(0);

  const { status } = useParams();

  const baseUrl = "http://localhost:8080";

  useEffect(() => {
   const fetchPrograms = async () => {
  setLoading(true);
  try {
    const response = await filterProgramList({
      keyword: programName,
      competencyIds: competencyIds || [],
      statusFilter: status,
      page: currentPage - 1,
      size: 12,
    });
    console.log("백엔드 응답:", response);
    setPrograms(response.content);      
    setTotalPages(response.totalPages);
  } catch (error) {
    console.error("불러오기 실패", error);
  } finally {
    setLoading(false);
  }
};

    fetchPrograms(); // useEffect 안에서 호출해야 동작함
  }, [competencyIds, programName, currentPage, status]); // 필터 변경 시 재요청
    const getDaysLeft = (endDateStr) => {
    if (!endDateStr) return null;

    // 현재 날짜를 YYYY-MM-DD 형식으로 맞춤
    const today = new Date();
    const todayStr = today.toISOString().substring(0, 10); // "2025-08-06"
    
    // 문자열을 날짜 객체로 변환
    const todayDate = new Date(todayStr);
    const endDate = new Date(endDateStr); // endDateStr = "2025-08-15"

    const diffTime = endDate.getTime() - todayDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
    };

  return (
<div className="min-h-screen bg-[#f6f9fc] flex flex-col items-center ">
      <div className="fixed top-0 left-0 w-full z-50">
        <UserTopBar />
        <MainHeader />
     </div>
    <div className="w-[56.5%] min-w-[56.5%] m-auto pt-[180px]">
        <div className="bg-white pb-4 rounded mt-[10px] shadow">
      <FilterMenu onSelectIds={setCompetencyIds} />
      <SearchBar onSearch={setProgramName} />
<div className="gap-10 m-auto px-4 flex flex-wrap w-full min-h-[400px] items-center justify-center">
  {loading ? (
    <p className="text-center text-gray-500 w-full">불러오는 중...</p>
  ) : programs.length === 0 ? (
    <p className="text-center text-gray-500 w-full font-bold">
      검색된 프로그램이 없습니다.
    </p>
  ) : (
    programs.map(program => {
      const applicationEnd = program.eduAplyEndDt.substring(0, 10);
      const daysLeft = getDaysLeft(applicationEnd);

      return (
        <div key={program.eduMngId}>
          <ProgramCard
            id={program.eduMngId}
            title={program.eduNm}
            daysLeft={daysLeft > 0 ? daysLeft : "마감"}
            applicationPeriod={`${program.eduAplyBgngDt.substring(0,10)} ~ ${program.eduAplyEndDt.substring(0,10)}`}
            operatingPeriod={`${program.eduBgngYmd.substring(0,10)} ~ ${program.eduEndYmd.substring(0,10)}`}
            capacity={program.eduPtcpNope}
            participants={program.accept}
            imageUrl={
              program.extracurricularImageDTO && program.extracurricularImageDTO.length > 0
              ? baseUrl + program.extracurricularImageDTO[0].imgFilePathNm
              : "/default-image.png"
            }
            category={program.ctgryNm}
            tag={program.eduType === "TEAM" ? "팀 프로그램" : "개인 프로그램"}
            mileage={program.eduMlg}
          />
        </div>
      );
    })
  )}
</div>
   </div>
    </div>
        <div className="mb-20 mt-10">
            <PageButton
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    </div>
  );
};

export default ExtracurricularProgramListPage;