import { useState } from "react";
import { createMileagePerformance } from "../../../api/admin/mileage/AdminMileagePerfApi";

const MileagePerfForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    studentNo: "",
    mileageItemId: "",
    scorePolicyId: "",
    scholarshipApplyId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMileagePerformance(form);
      alert("실적이 등록되었습니다.");
      setForm({ studentNo: "", mileageItemId: "", scorePolicyId: "", scholarshipApplyId: "" });
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("등록 실패:", err);
      alert("등록에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="studentNo" value={form.studentNo} onChange={handleChange} placeholder="학번" required className="border px-3 py-2 rounded w-full" />
      <input type="text" name="mileageItemId" value={form.mileageItemId} onChange={handleChange} placeholder="마일리지 항목 ID" required className="border px-3 py-2 rounded w-full" />
      <input type="text" name="scorePolicyId" value={form.scorePolicyId} onChange={handleChange} placeholder="배점 정책 ID" required className="border px-3 py-2 rounded w-full" />
      <input type="text" name="scholarshipApplyId" value={form.scholarshipApplyId} onChange={handleChange} placeholder="장학금 신청 ID (옵션)" className="border px-3 py-2 rounded w-full" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">등록</button>
    </form>
  );
};

export default MileagePerfForm;
