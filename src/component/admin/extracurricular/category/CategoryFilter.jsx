import { useEffect, useState } from "react";
import { getEmployees, getCoreCateogry } from "../../../../api/admin/extracurricular/category/CategoryApi";
import TextInput from "../../../common/TextInput";

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
    <div className="adm-card adm-toolbar mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700 text-sm">

        {/* 프로그램 분류명 */}
        <div>
          <label className="adm-label">프로그램 분류 명</label>
          <TextInput
            type="text"
            className="adm-control w-full md:w-68 mx-2"
            value={filterText}
            onChange={(e) => onChangeFilterText(e.target.value)}
          />
        </div>

        {/* 핵심역량 */}
        <div>
          <label className="adm-label">핵심역량</label>
          <select
            onChange={(e) => {
              const value = e.target.value;
              const id = value ? Number(value) : null;
              if (onChangeCompetency) onChangeCompetency(id);
            }}
            className="adm-control w-full md:w-68 mx-2"
          >
            <option value="">전체</option>
            {competencyOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>

        {/* 주관부서 */}
        <div>
          <label className="adm-label">주관부서</label>
          <select
            onChange={(e) => {
              const value = e.target.value;
              if (onChangeDepartment) onChangeDepartment(value);
            }}
            className="adm-control w-full md:w-68 mx-2"
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