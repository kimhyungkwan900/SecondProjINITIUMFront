import { useEffect, useState } from "react";
import { getEmployees } from "../../../../api/admin/extracurricular/category/CategoryApi";

const CategoryFilter = ({
  filterText,
  onChangeFilterText,
  onChangeCompetency,
  onChangeDepartment,
}) => {
  const [departments, setDepartments] = useState([]);

  const competencyOptions = [
    { label: "융합역량", value: JSON.stringify([1, 2]) },
    { label: "창의역량", value: JSON.stringify([3, 4]) },
    { label: "리더쉽", value: JSON.stringify([5, 6]) },
    { label: "소통역량", value: JSON.stringify([7, 8]) },
  ];

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getEmployees();
        setDepartments(data);
      } catch (error) {
        console.error("부서 조회 실패", error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="bg-gray-200 w-full mt-4 rounded p-4">
      <div className="flex justify-between text-xl px-5">
        {/* 프로그램 분류명 검색 필드 */}
        <div className="flex items-center">
          <span>프로그램 분류 명</span>
          <input
            type="text"
            className="ml-3 px-4 py-1 w-60 rounded-md text-lg focus:outline-none"
            value={filterText}
            onChange={(e) => onChangeFilterText(e.target.value)}
          />
        </div>

        {/* 핵심역량 선택 */}
        <div className="flex items-center">
          <span>핵심역량</span>
          <select
            className="ml-3 px-4 py-1 w-60 rounded-md text-lg focus:outline-none"
            onChange={(e) => {
              const value = e.target.value;
              const parsed = value ? JSON.parse(value) : [];
              if (onChangeCompetency) onChangeCompetency(parsed);
            }}
          >
            <option value="">전체</option>
            {competencyOptions.map((opt) => (
              <option key={opt.label} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* 주관부서 선택 */}
        <div className="flex items-center">
          <span>주관부서</span>
          <select
            className="ml-3 px-4 py-1 w-60 rounded-md text-lg focus:outline-none"
            onChange={(e) => {
              const value = e.target.value;
              if (onChangeDepartment) onChangeDepartment(value);
            }}
          >
            <option value="">전체</option>
            {departments.map((data) => (
              <option key={data.subjectCode} value={data.subjectCode}>
                {data.subjectName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;