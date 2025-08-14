import { useEffect, useState } from "react";
import { getEmployees , getCoreCateogry} from "../../../../api/admin/extracurricular/category/CategoryApi";

const CategoryFilter = ({
  filterText,
  onChangeFilterText,
  onChangeCompetency,
  onChangeDepartment,
}) => {
  const [departments, setDepartments] = useState([]);
  const [competencyOptions, setCompetencyOptions] = useState([]);

  useEffect(() => {
    // 부서 목록 불러오기
    const fetchDepartments = async () => {
      try {
        const data = await getEmployees();
        setDepartments(data);
      } catch (error) {
        console.error("부서 조회 실패", error);
      }
    };

    // 핵심역량 불러오기
    const fetchCompetencies = async () => {
      try {
        const data = await getCoreCateogry();
        // data 예시: [{ id:1, name:"융합역량", codes:[1,2] }, ...]
        // API 응답 형태에 맞게 가공
        setCompetencyOptions(data);
      } catch (error) {
        console.error("핵심역량 조회 실패", error);
      }
    };

    fetchDepartments();
    fetchCompetencies();
  }, []);

  return (
    <div className="bg-gray-200 w-full mt-4 rounded p-4">
      <div className="flex justify-between text-xl px-5">
        {/* 프로그램 분류명 검색 필드 */}
        <div className="flex items-center">
          <span>프로그램 분류 명</span>
          <input
            type="text"
            className="ml-3 px-4 py-1 w-60 rounded focus:outline-none"
            value={filterText}
            onChange={(e) => onChangeFilterText(e.target.value)}
          />
        </div>

        {/* 핵심역량 선택 */}
        <div className="flex items-center">
          <span>핵심역량</span>
          <select
              onChange={(e) => {
                const value = e.target.value;
                const id = value ? Number(value) : null; // 숫자로 변환
                if (onChangeCompetency) onChangeCompetency(id);
              }}
            >
            <option value="">전체</option>
            {competencyOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>

        {/* 주관부서 선택 */}
        <div className="flex items-center">
          <span>주관부서</span>
          <select
            className="ml-3 px-4 py-1 w-60 rounded focus:outline-none"
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