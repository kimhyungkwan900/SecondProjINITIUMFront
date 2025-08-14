import { useEffect, useMemo, useState } from "react";
import {
  fetchMileageItems,
  createMileageItem,
  deleteMileageItems,
} from "../../../api/admin/mileage/AdminMileageItemApi";

export default function AdminMileageItemPage() {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [loading, setLoading] = useState(false);

  const [itemCode, setItemCode] = useState("");
  const [eduNm, setEduNm] = useState("");

  const [checked, setChecked] = useState(new Set());

  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ itemCode: "", eduMngId: "" });

  const load = async (opt = {}) => {
    setLoading(true);
    try {
      const res = await fetchMileageItems({
        page, size, itemCode: itemCode || undefined, eduNm: eduNm || undefined, ...opt,
      });
      setRows(res.items);
      setTotal(res.total);
      setPage(res.page);
      setSize(res.size);
      setChecked(new Set());
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "목록 조회 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [page, size]);

  const allChecked = useMemo(
    () => rows.length > 0 && rows.every((r) => checked.has(r.id)),
    [rows, checked]
  );
  const toggleAll = () => {
    if (allChecked) setChecked(new Set());
    else setChecked(new Set(rows.map((r) => r.id)));
  };
  const toggleOne = (id) => {
    setChecked((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const onSearch = () => {
    setPage(1);
    load({ page: 1 });
  };
  const onReset = () => {
    setItemCode("");
    setEduNm("");
    setPage(1);
    load({ page: 1, itemCode: undefined, eduNm: undefined });
  };

  const onCreate = async () => {
    if (!createForm.itemCode.trim()) return alert("항목 코드를 입력하세요.");
    if (!createForm.eduMngId) return alert("비교과 프로그램 ID를 입력하세요.");
    try {
      await createMileageItem({
        itemCode: createForm.itemCode.trim(),
        eduMngId: Number(createForm.eduMngId),
      });
      setShowCreate(false);
      setCreateForm({ itemCode: "", eduMngId: "" });
      setPage(1);
      load({ page: 1 });
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "등록 실패");
    }
  };

  const onDelete = async () => {
    const ids = Array.from(checked);
    if (!ids.length) return alert("선택된 항목이 없습니다.");
    if (!confirm(`선택 ${ids.length}건을 삭제하시겠습니까?`)) return;
    try {
      await deleteMileageItems(ids);
      load();
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "삭제 실패");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">마일리지 항목 관리</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 grid md:grid-cols-5 gap-3 items-end">
        <div>
          <label className="block text-sm text-gray-600 mb-1">항목 코드</label>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="예) MLG001"
            value={itemCode}
            onChange={(e) => setItemCode(e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-600 mb-1">비교과 프로그램명</label>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="프로그램명으로 검색"
            value={eduNm}
            onChange={(e) => setEduNm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 md:col-span-2">
          <button
            onClick={onSearch}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-2"
          >
            조회
          </button>
          <button
            onClick={onReset}
            className="flex-1 bg-gray-200 hover:bg-gray-300 rounded px-3 py-2"
          >
            초기화
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowCreate(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded px-3 py-2"
        >
          항목 등록
        </button>
        <button
          onClick={onDelete}
          className="bg-rose-600 hover:bg-rose-700 text-white rounded px-3 py-2"
        >
          선택 삭제
        </button>
        <div className="flex-1" />
        <div className="text-sm text-gray-600">총 {total.toLocaleString()}건</div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 w-10">
                <input type="checkbox" checked={allChecked} onChange={toggleAll} />
              </th>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">항목 코드</th>
              <th className="p-3 text-left">프로그램명</th>
              <th className="p-3 text-left">마일리지</th>
              <th className="p-3 text-left">생성일</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="p-6 text-center text-gray-500">로딩 중...</td></tr>
            ) : rows.length === 0 ? (
              <tr><td colSpan={6} className="p-6 text-center text-gray-500">데이터 없음</td></tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={checked.has(r.id)}
                      onChange={() => toggleOne(r.id)}
                    />
                  </td>
                  <td className="p-3">{r.id}</td>
                  <td className="p-3">{r.itemCode}</td>
                  <td className="p-3">{r.eduNm}</td>
                  <td className="p-3">{r.eduMlg}</td>
                  <td className="p-3">{fmt(r.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-2">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 py-2 rounded border disabled:opacity-50"
        >
          이전
        </button>
        <span className="text-sm">페이지 {page}</span>
        <button
          disabled={page * size >= total}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-2 rounded border disabled:opacity-50"
        >
          다음
        </button>
        <select
          value={size}
          onChange={(e) => { setSize(+e.target.value); setPage(1); }}
          className="ml-2 border rounded px-2 py-2"
        >
          {[10, 20, 50].map((n) => (
            <option key={n} value={n}>{n}/페이지</option>
          ))}
        </select>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <Modal onClose={() => setShowCreate(false)} title="마일리지 항목 등록">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">항목 코드</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={createForm.itemCode}
                onChange={(e) =>
                  setCreateForm((f) => ({ ...f, itemCode: e.target.value }))
                }
                placeholder="예) MLG001"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">비교과 프로그램 ID</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={createForm.eduMngId}
                onChange={(e) =>
                  setCreateForm((f) => ({ ...f, eduMngId: e.target.value }))
                }
                placeholder="예) 123 (프로그램 검색 UI는 추후 추가)"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded border"
                onClick={() => setShowCreate(false)}
              >
                취소
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                onClick={onCreate}
              >
                등록
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
  if (!iso) return "";
  try { return new Date(iso).toLocaleString(); } catch { return iso; }
}
