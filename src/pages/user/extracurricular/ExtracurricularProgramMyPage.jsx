import { useState, useEffect } from "react";
import { getMyProgramList} from "../../../api/user/extracurricular/UserProgramApi";
import { deletePrograms } from "../../../api/user/extracurricular/UserSurveyApi";

import PageHeader from "../../../component/common/PageHeader";
import Filter from "../../../component/user/extracurricular/Filter";
import ProgramList from "../../../component/user/extracurricular/ProgramList";
import { useAuth } from "../../../hooks/useAuth.jsx";
import Button from "../../../component/user/extracurricular/Button";

const ExtracurricularProgramMyPage = () => {
  const [filter, setFilter] = useState({
    status: "",
    keyword: "",
  });
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  // 체크된 아이디 리스트 상태 추가
  const [selectedIds, setSelectedIds] = useState(new Set());
  const { user } = useAuth();
  const handleFilterChange = (field, value) => {
    setFilter((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await getMyProgramList({
        stdfntNo: user?.loginId || "",
        eduFnshYn: filter.status || null,
        keyword: filter.keyword || null,
      });
      setPrograms(data.content || []);
      setSelectedIds(new Set()); // 새로고침 시 선택 초기화
    } catch (error) {
      console.error("프로그램 조회 실패", error);
      setPrograms([]);
    }
    setLoading(false);
  };

  // 삭제 처리 함수 (API 호출)
  const handleDeleteSelected = async () => {
    if (selectedIds.size === 0) {
      alert("삭제할 프로그램을 선택하세요.");
      return;
    }
    if (!window.confirm("선택한 프로그램을 삭제하시겠습니까?")) {
      return;
    }
    console.log(selectedIds);
    try {
      // 예: deletePrograms 함수에 ID 배열 전달
      await deletePrograms(Array.from(selectedIds));
      alert("삭제 완료");
      handleSearch(); // 리스트 재조회
    } catch (error) {
      console.error("삭제 실패", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
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
      <Filter filter={filter} onFilterChange={handleFilterChange} onSearch={handleSearch} />
      {loading ? (
        <div>로딩중...</div>
      ) : (
        <div>
          <Button selectedIds={selectedIds} onDelete={handleDeleteSelected} />
          <ProgramList
            programs={programs}
            loading={loading}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            onDataChange={handleSearch}
          />
        </div>
      )}
    </div>
  );
};

export default ExtracurricularProgramMyPage;