import { useEffect, useState } from "react";
import { fetchMileagePerformances, deleteMileagePerformances } from "../../../api/admin/mileage/AdminMileagePerfApi";
import MileagePerfTable from "../../../component/admin/mileage/MileagePerfTable";
import MileagePerfForm from "../../../component/admin/mileage/MileagePerfForm";

const AdminMileagePerfPage = () => {
  const [performances, setPerformances] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [search, setSearch] = useState({ studentNo: "", studentName: "", subjectName: "" });

  const load = async () => {
    const res = await fetchMileagePerformances({ ...search, page, size });
    setPerformances(res.items);
  };

  const handleDelete = async () => {
    if (!window.confirm("선택된 실적을 삭제하시겠습니까?")) return;
    await deleteMileagePerformances(selectedIds);
    alert("삭제 완료");
    setSelectedIds([]);
    load();
  };

  useEffect(() => { load(); }, [search, page]);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold">마일리지 실적 관리</h2>

      <div className="flex gap-2">
        <input type="text" placeholder="학번" value={search.studentNo} onChange={(e) => setSearch({ ...search, studentNo: e.target.value })} className="border px-3 py-2 rounded" />
        <input type="text" placeholder="이름" value={search.studentName} onChange={(e) => setSearch({ ...search, studentName: e.target.value })} className="border px-3 py-2 rounded" />
        <input type="text" placeholder="학과명" value={search.subjectName} onChange={(e) => setSearch({ ...search, subjectName: e.target.value })} className="border px-3 py-2 rounded" />
        <button onClick={() => load()} className="bg-blue-500 text-white px-4 py-2 rounded">검색</button>
      </div>

      <MileagePerfTable performances={performances} selectedIds={selectedIds} setSelectedIds={setSelectedIds} onDelete={handleDelete} />

      <div>
        <h3 className="text-lg font-semibold mb-2">실적 등록</h3>
        <MileagePerfForm onSuccess={load} />
      </div>
    </div>
  );
};

export default AdminMileagePerfPage;
