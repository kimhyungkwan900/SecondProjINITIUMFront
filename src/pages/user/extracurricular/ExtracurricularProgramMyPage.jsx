import { useState, useEffect, useContext } from "react";
import { getMyProgramList } from "../../../api/user/extracurricular/UserProgramApi"; 
import PageHeader from "../../../component/common/PageHeader";
import Filter from "../../../component/user/extracurricular/Filter";
import ProgramList from "../../../component/user/extracurricular/ProgramList";
import { UserContext } from "../../../App";

const ExtracurricularProgramMyPage = () => {
  const [filter, setFilter] = useState({
    status: "",   // 수료 상태 필터
    keyword: "",  // 프로그램 이름 키워드
  });


  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFilterChange = (field, value) => {
    setFilter((prev) => ({
        ...prev,
        [field]: value,
    }));
};

const { user } = useContext(UserContext);
  const handleSearch = async () => {
    setLoading(true);
    try {
        const data = await getMyProgramList({
        stdfntNo: user?.loginId || "",  // logNo → stdfntNo로 변경
        eduFnshYn: filter.status || null,
        keyword: filter.keyword || null,
        });
      setPrograms(data.content || []);
    } catch (error) {
      console.error("프로그램 조회 실패", error);
      setPrograms([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, []);
  return (
    <div>
      <PageHeader
        title="참여 비교과 프로그램"
        breadcrumb={[
          { label: "마이페이지(학생)", link: "/mypage" },
          { label: "비교과 프로그램", active: true },
        ]}
      />
      <Filter
        filter={filter}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />
      {loading ? (
        <div>로딩중...</div>
      ) : (
        <ProgramList programs={programs} />
      )}
    </div>
  );
};

export default ExtracurricularProgramMyPage;