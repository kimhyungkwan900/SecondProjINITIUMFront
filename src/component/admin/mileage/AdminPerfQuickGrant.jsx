import { useEffect, useState } from "react";
import {
  createMileagePerf,
  fetchMileagePerfList,
  deleteMileagePerfs,
} from "../../../api/admin/mileage/AdminMileagePerfApi";
import { fetchMileageItems } from "../../../api/admin/mileage/AdminMileageItemApi";
import MileagePerfTable from "./MileagePerfTable";

export default function AdminPerfQuickGrant() {
  // 드롭다운 항목
  const [items, setItems] = useState([]);

  // 입력값
  const [studentNo, setStudentNo] = useState("");
  const [mileageItemId, setMileageItemId] = useState("");
  const [accMlg, setAccMlg] = useState("");

  // UI 상태
  const [saving, setSaving] = useState(false);

  // 목록 상태
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [loadingList, setLoadingList] = useState(false);

  // 간단 필터(선택): 학번/이름/학과
  const [filter, setFilter] = useState({ studentNo: "", studentName: "", subjectName: "" });

  // 선택 삭제
  const [selectedIds, setSelectedIds] = useState([]);

  // 드롭다운 로드
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchMileageItems({ page: 1, size: 200 });
        setItems(res.items ?? []);
      } catch (e) {
        console.error(e);
        alert(e?.response?.data?.message || "항목 목록을 불러오지 못했습니다.");
      }
    })();
  }, []);

  // 목록 로드
  const load = async (opt = {}) => {
    setLoadingList(true);
    try {
      const res = await fetchMileagePerfList({
        page,
        size,
        studentNo: filter.studentNo || undefined,
        studentName: filter.studentName || undefined,
        subjectName: filter.subjectName || undefined,
        ...opt,
      });
      setRows(res.items);
      setTotal(res.total);
      setPage(res.page);
      setSize(res.size);
      setSelectedIds([]);
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "실적 목록 조회 실패");
    } finally {
      setLoadingList(false);
    }
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [page, size]);

  const onSubmit = async () => {
    const sNo = studentNo.trim();
    if (!sNo) return alert("학번을 입력하세요.");
    if (!mileageItemId) return alert("마일리지 항목을 선택하세요.");
    if (accMlg !== "" && Number(accMlg) <= 0) return alert("적립 점수는 1 이상이어야 합니다.");

    setSaving(true);
    try {
      await createMileagePerf({
        studentNo: sNo,
        mileageItemId: Number(mileageItemId),
        accMlg: accMlg === "" ? undefined : Number(accMlg),
      });
      alert("실적이 등록되었습니다.");
      // 폼 초기화 + 목록 새로고침
      setStudentNo("");
      setMileageItemId("");
      setAccMlg("");
      await load({ page: 1 });
    } catch (e) {
      const msg = e?.response?.data?.message || e?.response?.data || e.message;
      alert(msg || "등록 실패");
    } finally {
      setSaving(false);
    }
  };

  const onResetForm = () => {
    setStudentNo("");
    setMileageItemId("");
    setAccMlg("");
  };

  const onDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`선택 ${selectedIds.length}건을 삭제하시겠습니까?`)) return;
    try {
      await deleteMileagePerfs(selectedIds);
      await load();
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "삭제 실패");
    }
  };

  const selectedItem = items.find(it => String(it.id) === String(mileageItemId));
  const defaultMlg = selectedItem?.eduMlg ?? null;

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">실적 간편 등록</h1>
          <p className="text-sm text-gray-500 mt-1">
            수료된 비교과 항목을 선택해 마일리지를 빠르게 적립하세요. 점수를 비워두면 항목의 기본점수로 적립됩니다.
          </p>
        </div>
      </div>

      {/* 입력 카드 */}
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200/70">
        <div className="px-5 py-4 border-b">
          <div className="font-semibold">입력</div>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            {/* 학번 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">학번</label>
              <input
                className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                value={studentNo}
                onChange={(e) => setStudentNo(e.target.value)}
                placeholder="예) 20250001"
              />
              <p className="mt-1 text-xs text-gray-500">반드시 실제 존재하는 학번인지 확인하세요.</p>
            </div>

            {/* 항목 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">마일리지 항목</label>
              <select
                className="mt-1 w-full border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                value={mileageItemId}
                onChange={(e) => setMileageItemId(e.target.value)}
              >
                <option value="">선택하세요</option>
                {items.map((it) => (
                  <option key={it.id} value={it.id}>
                    {it.itemCode} · {it.eduNm} ({it.eduMlg}점)
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">
                항목의 기본점수:{" "}
                <span className="inline-flex items-center px-2 py-0.5 rounded-full border text-xs">
                  {defaultMlg ?? "-"}점
                </span>
              </p>
            </div>

            {/* 점수 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">적립 점수 (선택)</label>
              <input
                type="number"
                min="1"
                className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                value={accMlg}
                onChange={(e) => setAccMlg(e.target.value)}
                placeholder="비우면 기본점수로 적립"
              />
              <p className="mt-1 text-xs text-gray-500">
                직접 입력하면 위 기본점수 대신 입력 점수로 적립됩니다.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onResetForm}
              className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-50"
            >
              초기화
            </button>
            <button
              disabled={saving}
              onClick={onSubmit}
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-60"
            >
              {saving ? "등록 중..." : "적립 등록"}
            </button>
          </div>
        </div>
      </div>

      {/* 필터 + 목록 카드 */}
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200/70">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <div className="font-semibold">최근 실적</div>
          <div className="text-sm text-gray-500">총 {total.toLocaleString()}건</div>
        </div>

        {/* 간단 필터 */}
        <div className="px-5 pt-4">
          <div className="grid md:grid-cols-5 gap-3">
            <div className="md:col-span-1">
              <label className="block text-xs text-gray-600 mb-1">학번</label>
              <input
                className="w-full border rounded-md px-3 py-2"
                value={filter.studentNo}
                onChange={(e) => setFilter((f) => ({ ...f, studentNo: e.target.value }))}
                placeholder="학번"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-gray-600 mb-1">이름</label>
              <input
                className="w-full border rounded-md px-3 py-2"
                value={filter.studentName}
                onChange={(e) => setFilter((f) => ({ ...f, studentName: e.target.value }))}
                placeholder="이름"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-gray-600 mb-1">학과</label>
              <input
                className="w-full border rounded-md px-3 py-2"
                value={filter.subjectName}
                onChange={(e) => setFilter((f) => ({ ...f, subjectName: e.target.value }))}
                placeholder="학과명"
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 py-3">
            <button
              className="px-3 py-2 rounded-md border hover:bg-gray-50"
              onClick={() => { setFilter({ studentNo: "", studentName: "", subjectName: "" }); setPage(1); load({ page: 1, studentNo: undefined, studentName: undefined, subjectName: undefined }); }}
            >
              초기화
            </button>
            <button
              className="px-3 py-2 rounded-md bg-gray-900 text-white hover:bg-black"
              onClick={() => { setPage(1); load({ page: 1 }); }}
            >
              조회
            </button>
          </div>
        </div>

        {/* 목록 */}
        <div className="p-5">
          <MileagePerfTable
            performances={rows}
            loading={loadingList}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            onDelete={onDelete}
          />

          {/* 페이지네이션 */}
          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-2 rounded-md border disabled:opacity-50"
            >
              이전
            </button>
            <span className="text-sm">페이지 {page}</span>
            <button
              disabled={page * size >= total}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-2 rounded-md border disabled:opacity-50"
            >
              다음
            </button>
            <select
              value={size}
              onChange={(e) => { setSize(+e.target.value); setPage(1); }}
              className="ml-2 border rounded-md px-2 py-2"
            >
              {[10, 20, 50].map((n) => (
                <option key={n} value={n}>{n}/페이지</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
