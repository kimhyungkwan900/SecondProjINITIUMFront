import { useEffect, useState } from "react";
import { getEmployees } from "../../../../api/admin/extracurricular/category/CategoryApi";

import { getCoreCateogry, getSubCateogry } from "../../../../api/admin/extracurricular/category/CategoryApi";

const CategoryInputBox = ({ inputValues, setInputValues }) => {
  const [departments, setDepartments] = useState([]);
  const [coreCategories, setCoreCategories] = useState([]); // 핵심역량
  const [subCategories, setSubCategories] = useState([]); // 상위역량

 useEffect(() => {
  // 핵심역량 조회
  const fetchCore = async () => {
    try {
      const data = await getCoreCateogry(); 
      // 예: [{ id: 1, label: "융합역량" }, ...]
      setCoreCategories(data);
    } catch (error) {
      console.error("핵심역량 조회 실패", error);
    }
  };

  // 주관부서 조회
  const fetchDepartments = async () => {
    try {
      const data = await getEmployees();
      setDepartments(data);
    } catch (error) {
      console.error("부서 조회 실패", error);
    }
  };

  fetchCore();
  fetchDepartments();
}, []);

useEffect(() => {
  const fetchSub = async () => {
    if (!inputValues.competency) {
      setSubCategories([]);
      setInputValues(prev => ({ ...prev, stgrId: "" }));
      return;
    }
    try {
      const data = await getSubCateogry(inputValues.competency); 
      setSubCategories(data);
      setInputValues(prev => ({
        ...prev,
        stgrId: prev.stgrId && data.some(d => d.id === prev.stgrId) ? prev.stgrId : (data.length > 0 ? data[0].id : "")
      }));

    } catch (error) {
      console.error("상위역량 조회 실패", error);
    }
  };
  fetchSub();
}, [inputValues.competency]);

const onChange = (e) => {
  const { name, value } = e.target;

  setInputValues(prev => ({
    ...prev,
    [name]: value,
  }));
};

  return (
    <div className="grid grid-cols-2 gap-4 p-4 border rounded bg-white w-full">
      {/* 핵심역량 */}
      <div className="flex items-center">
        <label className="w-32 font-semibold">핵심역량</label>
        <select
          name="competency"
          value={inputValues.competency}
          onChange={onChange}
          className="flex-1 border rounded p-1 outline-none"
        >
          <option value="">선택</option>
          {coreCategories.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>

      {/* 상위분류 */}
      <div className="flex items-center">
        <label className="w-32 font-semibold">상위분류</label>
        <select
          name="stgrId"
          value={inputValues.stgrId}
          onChange={onChange}
          className="flex-1 border rounded p-1 outline-none"
          disabled={!inputValues.competency || subCategories.length === 0}
        >
          <option value="">선택</option>
          {subCategories.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>

      {/* 주관부서 */}
      <div className="flex items-center">
        <label className="w-32 font-semibold">주관부서</label>
        <select
          name="subjectCode"
          value={inputValues.subjectCode}
          onChange={onChange}
          className="flex-1 border rounded p-1 outline-none"
        >
          <option value="">선택</option>
          {departments.map((dept) => (
            <option key={dept.subjectCode} value={dept.subjectCode}>
              {dept.subjectName}
            </option>
          ))}
        </select>
      </div>

      {/* 프로그램분류명 */}
      <div className="flex items-center">
        <label className="w-32 font-semibold">프로그램 분류 명</label>
        <input
          name="ctgryNm"
          type="text"
          value={inputValues.ctgryNm}
          onChange={onChange}
          className="flex-1 border rounded p-1 outline-none"
          placeholder="분류 명을 입력하세요"
        />
      </div>

      {/* 프로그램 주요 내용 */}
      <div className="col-span-2 flex items-start">
        <label className="w-32 font-semibold pt-1">주요내용</label>
        <textarea
          name="ctgryDtl"
          value={inputValues.ctgryDtl}
          onChange={onChange}
          className="flex-1 border rounded p-1 h-24 outline-none resize-none"
          placeholder="프로그램 내용을 입력하세요"
        ></textarea>
      </div>
      <div className="flex items-center">
        <label className="w-32 font-semibold">사용 여부</label>
        <input
          type="checkbox"
          checked={inputValues.ctgryUseYn === "Y"}
          onChange={(e) => {
            const newYn = e.target.checked ? "Y" : "N";
            setInputValues((prev) => ({
              ...prev,
              ctgryUseYn: newYn,
            }));
          }}
          className="w-5 h-5"
        />
      </div>
    </div>
  );
};

export default CategoryInputBox;