// StudentListTable.jsx
import React from "react";

/**
 * 학생 목록 테이블 컴포넌트
 * props:
 * - students: [{subjectCode, schoolYear, studentNo, name, completeDate}, ...]
 * - selected: 현재 선택된 학생 객체
 * - onSelect: 학생 클릭 시 호출(fn(student))
 * - loading: 목록 로딩 여부
 * - error: 에러 메시지
 */
const StudentListTable = ({ students, selected, onSelect, loading, error }) => {
  if (loading) {
    return <div className="text-sm text-gray-500">불러오는 중…</div>;
  }
  if (error) {
    return <div className="text-sm text-red-600">{error}</div>;
  }
  if (!students || students.length === 0) {
    return <div className="text-sm text-gray-500">학생 데이터가 없습니다.</div>;
  }

  return (
    <div className="overflow-auto border rounded-lg">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 sticky top-0">
          <tr className="text-left">
            <th className="px-3 py-2 border-b">학과</th>
            <th className="px-3 py-2 border-b">학년</th>
            <th className="px-3 py-2 border-b">학번</th>
            <th className="px-3 py-2 border-b">성명</th>
            <th className="px-3 py-2 border-b">응답일시</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => {
            const isSelected = selected?.studentNo === s.studentNo;
            return (
              <tr
                key={s.studentNo}
                onClick={() => onSelect?.(s)}
                className={`cursor-pointer hover:bg-gray-100 ${isSelected ? "bg-indigo-50" : ""}`}
              >
                <td className="px-3 py-2 border-b">{s.subjectCode}</td>
                <td className="px-3 py-2 border-b">{s.schoolYear}</td>
                <td className="px-3 py-2 border-b">{s.studentNo}</td>
                <td className="px-3 py-2 border-b">{s.name}</td>
                <td className="px-3 py-2 border-b">{s.completeDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StudentListTable;
