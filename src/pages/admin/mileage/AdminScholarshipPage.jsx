import { useEffect, useMemo, useState } from "react";
import {
  fetchScholarships,
  updateScholarshipStatus,
  updateScholarshipRejectReason,
  processScholarshipPayment,
} from "../../../api/admin/mileage/AdminScholarshipApi";
import AdminSectionHeader from "../../../component/admin/AdminSectionHeader";
import PageButton from "../../../component/admin/extracurricular/PageButton";

// 상태 코드
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
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0); // 0-base (PageButton은 1-base)
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    studentNo: "",
    studentName: "",
    subjectName: "",
    stateCode: "",
  });

  // 선택/일괄 처리
  const [selectedIds, setSelectedIds] = useState(new Set());

  const pageCount = useMemo(
    () => Math.max(1, Math.ceil(Number(total || 0) / Number(size || 10))),
    [total, size]
  );

  // ===== 데이터 로드 =====
  const load = async (opt = {}) => {
    setLoading(true);
    try {
      const res = await fetchScholarships({
        page,
        size,
        ...filters,
        ...opt,
      });
      setRows(res.items ?? []);
      setPage(res.page ?? 0);
      setSize(res.size ?? 10);
      setTotal(res.total ?? 0);
      setSelectedIds(new Set());
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

  // ===== 핸들러 =====
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    setPage(0);
    load({ page: 0 });
  };

  const toggleOne = (id) => {
    const nid = Number(id);
    setSelectedIds((prev) => {
      const n = new Set(prev);
      n.has(nid) ? n.delete(nid) : n.add(nid);
      return n;
    });
  };

  // 일괄 승인
  const bulkApprove = async () => {
    const ids = [...selectedIds];
    if (!ids.length) return;
    if (!confirm(`${ids.length}건을 승인하시겠습니까?`)) return;
    try {
      await Promise.all(ids.map((id) => updateScholarshipStatus(id, STATE.APPROVE)));
      await load();
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "승인 실패");
    }
  };

  // 반려 모달
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const openRejectModal = () => {
    if (!selectedIds.size) return;
    setRejectReason("");
    setRejectOpen(true);
  };

  const submitBulkReject = async () => {
    const ids = [...selectedIds];
    const reason = rejectReason.trim();
    if (!reason) return alert("반려 사유를 입력하세요.");
    try {
      await Promise.all(ids.map((id) => updateScholarshipRejectReason(id, reason)));
      await Promise.all(ids.map((id) => updateScholarshipStatus(id, STATE.REJECT)));
      setRejectOpen(false);
      setRejectReason("");
      await load();
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "반려 실패");
    }
  };

  // 일괄 지급
  const bulkPayment = async () => {
    const ids = [...selectedIds];
    if (!ids.length) return;
    if (!confirm(`${ids.length}건을 지급 처리하시겠습니까?`)) return;
    try {
      await Promise.all(ids.map((id) => processScholarshipPayment(id)));
      await load();
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "지급 실패");
    }
  };

  // ===== 렌더 유틸 =====
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
      <AdminSectionHeader title="장학금 관리" />

      {/* 검색 */}
      <div className="grid md:grid-cols-5 gap-3 p-4 border border-gray-200 rounded-md">
        <input
          name="studentNo"
          placeholder="학번"
          value={filters.studentNo}
          onChange={handleChange}
          className="border border-[#A3C6C4] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6C7A89]"
        />
        <input
          name="studentName"
          placeholder="이름"
          value={filters.studentName}
          onChange={handleChange}
          className="border border-[#A3C6C4] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6C7A89]"
        />
        <input
          name="subjectName"
          placeholder="학과명"
          value={filters.subjectName}
          onChange={handleChange}
          className="border border-[#A3C6C4] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6C7A89]"
        />
        <select
          name="stateCode"
          value={filters.stateCode}
          onChange={handleChange}
          className="border border-[#A3C6C4] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#354649] bg-white"
        >
          {STATE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="bg-[#354649] text-white font-semibold px-3 py-2 rounded-md hover:bg-[#6C7A89] transition-colors"
        >
          검색
        </button>
      </div>

      {/* 상단 툴바 (일괄 처리) */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">선택: {selectedIds.size}건</div>
        <div className="flex items-center gap-2">
          <button
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            disabled={selectedIds.size === 0}
            onClick={bulkApprove}
          >
            승인
          </button>
          <button
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            disabled={selectedIds.size === 0}
            onClick={openRejectModal}
          >
            반려
          </button>
          <button
            className="px-4 py-2 rounded bg-[#222E8D] text-white hover:bg-blue-800 disabled:opacity-50"
            disabled={selectedIds.size === 0}
            onClick={bulkPayment}
          >
            지급
          </button>
        </div>
      </div>

      {/* 목록 */}
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200/70">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <div className="font-semibold">신청 목록</div>
          <div className="text-sm text-[#6C7A89]">총 {total.toLocaleString()}건</div>
        </div>

        <div className="overflow-x-auto">
          {/* header — ✅ 7개 컬럼 / grid-cols-7 */}
          <div className="grid grid-cols-7 min-w-[1000px] text-sm font-semibold text-center text-[#354649] bg-[#E0E7E9]">
            <div className="px-4 py-2 border-b border-gray-300">ID</div>
            <div className="px-4 py-2 border-b border-gray-300">학번/이름</div>
            <div className="px-4 py-2 border-b border-gray-300">학과</div>
            <div className="px-4 py-2 border-b border-gray-300">상태</div>
            <div className="px-4 py-2 border-b border-gray-300">지급금액</div>
            <div className="px-4 py-2 border-b border-gray-300">계좌</div>
            <div className="px-4 py-2 border-b border-gray-300">일시</div>
          </div>

          {/* body — ✅ grid-cols-7 */}
          <div className="min-w-[1000px]">
            {loading ? (
              <div className="p-6 text-center text-gray-500">로딩 중...</div>
            ) : rows.length === 0 ? (
              <div className="p-6 text-center text-gray-500">데이터 없음</div>
            ) : (
              rows.map((s, idx) => {
                const rowId = Number(s.id); // ✅ 숫자화
                const isSelected = selectedIds.has(rowId);
                return (
                  <div
                    key={rowId}
                    className={[
                      "grid grid-cols-7 text-sm border-t border-gray-200",
                      "cursor-pointer select-none transition-colors",
                      idx % 2 === 1 ? "bg-gray-50/50" : "bg-white",
                      isSelected ? "bg-indigo-50 outline outline-2 outline-indigo-200" : "hover:bg-gray-50",
                    ].join(" ")}
                    onClick={() => toggleOne(rowId)}
                    role="row"
                    aria-selected={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter") {
                        e.preventDefault();
                        toggleOne(rowId);
                      }
                    }}
                  >
                    {/* ID */}
                    <div className="p-2 text-center">{rowId}</div>

                    {/* 학번/이름 */}
                    <div className="p-2 text-center">
                      <div className="font-medium">{s.studentNo}</div>
                      <div className="text-gray-600">{s.studentName}</div>
                    </div>

                    {/* 학과 */}
                    <div className="p-2 text-center">{s.schoolSubjectName}</div>

                    {/* 상태 */}
                    <div className="p-2 text-center">{stateBadge(s.stateCode, s.stateName)}</div>

                    {/* 지급금액 */}
                    <div className="p-2 text-right tabular-nums">
                      {s.paymentAmount != null ? Number(s.paymentAmount).toLocaleString() : "-"}
                    </div>

                    {/* 계좌 */}
                    <div className="p-2 text-center break-keep">
                      {s.bankName ? (
                        <>
                          <div>{s.bankName}</div>
                          <div className="text-gray-600">{s.accountNo}</div>
                        </>
                      ) : (
                        "-"
                      )}
                    </div>

                    {/* 일시 (라벨 위 / 날짜시간 아래) */}
                    <div className="p-2 text-left space-y-2">
                      {s.applyDate && (
                        <div>
                          <div className="font-semibold text-gray-700">신청</div>
                          <div className="text-sm text-gray-600 whitespace-pre-line">{fmt(s.applyDate)}</div>
                        </div>
                      )}
                      {s.approveDate && (
                        <div>
                          <div className="font-semibold text-gray-700">승인/지급</div>
                          <div className="text-sm text-gray-600 whitespace-pre-line">{fmt(s.approveDate)}</div>
                        </div>
                      )}
                      {s.rejectDate && (
                        <div>
                          <div className="font-semibold text-gray-700">반려</div>
                          <div className="text-sm text-gray-600 whitespace-pre-line">{fmt(s.rejectDate)}</div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* 페이지네이션 — PageButton 사용 */}
        <div className="p-4 flex items-center justify-end gap-3">
          <PageButton
            totalPages={pageCount}
            currentPage={page + 1}                         // 1-base
            onPageChange={(next1) => setPage(Math.max(0, next1 - 1))} // 0-base 변환
            maxVisible={10}
          />
          {/* 필요하면 사이즈 셀렉터 복원 */}
          {/* <select
            value={size}
            onChange={(e) => {
              setSize(+e.target.value);
              setPage(0);
            }}
            className="ml-2 border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C7A89]"
          >
            {[10, 20, 50].map((n) => (
              <option key={n} value={n}>{n}/페이지</option>
            ))}
          </select> */}
        </div>
      </div>

      {/* 반려 사유 모달 */}
      {rejectOpen && (
        <Modal title="반려 사유 입력" onClose={() => setRejectOpen(false)}>
          <div className="space-y-3">
            <textarea
              className="w-full border rounded px-3 py-2 h-28"
              placeholder="반려 사유를 입력하세요."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded border border-gray-300 text-[#354649] hover:bg-gray-100"
                onClick={() => setRejectOpen(false)}
              >
                취소
              </button>
              <button
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                onClick={submitBulkReject}
              >
                반려 처리
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* 공용 모달 */
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

/* 날짜 포맷 (YYYY-MM-DD \n HH:mm:ss) */
function fmt(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return String(iso);

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");

    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}\n${hh}:${mi}:${ss}`; // 줄바꿈 포함 → whitespace-pre-line로 표시
  } catch {
    return String(iso);
  }
}
