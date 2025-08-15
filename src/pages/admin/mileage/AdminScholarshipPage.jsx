import { useEffect, useMemo, useState } from "react";
import {
  fetchScholarships,
  updateScholarshipStatus,
  updateScholarshipRejectReason,
  processScholarshipPayment,
} from "../../../api/admin/mileage/AdminScholarshipApi";

// 상태 코드 상수
const STATE = {
  APPLY: "1",
  APPROVE: "2",
  REJECT: "3",
  PAYMENT: "4",
};

const STATE_OPTIONS = [
  { value: "", label: "전체" },
  { value: STATE.APPLY, label: "신청" },
  { value: STATE.APPROVE, label: "승인" },
  { value: STATE.REJECT, label: "반려" },
  { value: STATE.PAYMENT, label: "지급" },
];

export default function AdminScholarshipPage() {
  // 목록/검색
  const [scholarships, setScholarships] = useState([]);
  const [page, setPage] = useState(0); // 0-base
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    studentNo: "",
    studentName: "",
    subjectName: "",
    stateCode: "",
  });

  // 반려 모달
  const [rejectTargetId, setRejectTargetId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const pageCount = useMemo(() => Math.max(1, Math.ceil(total / size)), [total, size]);

  const load = async (opt = {}) => {
    setLoading(true);
    try {
      const res = await fetchScholarships({
        page,
        size,
        ...filters,
        ...opt,
      });
      setScholarships(res.items ?? []);
      setPage(res.page ?? 0);
      setSize(res.size ?? 10);
      setTotal(res.total ?? 0);
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "목록 조회 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    setPage(0);
    load({ page: 0 });
  };

  // ----- 액션 -----
  const handleReject = (id) => {
    setRejectTargetId(id);
    setRejectReason("");
  };

  const submitReject = async () => {
    if (!rejectTargetId) return;
    const reason = rejectReason.trim();
    if (!reason) return alert("반려 사유를 입력하세요.");
    try {
      await updateScholarshipRejectReason(rejectTargetId, reason);
      await updateScholarshipStatus(rejectTargetId, STATE.REJECT);
      setRejectTargetId(null);
      setRejectReason("");
      await load();
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "반려 처리 실패");
    }
  };

  const handleStatusUpdate = async (id, code) => {
    if (!window.confirm("상태를 변경하시겠습니까?")) return;
    try {
      await updateScholarshipStatus(id, code);
      await load();
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "상태 변경 실패");
    }
  };

  const handlePayment = async (id) => {
    if (!window.confirm("지급 처리하시겠습니까? (승인 상태에서만 가능)")) return;
    try {
      await processScholarshipPayment(id);
      await load();
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "지급 실패");
    }
  };

  // ----- 렌더 유틸 -----
  const stateBadge = (code, name) => {
    const base = "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium";
    if (code === STATE.APPLY) return <span className={`${base} bg-gray-100 text-gray-700`}>{name || "신청"}</span>;
    if (code === STATE.APPROVE) return <span className={`${base} bg-blue-100 text-blue-700`}>{name || "승인"}</span>;
    if (code === STATE.REJECT) return <span className={`${base} bg-rose-100 text-rose-700`}>{name || "반려"}</span>;
    if (code === STATE.PAYMENT) return <span className={`${base} bg-emerald-100 text-emerald-700`}>{name || "지급"}</span>;
    return <span className={`${base} bg-gray-100 text-gray-700`}>{name ?? code ?? "-"}</span>;
  };

  return (
    <div className="p-6 space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-bold">장학금 관리</h1>
        <p className="text-sm text-gray-500 mt-1">신청/승인/반려/지급을 한 화면에서 관리합니다.</p>
      </div>

      {/* 검색 */}
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200/70 p-5">
        <div className="grid md:grid-cols-5 gap-3">
          <input
            name="studentNo"
            placeholder="학번"
            value={filters.studentNo}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <input
            name="studentName"
            placeholder="이름"
            value={filters.studentName}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <input
            name="subjectName"
            placeholder="학과명"
            value={filters.subjectName}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          />
          <select
            name="stateCode"
            value={filters.stateCode}
            onChange={handleChange}
            className="border rounded px-3 py-2 bg-white"
          >
            {STATE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <button onClick={handleSearch} className="bg-blue-600 text-white rounded px-3 py-2">
            검색
          </button>
        </div>
      </div>

      {/* 목록 */}
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200/70">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <div className="font-semibold">신청 목록</div>
          <div className="text-sm text-gray-500">총 {total.toLocaleString()}건</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">학번/이름</th>
                <th className="p-2 border">학과</th>
                <th className="p-2 border">상태</th>
                <th className="p-2 border">지급금액</th>
                <th className="p-2 border">계좌</th>
                <th className="p-2 border">일시</th>
                <th className="p-2 border w-56">동작</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-gray-500">
                    로딩 중...
                  </td>
                </tr>
              ) : scholarships.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-gray-500">
                    데이터 없음
                  </td>
                </tr>
              ) : (
                scholarships.map((s) => (
                  <tr key={s.id} className="border-t">
                    <td className="p-2 border">{s.id}</td>
                    <td className="p-2 border">
                      <div className="font-medium">{s.studentNo}</div>
                      <div className="text-gray-600">{s.studentName}</div>
                    </td>
                    <td className="p-2 border">{s.schoolSubjectName}</td>
                    <td className="p-2 border">{stateBadge(s.stateCode, s.stateName)}</td>
                    <td className="p-2 border text-right">
                      {s.paymentAmount != null ? Number(s.paymentAmount).toLocaleString() : "-"}
                    </td>
                    <td className="p-2 border">
                      {s.bankName ? `${s.bankName} / ${s.accountNo}` : "-"}
                    </td>
                    <td className="p-2 border">
                      <div>신청 {fmt(s.applyDate)}</div>
                      {s.approveDate && <div>승인/지급 {fmt(s.approveDate)}</div>}
                      {s.rejectDate && <div>반려 {fmt(s.rejectDate)}</div>}
                    </td>
                    <td className="p-2 border">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="px-3 py-1.5 rounded border hover:bg-gray-50 disabled:opacity-40"
                          disabled={s.stateCode !== STATE.APPLY}
                          onClick={() => handleStatusUpdate(s.id, STATE.APPROVE)}
                        >
                          승인
                        </button>
                        <button
                          className="px-3 py-1.5 rounded border hover:bg-gray-50 disabled:opacity-40"
                          disabled={s.stateCode === STATE.PAYMENT}
                          onClick={() => handleReject(s.id)}
                        >
                          반려
                        </button>
                        <button
                          className="px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40"
                          disabled={s.stateCode !== STATE.APPROVE}
                          onClick={() => handlePayment(s.id)}
                        >
                          지급
                        </button>
                      </div>
                      {s.rejectReason && (
                        <div className="mt-2 text-xs text-rose-600 text-left">사유: {s.rejectReason}</div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="p-4 flex items-center justify-end gap-2">
          <button
            disabled={page <= 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="px-3 py-2 rounded border disabled:opacity-50"
          >
            이전
          </button>
          <span className="text-sm">
            페이지 {page + 1} / {pageCount}
          </span>
          <button
            disabled={(page + 1) * size >= total}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-2 rounded border disabled:opacity-50"
          >
            다음
          </button>
          <select
            value={size}
            onChange={(e) => {
              setSize(+e.target.value);
              setPage(0);
            }}
            className="ml-2 border rounded px-2 py-2"
          >
            {[10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}/페이지
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 반려 사유 모달 */}
      {rejectTargetId != null && (
        <Modal title="반려 사유 입력" onClose={() => setRejectTargetId(null)}>
          <div className="space-y-3">
            <textarea
              className="w-full border rounded px-3 py-2 h-28"
              placeholder="반려 사유를 입력하세요."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 rounded border" onClick={() => setRejectTargetId(null)}>
                취소
              </button>
              <button className="px-4 py-2 rounded bg-rose-600 text-white hover:bg-rose-700" onClick={submitReject}>
                반려 처리
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[1000] p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">
        <div className="px-5 py-3 border-b flex items-center justify-between">
          <div className="font-semibold">{title}</div>
          <button onClick={onClose} className="px-2 py-1 rounded hover:bg-gray-100">✕</button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function fmt(iso) {
  if (!iso) return "-";
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "-";
    return d.toLocaleString();
  } catch {
    return "-";
  }
}
