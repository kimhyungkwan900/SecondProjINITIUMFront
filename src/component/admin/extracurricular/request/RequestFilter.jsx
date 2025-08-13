import { useState, useEffect } from "react";

import { getEmployees } from "../../../../api/admin/extracurricular/category/CategoryApi";

const RequestFilter = ({ filter, onChangeFilter }) => {
  const [departments, setDepartments] = useState([]);

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
  <div className="bg-gray-200 w-full mt-4 rounded p-4 flex justify-center">
    <div className="flex flex-wrap items-center gap-10 px-5 text-lg">
      {/* 부서 */}
      <div className="flex items-center gap-2">
        <span>부서</span>
        <select
          className="px-4 py-1 w-50 rounded-md focus:outline-none"
          value={filter.departmentCode}
          onChange={(e) => onChangeFilter("departmentCode", e.target.value)}
        >
          <option value="">전체</option>
          {departments.map((data) => (
            <option key={data.subjectCode} value={data.subjectCode}>
              {data.subjectName}
            </option>
          ))}
        </select>
      </div>

      {/* 타입 */}
      <div className="flex items-center gap-2">
        <span>타입</span>
        <select
          className="focus:outline-none rounded w-20 py-1"
          value={filter.eduType}
          onChange={(e) => onChangeFilter("eduType", e.target.value)}
        >
          <option value={""}>전체</option>
          <option value={"TEAM"}>팀</option>
          <option value={"PERSONAL"}>개인</option>
        </select>
      </div>

      {/* 상태 */}
      <div className="flex items-center gap-2">
        <span>상태</span>
        <select
          className="focus:outline-none rounded w-20 py-1"
          value={filter.status}
          onChange={(e) => onChangeFilter("status", e.target.value)}
        >
          <option value={""}>전체</option>
          <option value={"REQUESTED"}>요청</option>
          <option value={"APPROVED"}>승인</option>
          <option value={"REJECTED"}>반려</option>
          <option value={"IN_PROGRESS"}>운영중</option>
          <option value={"ENDED"}>운영종료</option>
        </select>
      </div>

      {/* 프로그램명 */}
      <div className="flex items-center gap-2">
        <span>프로그램 명</span>
        <input
          type="text"
          className="px-4 py-1 w-70 rounded-md focus:outline-none"
          value={filter.keyword}
          onChange={(e) => onChangeFilter("keyword", e.target.value)}
        />
      </div>

    </div>
  </div>
);
};

export default RequestFilter;