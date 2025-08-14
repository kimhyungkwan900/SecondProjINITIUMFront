const MileagePerfTable = ({ performances, selectedIds, setSelectedIds, onDelete }) => {
  const toggle = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedIds.length === performances.length) setSelectedIds([]);
    else setSelectedIds(performances.map((p) => p.id));
  };

  return (
    <div className="overflow-x-auto border rounded">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-center"><input type="checkbox" onChange={toggleAll} checked={selectedIds.length === performances.length} /></th>
            <th className="p-2">학번</th>
            <th className="p-2">이름</th>
            <th className="p-2">학과</th>
            <th className="p-2">적립 마일리지</th>
            <th className="p-2">비교과명</th>
            <th className="p-2">등록일</th>
          </tr>
        </thead>
        <tbody>
          {performances.map((perf) => (
            <tr key={perf.id} className="border-t">
              <td className="p-2 text-center"><input type="checkbox" checked={selectedIds.includes(perf.id)} onChange={() => toggle(perf.id)} /></td>
              <td className="p-2">{perf.studentNo}</td>
              <td className="p-2">{perf.name}</td>
              <td className="p-2">{perf.schoolSubjectName}</td>
              <td className="p-2">{perf.accMlg}</td>
              <td className="p-2">{perf.eduNm}</td>
              <td className="p-2">{new Date(perf.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 text-right">
        <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={onDelete} disabled={selectedIds.length === 0}>
          선택 삭제
        </button>
      </div>
    </div>
  );
};

export default MileagePerfTable;
