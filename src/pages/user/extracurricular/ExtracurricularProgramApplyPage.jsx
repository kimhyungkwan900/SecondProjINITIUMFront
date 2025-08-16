import { useState, useEffect } from "react";
import { deletePrograms } from "../../../api/user/extracurricular/UserSurveyApi";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { applyList, cancleApply } from "../../../api/user/extracurricular/UserApplyApi";


import Button from "../../../component/user/extracurricular/Button";

import PageHeader from "../../../component/common/PageHeader";
import ApplyFilter from "../../../component/user/extracurricular/ApplyFilter";
import ApplyList from "../../../component/user/extracurricular/ApplyList";

const ExtracurricularProgramApplyPage = () => {
  const [filter, setFilter] = useState({
    status: "",
    keyword: "",
  });
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());

  const { user } = useAuth();

  const handleFilterChange = (field, value) => {
    setFilter((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = async () => {
    if (!user?.loginId) {
      console.log("user가 아직 준비되지 않음");
      return;
    }
    setLoading(true);
    try {
      const data = await applyList(
        user.loginId,
        filter.status || null,
        filter.keyword || null,
        0,
        10
      );
      console.log("API 응답 확인:", data);
      setPrograms(data.content || []);
      setSelectedIds(new Set());
    } catch (error) {
      console.error("프로그램 조회 실패", error);
      setPrograms([]);
    }
    setLoading(false);
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.size === 0) {
      alert("삭제할 프로그램을 선택하세요.");
      return;
    }
    if (!window.confirm("선택한 프로그램을 삭제하시겠습니까?")) {
      return;
    }
    try {
      await deletePrograms(Array.from(selectedIds));
      alert("삭제 완료");
      handleSearch(); // 리스트 재조회
    } catch (error) {
      console.error("삭제 실패", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleCancelApply = async (eduAplyId) => {
    if (!window.confirm("정말 신청을 취소하시겠습니까?")) return;

    try {
      await cancleApply(eduAplyId);
      alert("비교과 프로그램 신청이 취소되었습니다.");
      handleSearch(); // 취소 후 리스트 재조회
    } catch (err) {
      console.error(err);
      alert("신청 취소 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (user?.loginId) {  // user가 준비된 경우에만 호출
      handleSearch();
    }
  }, [user]);
  return (
    <div className="max-w-5xl mx-auto"> {/* Outer container */}
      <PageHeader
        title="신청 비교과 프로그램"
        breadcrumb={[
          { label: "마이페이지(학생)", link: "/mypage" },
          { label: "참여 비교과 프로그램 참여 현황", active: false },
          { label: "신청 비교과 프로그램", active: true }
        ]}
      />
      <div> {/* Inner container for sections */}
        <ApplyFilter
          filter={filter}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />
        <Button selectedIds={selectedIds} onDelete={handleDeleteSelected} />
        <ApplyList
          programs={programs}
          loading={loading}
          onDataChange={handleSearch}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          handleCancelApply={handleCancelApply}
        />
      </div>
    </div>
  );
};

export default ExtracurricularProgramApplyPage;