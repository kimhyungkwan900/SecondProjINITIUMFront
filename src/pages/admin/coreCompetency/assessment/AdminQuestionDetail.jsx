import React, { useEffect, useMemo, useState } from "react";
import AdminQuestionOption from "./AdminQuestionOption";

const AdminQuestionDetail = ({ question, subCategories, onSave, onDelete, existingQuestions = [] }) => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const initialOptions =
      question?.options && question.options.length > 0
        ? question.options
        : Array.from({ length: question?.optionCount ?? 5 }, (_, i) => ({
            optionNo: i + 1,
            label: "",
            score: 0,
            id: null,
          }));

    setForm({
      ...question,
      options: initialOptions,
      optionCount: question?.optionCount ?? initialOptions.length,
      selectAllowCount: question?.selectAllowCount ?? 1,
    });
    setErrors({});
  }, [question]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isNumeric = ["displayOrder", "selectAllowCount"].includes(name);
    setForm((prev) => ({ ...prev, [name]: isNumeric ? Number(value) : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubCategoryChange = (e) => {
    const id = e.target.value ? Number(e.target.value) : null;
    setForm((prev) => ({ ...prev, subCategoryId: id }));
    if (errors.subCategoryId) setErrors((prev) => ({ ...prev, subCategoryId: undefined }));
  };

  const handleOptionChange = (index, field, value) => {
    const updated = [...(form.options || [])];
    updated[index] = {
      ...updated[index],
      [field]: field === "score" ? Number(value) : value,
    };
    setForm((prev) => ({ ...prev, options: updated }));
  };

  const handleOptionCountSelect = (e) => {
    const newCount = parseInt(e.target.value, 10);
    const current = form.options || [];
    const resized = Array.from({ length: newCount }, (_, i) => {
      return current[i] || { optionNo: i + 1, label: "", score: 0, id: null };
    });
    setForm((prev) => ({
      ...prev,
      optionCount: newCount,
      options: resized,
    }));
  };

  // ---------- 문항명 중복 체크 ----------
  const normalize = (v) => String(v ?? "").trim().toLowerCase();
  const currentId = form?.id ?? null;

  const isDuplicateQuestionName = useMemo(() => {
    const name = normalize(form?.questionName);
    if (!name) return false;
    return (existingQuestions || []).some((q) => {
      const qId = q.id ?? q.questionId;
      const qName = q.questionName ?? q.name ?? q.title; // 다양한 키 대응
      if (currentId && qId === currentId) return false;  // 자기 자신 제외
      return normalize(qName) === name;
    });
  }, [form?.questionName, existingQuestions, currentId]);

  // 상위(메타) 필수값 + 중복 검증
  const validate = () => {
    const errs = {};
    if (!form.subCategoryId) errs.subCategoryId = "하위역량을 선택해주세요.";
    if (
      form.displayOrder === undefined ||
      form.displayOrder === null ||
      String(form.displayOrder).trim() === ""
    ) {
      errs.displayOrder = "표시 순서를 입력해주세요.";
    }
    if (!form.questionName || !String(form.questionName).trim()) {
      errs.questionName = "문항명을 입력해주세요.";
    } else if (isDuplicateQuestionName) {
      errs.questionName = "이미 존재하는 문항명입니다.";
    }

    if (!Array.isArray(form.options) || form.options.length !== Number(form.optionCount ?? 0)) {
      errs.optionCount = "선택지 개수와 설정값이 일치하지 않습니다.";
    }

    setErrors(errs);
    return Object.values(errs).every((v) => !v);
  };

  const handleSave = () => {
    if (!validate()) {
      alert("필수 항목을 확인해주세요.");
      return;
    }
    onSave({ ...form, questionName: String(form.questionName).trim() });
  };

  const fieldClass = (name, base = "w-full p-2 border rounded") =>
    `${base} ${(errors[name] || (name === "questionName" && isDuplicateQuestionName)) ? "border-red-500" : ""}`;

  const saveDisabled =
    isDuplicateQuestionName ||
    !String(form?.questionName ?? "").trim(); // 문항명 공백 방지(UX용 즉시 비활성)

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full space-y-6">
      <span className="text-xl text-black font-bold">▐ 문항 상세정보</span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">
            하위역량 <span className="text-red-600 text-xs ml-1">*</span>
          </label>
          <select
            value={form.subCategoryId ?? ""}
            onChange={handleSubCategoryChange}
            className={fieldClass("subCategoryId")}
            aria-invalid={!!errors.subCategoryId}
          >
            <option value="" disabled>하위역량 선택</option>
            {subCategories?.map((sc) => (
              <option key={sc.id} value={sc.id}>{sc.name}</option>
            ))}
          </select>
          {errors.subCategoryId && (
            <p className="text-red-600 text-xs mt-1">{errors.subCategoryId}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">문항 번호</label>
          <input
            type="number"
            name="questionNo"
            readOnly
            value={form.questionNo ?? ""}
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">
            표시 순서 <span className="text-red-600 text-xs ml-1">*</span>
          </label>
          <input
            type="number"
            name="displayOrder"
            min={1}
            value={form.displayOrder ?? ""}
            onChange={handleChange}
            className={fieldClass("displayOrder")}
            aria-invalid={!!errors.displayOrder}
            placeholder="예) 1"
          />
          {errors.displayOrder && (
            <p className="text-red-600 text-xs mt-1">{errors.displayOrder}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm mb-1">
            문항명 <span className="text-red-600 text-xs ml-1">*</span>
          </label>
          <input
            type="text"
            name="questionName"
            value={form.questionName ?? ""}
            onChange={handleChange}
            className={fieldClass("questionName")}
            aria-invalid={!!errors.questionName || isDuplicateQuestionName}
            placeholder="문항 제목을 입력하세요"
          />
          {/* 중복 즉시 표시 */}
          {isDuplicateQuestionName && !errors.questionName && (
            <p className="text-red-600 text-xs mt-1">이미 존재하는 문항명입니다.</p>
          )}
          {errors.questionName && (
            <p className="text-red-600 text-xs mt-1">{errors.questionName}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm mb-1">문항 설명</label>
          <textarea
            name="questionContent"
            value={form.questionContent ?? ""}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border rounded"
            placeholder="문항 설명을 입력하세요"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">답변문항구분</label>
          <select
            value={form.optionCount ?? 5}
            onChange={handleOptionCountSelect}
            className={fieldClass("optionCount")}
            aria-invalid={!!errors.optionCount}
          >
            {[3, 4, 5, 6, 7].map((num) => (
              <option key={num} value={num}>{num}문항 답변</option>
            ))}
          </select>
          {errors.optionCount && (
            <p className="text-red-600 text-xs mt-1">{errors.optionCount}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">답변 허용 개수</label>
          <input
            type="number"
            name="selectAllowCount"
            value={form.selectAllowCount ?? 1}
            min={1}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
      </div>

      <AdminQuestionOption
        options={form.options}
        onOptionChange={handleOptionChange}
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          disabled={saveDisabled}
          title={isDuplicateQuestionName ? "중복된 문항명은 저장할 수 없습니다." : undefined}
        >
          저장
        </button>
        {form.id && (
          <button
            type="button"
            onClick={() => onDelete(form.id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            삭제
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminQuestionDetail;
