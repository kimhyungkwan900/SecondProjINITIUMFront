// components/AdminQuestionManager.jsx
import { useEffect, useState } from "react";
import {
  getAllQuestions,
  getQuestion,
  setOptionCount,
  updateQuestion,
} from "../../../../api/admin/coreCompetency/AdminQuestionApi";

const OPTION_COUNT_CHOICES = [1, 2, 3, 4, 5, 6, 7]; // 필요에 맞게 조정

const AdminQuestionManager = () => {
  const [list, setList] = useState([]);              // 문항 리스트
  const [selectedId, setSelectedId] = useState(null); // 선택된 문항 ID
  const [setDetail] = useState(null);         // 선택된 문항 상세(서버 원본)
  const [form, setForm] = useState(null);             // 화면 편집 상태(라벨/점수)

  const [loadingList, setLoadingList] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [saving, setSaving] = useState(false);
  const [patchingCount, setPatchingCount] = useState(false);
  const [error, setError] = useState("");

  // 초기: 전체 문항 로드
  useEffect(() => {
    const fetchList = async () => {
      setLoadingList(true);
      setError("");
      try {
        const { data } = await getAllQuestions();
        setList(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setError("문항 목록을 불러오지 못했다.");
      } finally {
        setLoadingList(false);
      }
    };
    fetchList();
  }, []);

  // 문항 선택 시 상세 로드
  const handleSelect = async (qid) => {
    setSelectedId(qid);
    setLoadingDetail(true);
    setError("");
    try {
      const { data } = await getQuestion(qid);
      setDetail(data);
      // 화면용 form 구성: 옵션 배열 편집 가능 상태로 복사
      setForm({
        questionNo: data.questionNo ?? 0,
        questionName: data.name ?? "",
        questionContent: data.description ?? "",
        displayOrder: data.displayOrder ?? 0,
        subCategoryId: data.subCompetencyCategory?.id ?? null,
        selectAllowCount: data.answerAllowCount ?? 0,
        options: (data.responseChoiceOptions || []).map((opt) => ({
          id: opt.id,                 // 서버 옵션 ID
          optionNo: opt.optionNo,     // 표시용
          label: opt.label ?? "",
          score: opt.score ?? 0,
        })),
      });
    } catch (e) {
      console.error(e);
      setError("문항 상세를 불러오지 못했다.");
      setDetail(null);
      setForm(null);
    } finally {
      setLoadingDetail(false);
    }
  };

  // 드롭다운 변경 → 해당 문항 1개 옵션 개수 재생성(PATCH)
  const handleChangeCount = async (newCount) => {
    if (!selectedId) return;
    setPatchingCount(true);
    setError("");
    try {
      const { data } = await setOptionCount(selectedId, Number(newCount));
      // 서버가 재생성한 최신 상태로 detail & form 갱신
      setDetail(data);
      setForm({
        questionNo: data.questionNo ?? 0,
        questionName: data.name ?? "",
        questionContent: data.description ?? "",
        displayOrder: data.displayOrder ?? 0,
        subCategoryId: data.subCompetencyCategory?.id ?? null,
        selectAllowCount: data.answerAllowCount ?? 0,
        options: (data.responseChoiceOptions || []).map((opt) => ({
          id: opt.id,
          optionNo: opt.optionNo,
          label: opt.label ?? "",
          score: opt.score ?? 0,
        })),
      });
    } catch (e) {
      console.error(e);
      setError("선택지 개수 변경에 실패했다.");
    } finally {
      setPatchingCount(false);
    }
  };

  // 라벨/점수 입력 핸들러
  const handleOptionChange = (idx, field, value) => {
    setForm((prev) => {
      if (!prev) return prev;
      const next = { ...prev, options: [...prev.options] };
      next.options[idx] = { ...next.options[idx], [field]: field === "score" ? Number(value) : value };
      return next;
    });
  };

  // 수정 저장(라벨/점수만; 개수 변경 불가)
  const handleSave = async () => {
    if (!selectedId || !form) return;
    setSaving(true);
    setError("");
    try {
      // 백엔드 DTO 규격에 맞춰 payload 구성
      const payload = {
        questionNo: form.questionNo,
        questionName: form.questionName,
        questionContent: form.questionContent,
        displayOrder: form.displayOrder,
        subCategoryId: form.subCategoryId,     // 선택적으로 변경 가능
        selectAllowCount: form.selectAllowCount, // 여기선 변경하지 않음
        options: form.options.map((o) => ({
          id: o.id,           // 서버에서 검증에 사용
          label: o.label,
          score: o.score,
        })),
      };
      const { data } = await updateQuestion(selectedId, payload);
      // 저장 성공 후 서버 반환으로 동기화
      await handleSelect(selectedId);
    } catch (e) {
      console.error(e);
      // 서버에서 “개수 변경 불가/ID 불일치” 등의 메시지를 보낼 수 있음
      setError(e?.response?.data?.message || "저장에 실패했다.");
    } finally {
      setSaving(false);
    }
  };

  // 테이블에서 옵션 추가/삭제는 비활성(요구사항)
  const disableAddRemove = true;

  const selectedRowClass = (qid) =>
    selectedId === qid ? "bg-blue-50" : "hover:bg-gray-50";

  return (
    <div className="max-w-[1280px] mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">핵심역량 문항 관리</h1>

      {error && (
        <div className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-12 gap-6">
        {/* 좌측: 문항 리스트 */}
        <div className="col-span-5">
          <div className="mb-2 text-sm text-gray-600">
            총 {list.length}건
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2 w-20">번호</th>
                  <th className="px-4 py-2">문항명</th>
                  <th className="px-4 py-2 w-28">옵션개수</th>
                </tr>
              </thead>
              <tbody>
                {loadingList ? (
                  <tr>
                    <td className="px-4 py-3" colSpan={3}>
                      목록 로딩 중…
                    </td>
                  </tr>
                ) : list.length === 0 ? (
                  <tr>
                    <td className="px-4 py-3" colSpan={3}>
                      문항이 없다.
                    </td>
                  </tr>
                ) : (
                  list.map((q) => (
                    <tr
                      key={q.id}
                      className={`${selectedRowClass(q.id)} cursor-pointer`}
                      onClick={() => handleSelect(q.id)}
                    >
                      <td className="px-4 py-2">{q.questionNo}</td>
                      <td className="px-4 py-2">{q.name}</td>
                      <td className="px-4 py-2">{q.answerAllowCount ?? 0}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 우측: 상세 패널 */}
        <div className="col-span-7">
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold">문항 상세</h2>
              {loadingDetail && <span className="text-gray-500 text-sm">로딩 중…</span>}
            </div>

            {!form ? (
              <div className="text-gray-500">좌측에서 문항을 선택하라.</div>
            ) : (
              <>
                {/* 기본 정보(읽기/필요 시 수정 가능) */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">문항번호</label>
                    <input
                      type="number"
                      className="w-full rounded border px-3 py-2"
                      value={form.questionNo}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, questionNo: Number(e.target.value) }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">정렬순서</label>
                    <input
                      type="number"
                      className="w-full rounded border px-3 py-2"
                      value={form.displayOrder}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, displayOrder: Number(e.target.value) }))
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">문항명</label>
                    <input
                      type="text"
                      className="w-full rounded border px-3 py-2"
                      value={form.questionName}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, questionName: e.target.value }))
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">설명</label>
                    <textarea
                      className="w-full rounded border px-3 py-2"
                      rows={3}
                      value={form.questionContent}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, questionContent: e.target.value }))
                      }
                    />
                  </div>
                </div>

                {/* 드롭다운: 답변문항구분(옵션 개수) */}
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">답변문항구분(옵션 개수)</label>
                  <div className="flex items-center gap-3">
                    <select
                      className="rounded border px-3 py-2"
                      value={form.selectAllowCount ?? 0}
                      onChange={(e) => handleChangeCount(e.target.value)}
                      disabled={patchingCount}
                    >
                      <option value={0} disabled>
                        개수 선택
                      </option>
                      {OPTION_COUNT_CHOICES.map((n) => (
                        <option key={n} value={n}>
                          {n}개
                        </option>
                      ))}
                    </select>
                    {patchingCount && <span className="text-sm text-gray-500">옵션 재생성 중…</span>}
                  </div>
                </div>

                {/* 옵션 테이블: 추가/삭제 불가, 라벨/점수만 수정 */}
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-left">
                      <tr>
                        <th className="px-4 py-2 w-24">옵션번호</th>
                        <th className="px-4 py-2">라벨</th>
                        <th className="px-4 py-2 w-32">점수</th>
                        <th className="px-4 py-2 w-28">추가/삭제</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(form.options || []).length === 0 ? (
                        <tr>
                          <td className="px-4 py-3" colSpan={4}>
                            옵션이 없습니다.
                          </td>
                        </tr>
                      ) : (
                        form.options.map((o, idx) => (
                          <tr key={o.id}>
                            <td className="px-4 py-2">{o.optionNo}</td>
                            <td className="px-4 py-2">
                              <input
                                type="text"
                                className="w-full rounded border px-3 py-2"
                                value={o.label}
                                onChange={(e) => handleOptionChange(idx, "label", e.target.value)}
                              />
                            </td>
                            <td className="px-4 py-2">
                              <input
                                type="number"
                                className="w-full rounded border px-3 py-2"
                                value={o.score}
                                min={0}
                                onChange={(e) => handleOptionChange(idx, "score", e.target.value)}
                              />
                            </td>
                            <td className="px-4 py-2 text-gray-400">
                              {/* 추가/삭제 불가 정책 안내 */}
                              불가
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* 저장 버튼 */}
                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={handleSave}
                    disabled={saving || !selectedId}
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {saving ? "저장 중…" : "저장"}
                  </button>
                  <span className="text-sm text-gray-500">
                    옵션 개수 변경은 드롭다운으로만 가능하고, 라벨/점수만 수정 가능하다.
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminQuestionManager;
