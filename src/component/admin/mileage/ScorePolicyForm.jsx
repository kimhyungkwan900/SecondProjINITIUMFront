// src/components/admin/mileage/ScorePolicyForm.jsx
import { useState } from "react";
import { createScorePolicy } from "../../../api/admin/mileage/AdminScorePolicyApi";

const ScorePolicyForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    eduMngId: "",        // Long
    mileageItemId: "",   // Long
    scoreCriteria: "",   // 예: "출석 10회 이상"
    requiredAttendance: "", // Integer
    scorePercent: "",    // 화면 입력용(%) → 전송 시 scoreRate = percent/100
    useYn: "Y",          // "Y" | "N"
  });

  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "number") {
      setForm((prev) => ({ ...prev, [name]: value === "" ? "" : Number(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!form.eduMngId || !form.mileageItemId) {
      setSubmitError("비교과 프로그램 ID와 마일리지 항목 ID는 필수입니다.");
      return;
    }

    const payload = {
      eduMngId: Number(form.eduMngId),
      mileageItemId: Number(form.mileageItemId),
      scoreCriteria: form.scoreCriteria?.trim() || null,
      requiredAttendance:
        form.requiredAttendance === "" ? null : Number(form.requiredAttendance),
      scoreRate:
        form.scorePercent === "" ? null : Number(form.scorePercent) / 100, // 50 → 0.5
      useYn: form.useYn,
    };

    try {
      await createScorePolicy(payload);
      alert("배점 정책이 등록되었습니다.");
      setForm({
        eduMngId: "",
        mileageItemId: "",
        scoreCriteria: "",
        requiredAttendance: "",
        scorePercent: "",
        useYn: "Y",
      });
      onSuccess?.();
    } catch (err) {
      console.error("등록 실패:", err);
      setSubmitError(err?.message || "등록에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-bold mb-1">비교과 프로그램 ID</label>
        <input
          type="number"
          name="eduMngId"
          value={form.eduMngId}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full"
          required
        />
      </div>

      <div>
        <label className="block font-bold mb-1">마일리지 항목 ID</label>
        <input
          type="number"
          name="mileageItemId"
          value={form.mileageItemId}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full"
          required
        />
      </div>

      <div>
        <label className="block font-bold mb-1">출석 기준(설명)</label>
        <input
          type="text"
          name="scoreCriteria"
          value={form.scoreCriteria}
          onChange={handleChange}
          placeholder='예) "출석 10회 이상"'
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block font-bold mb-1">필수 출석 횟수</label>
        <input
          type="number"
          name="requiredAttendance"
          value={form.requiredAttendance}
          onChange={handleChange}
          min={0}
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block font-bold mb-1">점수 비율 (%)</label>
        <input
          type="number"
          name="scorePercent"
          value={form.scorePercent}
          onChange={handleChange}
          step="0.1"
          min="0"
          max="100"
          placeholder="예) 50 → 서버엔 0.5로 전송"
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block font-bold mb-1">사용 여부</label>
        <select
          name="useYn"
          value={form.useYn}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="Y">사용</option>
          <option value="N">미사용</option>
        </select>
      </div>

      {submitError && (
        <p className="text-sm text-red-600">등록 실패: {submitError}</p>
      )}

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        등록
      </button>
    </form>
  );
};

export default ScorePolicyForm;
