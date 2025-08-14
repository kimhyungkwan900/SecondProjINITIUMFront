// src/components/admin/mileage/ScorePolicyTable.jsx
import React from "react";

const ScorePolicyTable = ({ policies, selectedIds, setSelectedIds, onDelete }) => {
  const toggleCheckbox = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const toggleAll = () => {
    if (selectedIds.length === policies.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(policies.map((p) => p.id));
    }
  };

  return (
    <div className="border rounded-lg overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-center">
              <input type="checkbox" onChange={toggleAll} checked={selectedIds.length === policies.length} />
            </th>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">비교과명</th>
            <th className="p-2 text-left">항목 코드</th>
            <th className="p-2 text-left">출석 기준</th>
            <th className="p-2 text-left">점수 비율</th>
            <th className="p-2 text-left">사용 여부</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => (
            <tr key={policy.id} className="border-t">
              <td className="p-2 text-center">
                <input type="checkbox" checked={selectedIds.includes(policy.id)} onChange={() => toggleCheckbox(policy.id)} />
              </td>
              <td className="p-2">{policy.id}</td>
              <td className="p-2">{policy.eduNm}</td>
              <td className="p-2">{policy.itemCode}</td>
              <td className="p-2">{policy.requiredAttendance}회</td>
              <td className="p-2">{policy.scoreRate * 100}%</td>
              <td className="p-2">{policy.useYn === "Y" ? "사용" : "미사용"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="p-4 text-right">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={onDelete}
          disabled={selectedIds.length === 0}
        >
          선택 삭제
        </button>
      </div>
    </div>
  );
};

export default ScorePolicyTable;
