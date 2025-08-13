import React, { useEffect, useState } from "react";
import AdminQuestionOption from "./AdminQuestionOption"; // 선택지 전문 컴포넌트 import

const AdminQuestionDetail = ({ question, subCategories, onSave, onDelete }) => {
  const [form, setForm] = useState({});

  // 부모로부터 받은 question prop이 변경될 때마다 form 상태를 동기화합니다.
  useEffect(() => {
    // question 데이터에 options 배열이 있으면 사용하고, 없으면 optionCount에 맞춰 새로 생성합니다.
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
    });
  }, [question]);

  // 문항명, 표시 순서 등 일반적인 입력 필드 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    const isNumeric = ["displayOrder", "selectAllowCount"].includes(name);
    setForm((prev) => ({ ...prev, [name]: isNumeric ? Number(value) : value }));
  };

  // 하위 역량 선택 핸들러
  const handleSubCategoryChange = (e) => {
    const id = e.target.value ? Number(e.target.value) : null;
    setForm((prev) => ({ ...prev, subCategoryId: id }));
  };

  /**
   * 자식 컴포넌트(AdminQuestionOption)에서 호출될 함수.
   * 선택지의 내용이나 점수가 변경되면 form.options 상태를 업데이트합니다.
   */
  const handleOptionChange = (index, field, value) => {
    // 불변성을 유지하기 위해 새로운 배열을 생성
    const updatedOptions = [...(form.options || [])];
    updatedOptions[index] = {
      ...updatedOptions[index],
      [field]: field === 'score' ? Number(value) : value,
    };
    setForm((prev) => ({ ...prev, options: updatedOptions }));
  };

  /**
   * 답변 문항 개수 변경 시 호출될 함수.
   * 새로운 개수에 맞춰 options 배열을 재생성합니다.
   */
  const handleOptionCountSelect = (e) => {
    const newCount = parseInt(e.target.value, 10);
    const currentOptions = form.options || [];

    const newOptions = Array.from({ length: newCount }, (_, i) => {
      // 기존에 입력된 값이 있으면 유지하고, 없으면 새로운 빈 객체를 생성합니다.
      return currentOptions[i] || { optionNo: i + 1, label: "", score: 0, id: null };
    });

    setForm((prev) => ({
      ...prev,
      optionCount: newCount,
      options: newOptions,
    }));
  };

  // 저장 버튼 클릭 핸들러
  const handleSave = () => {
    if (!form.subCategoryId) {
      alert("하위역량을 선택해주세요.");
      return;
    }
    // 현재 form 상태 전체를 부모의 onSave 함수로 전달
    onSave(form);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full space-y-6">
      <span className="text-xl text-black font-bold">▐ 문항 상세정보</span>

      {/* 문항 기본 정보 입력 UI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">하위역량</label>
          <select value={form.subCategoryId ?? ""} onChange={handleSubCategoryChange} className="w-full p-2 border rounded">
            <option value="" disabled>하위역량 선택</option>
            {subCategories?.map((sc) => <option key={sc.id} value={sc.id}>{sc.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">문항 번호</label>
          <input type="number" name="questionNo" readOnly value={form.questionNo ?? ""} className="w-full p-2 border rounded bg-gray-100" />
        </div>
        <div>
          <label className="block text-sm mb-1">표시 순서</label>
          <input type="number" name="displayOrder" value={form.displayOrder ?? ""} onChange={handleChange} className="w-full p-2 border rounded" placeholder="예) 1" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">문항명</label>
          <input type="text" name="questionName" value={form.questionName ?? ""} onChange={handleChange} className="w-full p-2 border rounded" placeholder="문항 제목을 입력하세요" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">문항 설명</label>
          <textarea name="questionContent" value={form.questionContent ?? ""} onChange={handleChange} rows={3} className="w-full p-2 border rounded" placeholder="문항 설명을 입력하세요" />
        </div>
        <div>
          <label className="block text-sm mb-1">답변문항구분</label>
          <select value={form.optionCount ?? 5} onChange={handleOptionCountSelect} className="w-full p-2 border rounded">
            {[3, 4, 5, 6, 7].map((num) => <option key={num} value={num}>{num}문항 답변</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">답변 허용 개수</label>
          <input type="number" name="selectAllowCount" value={form.selectAllowCount ?? 1} min={1} readOnly className="w-full p-2 border rounded bg-gray-100" />
        </div>
      </div>

      {/* 선택지 편집 UI를 렌더링하는 부분 */}
      <AdminQuestionOption
        options={form.options}
        onOptionChange={handleOptionChange}
      />

      {/* 저장 및 삭제 버튼 */}
      <div className="flex justify-end gap-2">
        <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          저장
        </button>
        {form.id && (
          <button type="button" onClick={() => onDelete(form.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            삭제
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminQuestionDetail;