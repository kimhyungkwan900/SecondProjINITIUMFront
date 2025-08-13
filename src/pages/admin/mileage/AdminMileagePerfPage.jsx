import { useEffect, useMemo, useState } from "react";
import {
  fetchMileagePerfs,
  fetchMileagePerfById,
  createMileagePerf,
  deleteMileagePerfs,
} from "../../../api/admin/mileage/AdminMileagePerfApi";
import { fetchMileageItems } from "../../../api/admin/mileage/AdminMileageItemApi";

export default function AdminMileagePerfPage() {
  // table
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [loading, setLoading] = useState(false);

  // filters (백엔드 파라미터에 맞춤)
  const [studentNo, setStudentNo] = useState("");
  const [studentName, setStudentName] = useState("");
  const [subjectName, setSubjectName] = useState("");

  // selection
  const [checked, setChecked] = useState(new Set());

  // create modal
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    studentNo: "",
    mileageItemId: "",
    scorePolicyId: "",
    scholarshipApplyId: "",
  });
  const [policyOptions, setPolicyOptions] = useState([]); // 선택된 항목의 정책 목록

  // item search modal
  const [showItemSearch, setShowItemSearch] = useState(false);
  const [itemQuery, setItemQuery] = useState("");
  const [itemResults, setItemResults] = useState([]);

  const load = async (opt = {}) => {
    setLoading(true);
    try {
      const res = await fetchMileagePerfs({
        page,
        size,
        studentNo: val(studentNo),
        studentName: val(studentName),
        subjectName: val(subjectName),
        ...opt,
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
  

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, [page, size]);

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

  // search / reset
  const onSearch = () => {
    setPage(1);
    load({ page: 1 });
  };
  const onReset = () => {
    setStudentNo("");
    setStudentName("");
    setSubjectName("");
    setPage(1);
    load({
      page: 1,
      studentNo: undefined,
      studentName: undefined,
      subjectName: undefined,
    });
  };

  // create
  const openCreate = () => {
    setForm({
      studentNo: "",
      mileageItemId: "",
      scorePolicyId: "",
      scholarshipApplyId: "",
    });
    setPolicyOptions([]);
    setShowCreate(true);
  };

  // item search
  const openItemSearch = async () => {
    setItemQuery("");
    setItemResults([]);
    setShowItemSearch(true);
  };
  const queryItems = async () => {
    try {
      // 항목코드/프로그램명 둘 다 같은 쿼리로 부분검색
      const { items } = await fetchMileageItems({
        page: 1,
        size: 20,
        itemCode: itemQuery,
        eduNm: itemQuery,
      });
      setItemResults(items);
    } catch (e) {
      console.error(e);
      alert("항목 검색 실패");
    }
  };
  const pickItem = async (item) => {
    // 항목 선택 → 정책 목록 채우기
    setForm((f) => ({
      ...f,
      mileageItemId: item.id,
      scorePolicyId: "", // 초기화
    }));
    try {
      const detail = await fetchMileageItemById(item.id);
      const policies = detail?.scorePolicies ?? [];
      setPolicyOptions(policies);
      if (policies.length > 0) {
        setForm((f) => ({ ...f, scorePolicyId: policies[0].id }));
      }
    } catch {
      setPolicyOptions([]);
    }
    setShowItemSearch(false);
  };

  const submitCreate = async () => {
    if (!form.studentNo.trim()) return alert("학번을 입력하세요.");
    if (!form.mileageItemId) return alert("마일리지 항목을 선택하세요.");
    if (!form.scorePolicyId) return alert("배점 정책을 선택하세요.");
    try {
      await createMileagePerf({
        studentNo: form.studentNo.trim(),
        mileageItemId: Number(form.mileageItemId),
        scorePolicyId: Number(form.scorePolicyId),
        scholarshipApplyId: form.scholarshipApplyId
          ? Number(form.scholarshipApplyId)
          : undefined,
      });
      setShowCreate(false);
      setPage(1);
      load({ page: 1 });
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "등록 실패");
    }
  };

  const onBulkDelete = async () => {
    const ids = Array.from(checked);
    if (!ids.length) return alert("선택된 항목이 없습니다.");
    if (!confirm(`선택 ${ids.length}건을 삭제하시겠습니까?`)) return;
    try {
      await deleteMileagePerfs(ids);
      load();
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "삭제 실패");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">마일리지 실적 관리</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 grid md:grid-cols-6 gap-3 items-end">
        <div>
          <label className="block text-sm text-gray-600 mb-1">학번</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={studentNo}
            onChange={(e) => setStudentNo(e.target.value)}
            placeholder="예) 2025108001"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">이름</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="예) 홍길동"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-600 mb-1">학과</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            placeholder="예) 컴퓨터공학과"
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
          onClick={openCreate}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded px-3 py-2"
        >
          실적 등록
        </button>
        <button
          onClick={onBulkDelete}
          className="bg-rose-600 hover:bg-rose-700 text-white rounded px-3 py-2"
        >
          선택 삭제
        </button>
        <div className="flex-1" />
        <div className="text-sm text-gray-600">
          총 {total.toLocaleString()}건
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 w-10">
                <input type="checkbox" checked={allChecked} onChange={toggleAll} />
              </th>
              <th className="p-3 text-left">등록일</th>
              <th className="p-3 text-left">학번</th>
              <th className="p-3 text-left">이름</th>
              <th className="p-3 text-left">학과</th>
              <th className="p-3 text-left">항목코드 / 프로그램</th>
              <th className="p-3 text-left">배점 조건</th>
              <th className="p-3 text-right">적립</th>
              <th className="p-3 text-left">취소</th>
              <th className="p-3 text-left">사유</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={10} className="p-6 text-center text-gray-500">
                  로딩 중...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={10} className="p-6 text-center text-gray-500">
                  데이터 없음
                </td>
              </tr>
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
                  <td className="p-3">{fmt(r.createdAt)}</td>
                  <td className="p-3">{r.studentNo}</td>
                  <td className="p-3">{r.name}</td>
                  <td className="p-3">{r.schoolSubjectName}</td>
                  <td className="p-3">
                    {r.mileageItemCode} / {r.eduNm}
                  </td>
                  <td className="p-3">{r.scoreCriteria}</td>
                  <td className="p-3 text-right">{num(r.accMlg)}</td>
                  <td className="p-3">{r.canceledAt ? "Y" : "-"}</td>
                  <td className="p-3">{r.cancelReason || ""}</td>
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
          onChange={(e) => {
            setSize(+e.target.value);
            setPage(1);
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

      {/* Create Modal */}
      {showCreate && (
        <Modal title="실적 등록" onClose={() => setShowCreate(false)}>
          <div className="space-y-4">
            <Field label="학번">
              <input
                className="w-full border rounded px-3 py-2"
                value={form.studentNo}
                onChange={(e) =>
                  setForm((f) => ({ ...f, studentNo: e.target.value }))
                }
                placeholder="예) 2025108001"
              />
            </Field>

            <Field label="마일리지 항목">
              <div className="flex gap-2">
                <input
                  className="flex-1 border rounded px-3 py-2"
                  value={form.mileageItemId}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, mileageItemId: e.target.value }))
                  }
                  placeholder="항목 ID"
                />
                <button className="px-3 py-2 rounded border" onClick={openItemSearch}>
                  찾기
                </button>
              </div>
            </Field>

            <Field label="배점 정책">
              <select
                className="w-full border rounded px-3 py-2"
                value={form.scorePolicyId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, scorePolicyId: e.target.value }))
                }
              >
                <option value="">정책 선택</option>
                {policyOptions.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.scoreCriteria} (id: {p.id})
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                * “찾기”로 항목 선택 시 정책 목록이 자동으로 채워집니다.
              </p>
            </Field>

            <Field label="장학금 신청 ID (선택)">
              <input
                className="w-full border rounded px-3 py-2"
                value={form.scholarshipApplyId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, scholarshipApplyId: e.target.value }))
                }
                placeholder="선택 입력"
              />
            </Field>

            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 rounded border" onClick={() => setShowCreate(false)}>
                취소
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                onClick={submitCreate}
              >
                등록
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Item Search Modal */}
      {showItemSearch && (
        <Modal title="마일리지 항목 검색" onClose={() => setShowItemSearch(false)}>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                className="flex-1 border rounded px-3 py-2"
                value={itemQuery}
                onChange={(e) => setItemQuery(e.target.value)}
                placeholder="항목코드 또는 프로그램명 입력"
              />
              <button
                className="px-3 py-2 rounded bg-gray-800 text-white"
                onClick={queryItems}
              >
                검색
              </button>
            </div>

            <div className="border rounded overflow-hidden">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 text-left">ID</th>
                    <th className="p-2 text-left">항목코드</th>
                    <th className="p-2 text-left">프로그램명</th>
                    <th className="p-2 text-left">정책수</th>
                    <th className="p-2 text-center w-24">선택</th>
                  </tr>
                </thead>
                <tbody>
                  {(itemResults ?? []).length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-gray-500">
                        검색 결과 없음
                      </td>
                    </tr>
                  ) : (
                    itemResults.map((it) => (
                      <tr key={it.id} className="border-t">
                        <td className="p-2">{it.id}</td>
                        <td className="p-2">{it.itemCode}</td>
                        <td className="p-2">{it.eduNm}</td>
                        <td className="p-2">{it.scorePolicies?.length ?? 0}</td>
                        <td className="p-2 text-center">
                          <button
                            className="px-2 py-1 rounded border"
                            onClick={() => pickItem(it)}
                          >
                            선택
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      {children}
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[1000] p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl">
        <div className="px-5 py-3 border-b flex items-center justify-between">
          <div className="font-semibold">{title}</div>
          <button onClick={onClose} className="px-2 py-1 rounded hover:bg-gray-100">
            ✕
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function fmt(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}
function num(n) {
  if (n === null || n === undefined) return "";
  return Number(n).toLocaleString();
}
function val(v) {
  return v && String(v).trim() ? v : undefined;
}