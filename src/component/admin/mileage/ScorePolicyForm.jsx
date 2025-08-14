// src/components/admin/mileage/ScorePolicyForm.jsx
import { useState } from "react";
import { createScorePolicy } from "../../../api/admin/mileage/AdminScorePolicyApi";

const ScorePolicyForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    eduMngId: "",
    mlgAltclId: "",
    atndcId: "",
    requiredAttendance: "",
    scoreRate: "",
    useYn: "Y",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createScorePolicy(form);
      alert("배점 정책이 등록되었습니다.");
      setForm({
        eduMngId: "",
        mlgAltclId: "",
        atndcId: "",
        requiredAttendance: "",
        scoreRate: "",
        useYn: "Y",
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("등록 실패:", err);
      alert("등록에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-bold mb-1">비교과 프로그램 ID</label>
        <input
          type="text"
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
          type="text"
          name="mlgAltclId"
          value={form.mlgAltclId}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full"
          required
        />
      </div>
      <div>
        <label className="block font-bold mb-1">출석 ID</label>
        <input
          type="text"
          name="atndcId"
          value={form.atndcId}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full"
          required
        />
      </div>
      <div>
        <label className="block font-bold mb-1">필수 출석 횟수</label>
        <input
          type="number"
          name="requiredAttendance"
          value={form.requiredAttendance}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full"
        />
      </div>
      <div>
        <label className="block font-bold mb-1">점수 비율 (%)</label>
        <input
          type="number"
          name="scoreRate"
          value={form.scoreRate}
          onChange={handleChange}
          step="0.1"
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
