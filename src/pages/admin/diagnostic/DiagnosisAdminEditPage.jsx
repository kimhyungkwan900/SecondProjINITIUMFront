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

  const validateAndBuildPayload = () => {
    if (!form.name?.trim()) {
      alert("검사명을 입력하세요.");
      return null;
    }
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
        if (
          a.selectValue === undefined ||
          a.selectValue === null ||
          a.selectValue === "" ||
          isNaN(Number(a.selectValue))
        ) {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="adm-loading">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-4">
        <AdminSectionHeader title="진단평가 수정" />

        {/* 카드 컨테이너 */}
        <section className="adm-card p-6">
          {/* 제목 */}
          <h2 className="text-base font-semibold text-gray-700">검사 기본 정보</h2>
          <div className="my-3 border-t border-gray-200" />

          {/* 기본 정보 폼 */}
          <div className="grid grid-cols-12 gap-4">
            <label className="col-span-12 md:col-span-2 adm-label self-center">검사명</label>
            <TextInput
              className="col-span-12 md:col-span-10 adm-control w-full !md:w-full"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="검사명을 입력하세요"
              type="text"
            />
          </div>

          <div className="grid grid-cols-12 gap-4 items-start mt-4">
            <label className="col-span-12 md:col-span-2 adm-label self-start">설명</label>
            <textarea
              className="col-span-12 md:col-span-10 adm-control w-full !md:w-full min-h-[140px]"
              value={form.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="검사 설명을 입력하세요"
              aria-label="검사 설명"
            />
          </div>

          {/* 문항 편집기 */}
          <div className="mt-8">
            <h3 className="text-base font-semibold text-gray-700">문항 관리</h3>
            <div className="my-3 border-t border-gray-200" />
            <QuestionEditor
              questions={form.questions || []}
              onChange={(qs) => handleChange("questions", qs)}
            />
          </div>

          {/* 점수 구간 편집기 */}
          <div className="mt-8">
            <h3 className="text-base font-semibold text-gray-700">점수 구간 관리</h3>
            <div className="my-3 border-t border-gray-200" />
            <ScoreLevelEditor
              scoreLevels={form.scoreLevels || []}
              onChange={(ls) => handleChange("scoreLevels", ls)}
            />
          </div>

          {/* 액션 버튼 영역 */}
          <div className="flex items-center justify-end gap-2 pt-6">
            <button
              onClick={() => navigate("/admin/diagnosis/list")}
              className="adm-btn adm-btn--secondary"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="adm-btn adm-btn--primary"
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
