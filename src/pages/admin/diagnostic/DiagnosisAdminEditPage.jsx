import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchAdminDiagnosticTestById,
  updateAdminDiagnosticTest,
} from "../../../api/user/diagnostic/diagnosisAdminApi.jsx";
import TextInput from "../../../component/common/TextInput.jsx";
import QuestionEditor from "../../../component/admin/diagnostic/QuestionEditor.jsx";
import ScoreLevelEditor from "../../../component/admin/diagnostic/ScoreLevelEditor.jsx";

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
    // 문항/보기 검증: 보기 1개 이상, selectValue 중복 금지
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
      answers: (q.answers || []).map(a => ({
        content: a.content,
        score: Number(a.score ?? 0),
        selectValue: Number(a.selectValue ?? 0),
      })),
    }));

    // 정렬 (선택)
    const scoreLevels = (form.scoreLevels || []).slice().sort((a, b) => Number(a.minScore ?? 0) - Number(b.minScore ?? 0))
      .map(s => ({
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

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="p-6 bg-white rounded shadow space-y-6">
      <h1 className="text-lg font-bold">진단검사 수정</h1>

      <div className="grid grid-cols-12 gap-3 items-center">
        <label className="col-span-2 font-medium">검사명</label>
        <TextInput
          className="col-span-10"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-12 gap-3 items-start">
        <label className="col-span-2 font-medium">설명</label>
        <textarea
          className="col-span-10 border rounded p-2 min-h-[100px]"
          value={form.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <QuestionEditor
        questions={form.questions || []}
        onChange={(qs) => handleChange("questions", qs)}
      />

      <ScoreLevelEditor
        scoreLevels={form.scoreLevels || []}
        onChange={(ls) => handleChange("scoreLevels", ls)}
      />

      <div className="flex gap-2 pt-2">
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {saving ? "저장 중..." : "저장"}
        </button>
        <button
          onClick={() => navigate("/admin/diagnosis/list")}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default DiagnosisAdminEditPage;
