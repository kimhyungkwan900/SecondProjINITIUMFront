// src/pages/admin/mileage/ScorePolicyPage.jsx
import { useEffect, useState } from "react";
import {
  fetchScorePolicies,
  deleteScorePolicies,
  createScorePolicy,
  getScorePolicyDetail,
} from "../../../api/admin/mileage/AdminScorePolicyApi";

import ScorePolicyTable from "../../../component/admin/mileage/ScorePolicyTable";
import ScorePolicySearchBar from "../../../component/admin/mileage/ScorePolicySearchBar";
import ScorePolicyForm from "../../../component/admin/mileage/ScorePolicyForm";

const ScorePolicyPage = () => {
  const [policies, setPolicies] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [size] = useState(10); // 고정 사이즈
  const [selectedIds, setSelectedIds] = useState([]);

  const loadPolicies = async () => {
    try {
      const res = await fetchScorePolicies({ eduNm: searchKeyword, page, size });
      setPolicies(res.data.content || []);
    } catch (err) {
      console.error("조회 실패:", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteScorePolicies(selectedIds);
      alert("삭제 완료");
      loadPolicies();
    } catch (err) {
      alert("삭제 실패");
    }
  };

  useEffect(() => {
    loadPolicies();
  }, [searchKeyword, page]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">배점 정책 관리</h2>

      <ScorePolicySearchBar
        value={searchKeyword}
        onChange={setSearchKeyword}
        onSearch={loadPolicies}
      />

      <ScorePolicyTable
        policies={policies}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        onDelete={handleDelete}
      />

      <div className="mt-10">
        <ScorePolicyForm onSuccess={loadPolicies} />
      </div>
    </div>
  );
};

export default ScorePolicyPage;
