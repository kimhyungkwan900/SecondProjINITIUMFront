import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchAdminDiagnosticTestById,
  updateAdminDiagnosticTest,
} from "../../../api/user/diagnostic/diagnosisAdminApi.jsx";
import TextInput from "../../../component/common/TextInput.jsx";
import QuestionEditor from "../../../component/admin/diagnostic/QuestionEditor.jsx";
import ScoreLevelEditor from "../../../component/admin/diagnostic/ScoreLevelEditor.jsx";
import AdminSectionHeader from "../../../component/admin/AdminSectionHeader.jsx";

const DiagnosisAdminEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    questions: [],
    scoreLevels: [],
  });

  useEffect(() => {
    setLoading(true);
    fetchAdminDiagnosticTestById(id)
      .then((data) => setForm(data))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // 간단 유효성 검사 + payload 정리
  const validateAndBuildPayload = () => {
    if (!form.name?.trim()) {
      alert("검사명을 입력하세요.");
      return null;
    }
    // 문항/보기 검증
    for (let i = 0; i < (form.questions || []).length; i++) {
      const q = form.questions[i];
      if (!q.content?.trim()) {
        alert(`문항 #${i + 1} 내용이 비어 있습니다.`);
        return null;
      }
      if (!q.answerType) {
        alert(`문항 #${i + 1}의 답변 타입을 선택하세요.`);
        return null;
      }
      const answers = q.answers || [];
      if (answers.length < 1) {
        alert(`문항 #${i + 1}에는 최소 1개의 보기가 필요합니다.`);
        return null;
      }
      const setVals = new Set();
      for (let j = 0; j < answers.length; j++) {
        const a = answers[j];
        if (a.selectValue === undefined || a.selectValue === null || a.selectValue === "" || isNaN(Number(a.selectValue))) {
          alert(`문항 #${i + 1} 보기 #${j + 1}의 선택값을 입력하세요.`);
          return null;
        }
        const sv = Number(a.selectValue);
        if (setVals.has(sv)) {
          alert(`문항 #${i + 1}의 선택값(selectValue)이 중복되었습니다: ${a.selectValue}`);
          return null;
        }
        setVals.add(sv);
      }
    }
    // 점수구간 검증: min<=max
    for (let i = 0; i < (form.scoreLevels || []).length; i++) {
      const s = form.scoreLevels[i];
      const min = Number(s.minScore);
      const max = Number(s.maxScore);
      if (Number.isNaN(min) || Number.isNaN(max)) {
        alert(`점수 구간 #${i + 1}: 최소/최대 점수에 숫자를 입력하세요.`);
        return null;
      }
      if (min > max) {
        alert(`점수 구간 #${i + 1}: 최소점수가 최대점수보다 큽니다.`);
        return null;
      }
    }

    // order 재부여(1..n)
    const questions = (form.questions || []).map((q, idx) => ({
      content: q.content,
      order: idx + 1,
      answerType: q.answerType,
      answers: (q.answers || []).map((a) => ({
        content: a.content,
        score: Number(a.score ?? 0),
        selectValue: Number(a.selectValue ?? 0),
      })),
    }));

    const scoreLevels = (form.scoreLevels || [])
      .slice()
      .sort((a, b) => Number(a.minScore ?? 0) - Number(b.minScore ?? 0))
      .map((s) => ({
        minScore: Number(s.minScore ?? 0),
        maxScore: Number(s.maxScore ?? 0),
        levelName: s.levelName,
        description: s.description,
      }));

    return {
      name: form.name,
      description: form.description,
      questions,
      scoreLevels,
    };
  };

  const handleSubmit = async () => {
    if (saving) return;
    const payload = validateAndBuildPayload();
    if (!payload) return;

    try {
      setSaving(true);
      await updateAdminDiagnosticTest(id, payload);
      alert("검사가 수정되었습니다.");
      navigate("/admin/diagnosis/list");
    } catch (err) {
      console.error(err);
      alert("수정 실패");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#f6f9fc] flex items-center justify-center">
        <div className="text-center text-gray-400 py-8">로딩 중...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      <main className="max-w-7xl mx-auto px-6 pb-10">
        {/* 헤더 */}
        <div className="pt-6">
          <AdminSectionHeader title="진단평가 수정" />
        </div>

        {/* 카드 컨테이너 */}
        <section className="overflow-x-auto rounded-lg shadow-sm bg-white p-8 mt-6">
          {/* 제목 줄 */}
          <div className="flex items-center gap-2">
            <span className="text-[26px] text-blue-600">|</span>
            <h2 className="text-[26px] font-semibold">검사 기본 정보</h2>
          </div>
          <hr className="my-4 border-gray-200" />

          {/* 기본 정보 폼 */}
          <div className="grid grid-cols-12 gap-3 items-center">
            <label className="col-span-2 font-medium text-gray-700">검사명</label>
            <TextInput
              className="col-span-10 w-auto rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="검사명을 입력하세요"
            />
          </div>

          <div className="grid grid-cols-12 gap-3 items-start mt-3">
            <label className="col-span-2 font-medium text-gray-700">설명</label>
            <textarea
              className="col-span-10 w-auto rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[120px]"
              value={form.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="검사 설명을 입력하세요"
            />
          </div>

          {/* 문항 편집기 */}
          <div className="mt-8">
            <div className="flex items-center gap-2">
              <span className="text-[26px] text-blue-600">|</span>
              <h3 className="text-[26px] font-semibold">문항 관리</h3>
            </div>
            <hr className="my-4 border-gray-200" />
            <QuestionEditor
              questions={form.questions || []}
              onChange={(qs) => handleChange("questions", qs)}
            />
          </div>

          {/* 점수 구간 편집기 */}
          <div className="mt-8">
            <div className="flex items-center gap-2">
              <span className="text-[26px] text-blue-600">|</span>
              <h3 className="text-[26px] font-semibold">점수 구간 관리</h3>
            </div>
            <hr className="my-4 border-gray-200" />
            <ScoreLevelEditor
              scoreLevels={form.scoreLevels || []}
              onChange={(ls) => handleChange("scoreLevels", ls)}
            />
          </div>

          {/* 액션 버튼 영역: 가이드 버튼 스타일 */}
          <div className="flex items-center justify-end gap-2 pt-4">
            <button
              onClick={() => navigate("/admin/diagnosis/list")}
              className="w-auto rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 transition"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="bg-[#222E8D] text-white px-3 py-1 rounded text-sm font-semibold hover:bg-blue-800 transition disabled:opacity-60"
            >
              {saving ? "저장 중..." : "저장"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DiagnosisAdminEditPage;