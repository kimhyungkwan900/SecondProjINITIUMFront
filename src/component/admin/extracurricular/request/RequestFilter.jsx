import { useEffect, useState } from "react";
import { getEmployees } from "../../../../api/admin/extracurricular/category/CategoryApi";

const RequestFilter = ({ filter, onChangeFilter }) => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getEmployees();
        setDepartments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("부서 조회 실패", error);
        setDepartments([]);
      }
    };
    fetchDepartments();
  }, []);

  return (
    <section className="adm-card p-4">
      <div className="flex flex-wrap items-end">
        {/* 부서 */}
        <div className="pr-4 pb-3">
          <label className="adm-label">부서</label>
          <select
            className="adm-control w-56"
            value={filter.departmentCode ?? ""}
            onChange={(e) => onChangeFilter("departmentCode", e.target.value)}
          >
            <option value="">전체</option>
            {departments.map((d) => (
              <option key={d.subjectCode} value={d.subjectCode}>
                {d.subjectName}
              </option>
            ))}
          </select>
        </div>

        {/* 타입 */}
        <div className="pr-4 pb-3">
          <label className="adm-label">타입</label>
          <select
            className="adm-control w-28"
            value={filter.eduType ?? ""}
            onChange={(e) => onChangeFilter("eduType", e.target.value)}
          >
            <option value="">전체</option>
            <option value="TEAM">팀</option>
            <option value="PERSONAL">개인</option>
          </select>
        </div>

        {/* 상태 */}
        <div className="pr-4 pb-3">
          <label className="adm-label">상태</label>
          <select
            className="adm-control w-32"
            value={filter.status ?? ""}
            onChange={(e) => onChangeFilter("status", e.target.value)}
          >
            <option value="">전체</option>
            <option value="REQUESTED">요청</option>
            <option value="APPROVED">승인</option>
            <option value="REJECTED">반려</option>
            <option value="IN_PROGRESS">운영중</option>
            <option value="ENDED">운영종료</option>
          </select>
        </div>

        {/* 프로그램명 */}
        <div className="pr-4 pb-3">
          <label className="adm-label">프로그램 명</label>
          <input
            type="text"
            className="adm-control w-80"
            value={filter.keyword ?? ""}
            onChange={(e) => onChangeFilter("keyword", e.target.value)}
            placeholder="검색어 입력"
          />
        </div>
      </div>
    </section>
  );
};

export default RequestFilter;
