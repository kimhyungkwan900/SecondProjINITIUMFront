import { useEffect, useState } from "react";
import {
  fetchScholarships,
  getScholarshipDetail,
  createScholarship,
  updateScholarshipStatus,
  updateScholarshipRejectReason,
  processScholarshipPayment,
  fetchMileageTotal
} from "../../../api/admin/mileage/AdminScholarshipApi";

export default function AdminScholarshipPage() {
  const [scholarships, setScholarships] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    studentNo: "",
    studentName: "",
    subjectName: "",
    stateCode: ""
  });

  const load = async () => {
    const res = await fetchScholarships({ page, size, ...filters });
    setScholarships(res.items);
    setPage(res.page);
    setSize(res.size);
    setTotal(res.total);
  };

  useEffect(() => {
    load();
  }, [page, size]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    setPage(0);
    load();
  };

  const handleReject = async (id) => {
    const reason = prompt("반려 사유를 입력하세요");
    if (reason) {
      await updateScholarshipRejectReason(id, reason);
      alert("반려 사유가 등록되었습니다.");
      load();
    }
  };

  const handleStatusUpdate = async (id, code) => {
    if (window.confirm(`상태를 ${code} 로 변경하시겠습니까?`)) {
      await updateScholarshipStatus(id, code);
      alert("상태가 변경되었습니다.");
      load();
    }
  };

  const handlePayment = async (id) => {
    if (window.confirm("지급 처리하시겠습니까?")) {
      await processScholarshipPayment(id);
      alert("지급 처리 완료");
      load();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">장학금 관리</h1>

      {/* 검색 */}
      <div className="grid grid-cols-5 gap-3 mb-4">
        <input name="studentNo" placeholder="학번" value={filters.studentNo} onChange={handleChange} className="border rounded px-3 py-2" />
        <input name="studentName" placeholder="이름" value={filters.studentName} onChange={handleChange} className="border rounded px-3 py-2" />
        <input name="subjectName" placeholder="학과명" value={filters.subjectName} onChange={handleChange} className="border rounded px-3 py-2" />
        <input name="stateCode" placeholder="상태코드(1~4)" value={filters.stateCode} onChange={handleChange} className="border rounded px-3 py-2" />
        <button onClick={handleSearch} className="bg-blue-600 text-white rounded px-3 py-2">검색</button>
      </div>

      {/* 테이블 */}
      <table className="w-full table-auto border mb-4 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">학번</th>
            <th className="p-2 border">이름</th>
            <th className="p-2 border">학과</th>
            <th className="p-2 border">신청일</th>
            <th className="p-2 border">누적점수</th>
            <th className="p-2 border">상태</th>
            <th className="p-2 border">동작</th>
          </tr>
        </thead>
        <tbody>
          {scholarships.map((s) => (
            <tr key={s.id}>
              <td className="p-2 border">{s.id}</td>
              <td className="p-2 border">{s.studentNo}</td>
              <td className="p-2 border">{s.studentName}</td>
              <td className="p-2 border">{s.schoolSubjectName}</td>
              <td className="p-2 border">{s.applyDate?.split("T")[0]}</td>
              <td className="p-2 border">{s.accumulatedMileage}</td>
              <td className="p-2 border">{s.stateName}</td>
              <td className="p-2 border space-x-2">
                <button onClick={() => handleStatusUpdate(s.id, "2")} className="text-blue-600">승인</button>
                <button onClick={() => handleReject(s.id)} className="text-red-600">반려</button>
                <button onClick={() => handlePayment(s.id)} className="text-green-600">지급</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="flex gap-2 justify-end items-center">
        <button disabled={page === 0} onClick={() => setPage((p) => Math.max(0, p - 1))} className="px-3 py-2 border rounded">이전</button>
        <span>{page + 1} / {Math.ceil(total / size)}</span>
        <button disabled={(page + 1) * size >= total} onClick={() => setPage((p) => p + 1)} className="px-3 py-2 border rounded">다음</button>
      </div>
    </div>
  );
}
