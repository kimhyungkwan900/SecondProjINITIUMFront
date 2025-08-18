import { useEffect, useMemo, useState } from "react";
import {
  fetchMileageItems,
  createMileageItem,
  deleteMileageItems,
} from "../../../api/admin/mileage/AdminMileageItemApi";
import PageButton from '../../../component/admin/extracurricular/PageButton';

export default function AdminMileageItemPage() {
  // 목록/페이징 상태 (UI는 1-base 유지)
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);   // 1-base
  const [size, setSize] = useState(10);
  const [loading, setLoading] = useState(false);

  // 검색 필터
  const [itemCode, setItemCode] = useState("");
  const [eduNm, setEduNm] = useState("");

  // 체크박스
  const [checked, setChecked] = useState(new Set());

  // 등록 모달
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ itemCode: "", eduMngId: "" });

  // 총 페이지
  const totalPages = Math.max(1, Math.ceil(Number(total || 0) / Number(size || 10)));

  // 목록 로드 (서버 0-base 가정)
  const load = async (opt = {}) => {
    setLoading(true);
    try {
      const nextPage1 = opt.page ?? page;     // 1-base
      const nextSize  = opt.size ?? size;

      const raw = await fetchMileageItems({
        page: Math.max(0, nextPage1 - 1),     // ✅ 서버로는 0-base
        size: nextSize,
        itemCode: (opt.itemCode ?? itemCode) || undefined,
        eduNm:   (opt.eduNm   ?? eduNm)   || undefined,
      });

      // 응답 정규화(서버 필드명이 다를 때도 안전)
      const res = {
        items: raw.items ?? raw.content ?? raw.dtoList ?? [],
        total: raw.total ?? raw.totalElements ?? raw.totalCount ?? raw.count ?? 0,
        size:  raw.size  ?? raw.pageable?.pageSize ?? raw.pageRequestDto?.size ?? nextSize,
      };

      setRows(res.items);
      setTotal(res.total);
      setSize(res.size);
      setChecked(new Set());

      // 현재 페이지 > 총 페이지면 마지막 페이지로 보정
      const tp = Math.max(1, Math.ceil(Number(res.total || 0) / Number(res.size || nextSize)));
      if (nextPage1 > tp) setPage(tp);
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

  // 체크박스 유틸
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

  // 검색/초기화
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

  // 등록
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

  // 삭제
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
      <h1 className="text-2xl font-semibold">마일리지 항목 관리</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 grid md:grid-cols-5 gap-3 items-end border border-gray-200">
        <div>
          <label className="block text-sm text-[#354649] mb-1">항목 코드</label>
          <input
            className="w-full border border-[#A3C6C4] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6C7A89]"
            placeholder="예) MLG001"
            value={itemCode}
            onChange={(e) => setItemCode(e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-[#354649] mb-1">비교과 프로그램명</label>
          <input
            className="w-full border border-[#A3C6C4] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6C7A89]"
            placeholder="프로그램명으로 검색"
            value={eduNm}
            onChange={(e) => setEduNm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 md:col-span-2">
          <button
            onClick={onSearch}
            className="flex-1 bg-[#354649] text-white font-semibold px-3 py-2 rounded-md hover:bg-[#6C7A89] transition-colors"
          >
            조회
          </button>
          <button
            onClick={onReset}
            className="flex-1 border border-[#A3C6C4] text-[#354649] font-semibold px-3 py-2 rounded-md hover:bg-[#E0E7E9] transition-colors"
          >
            초기화
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowCreate(true)}
          className="bg-[#354649] text-white font-semibold px-3 py-2 rounded-md hover:bg-[#6C7A89] transition-colors"
        >
          항목 등록
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white font-semibold px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          선택 삭제
        </button>
        <div className="flex-1" />
        <div className="text-sm text-[#354649]">총 {total.toLocaleString()}건</div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow border border-gray-300 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-6 text-sm font-semibold text-center text-[#354649] bg-[#E0E7E9]">
          <div className="px-4 py-2 border-b border-gray-300">
            <input type="checkbox" checked={allChecked} onChange={toggleAll} />
          </div>
          <div className="px-4 py-2 border-b border-gray-300">ID</div>
          <div className="px-4 py-2 border-b border-gray-300">항목 코드</div>
          <div className="px-4 py-2 border-b border-gray-300">프로그램명</div>
          <div className="px-4 py-2 border-b border-gray-300">마일리지</div>
          <div className="px-4 py-2 border-b border-gray-300">생성일</div>
        </div>
        {/* Body */}
        <div>
          {loading ? (
            <div className="p-6 text-center text-gray-500">로딩 중...</div>
          ) : rows.length === 0 ? (
            <div className="p-6 text-center text-gray-500">데이터 없음</div>
          ) : (
            rows.map((r, idx) => (
              <div
                key={r.id}
                className={`grid grid-cols-6 text-sm text-center border-t border-gray-200 hover:bg-gray-50 ${
                  idx % 2 === 1 ? "bg-gray-50/50" : "bg-white"
                }`}
              >
                <div className="p-3">
                  <input
                    type="checkbox"
                    checked={checked.has(r.id)}
                    onChange={() => toggleOne(r.id)}
                  />
                </div>
                <div className="p-3">{r.id}</div>
                <div className="p-3">{r.itemCode}</div>
                <div className="p-3">{r.eduNm}</div>
                <div className="p-3">{r.eduMlg}</div>
                {/* 날짜: YYYY-MM-DD 줄바꿈 HH:mm:ss */}
                <div className="p-3 whitespace-pre-line">{fmt(r.createdAt)}</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination PageButton */}
      <div className="flex justify-center mt-4">
        <PageButton
          totalPages={totalPages}
          currentPage={page}        // 1-base
          onPageChange={(next) => setPage(next)}
          maxVisible={10}
        />
        {/* <select
          value={size}
          onChange={(e) => { setSize(+e.target.value); setPage(1); }}
          className="ml-2 border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C7A89]"
        >
          {[10, 20, 50].map((n) => (
            <option key={n} value={n}>{n}/페이지</option>
          ))}
        </select> */}
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
              <button className="px-4 py-2 rounded border" onClick={() => setShowCreate(false)}>
                취소
              </button>
              <button
                className="bg-[#222E8D] text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
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

// 날짜 포맷 (YYYY-MM-DD \n HH:mm:ss)
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

    return `${yyyy}-${mm}-${dd}\n${hh}:${mi}:${ss}`;
  } catch {
    return String(iso);
  }
}
