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
    <div className="bg-gray-200 w-full mt-4 rounded p-4">
      <div className="flex justify-between text-xl gap-20 px-5">
        <div>
          <span>부서</span>
          <select
            className="ml-3 px-4 py-1 w-60 rounded-md text-lg focus:outline-none"
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

        <div>
          <span>상태  </span>
          <select
            className="focus:outline-none rounded"
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

        <div className="flex items-center">
          <span>프로그램 명</span>
          <input
            type="text"
            className="ml-3 px-4 py-1 w-60 rounded-md text-lg focus:outline-none"
            value={filter.keyword}
            onChange={(e) => onChangeFilter("keyword", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default RequestFilter;