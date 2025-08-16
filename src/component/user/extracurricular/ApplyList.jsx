
const ApplyList = ({ programs, loading, selectedIds, setSelectedIds, handleCancelApply}) => {
    
const statusMap = {
  ACCEPT: { text: "승인", color: "text-green-600" },
  APPLY:   { text: "신청", color: "text-blue-600" },
  REJECT:  { text: "반려", color: "text-red-600" },
};
  if (loading) {
    return <div className="text-center text-gray-400 py-8">로딩중...</div>;
  }

  if (!programs || programs.length === 0) {
    return (
      <div className="overflow-x-auto rounded-lg shadow-sm bg-white">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-50 text-gray-700 font-semibold border-b">
            <tr>
              <th className="px-3 py-2 border-b border-gray-200 text-center">프로그램 이름</th>
              <th className="px-3 py-2 border-b border-gray-200 text-center">교육 마지막일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3 py-2 border-b border-gray-200 text-center h-[100px]" colSpan={6}>
                조회된 프로그램이 없습니다.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  // 전체 선택 상태 계산
  const isAllSelected = programs.length > 0 && programs.every(p => selectedIds.has(p.eduAplyId));

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = programs.map(p => p.eduAplyId);
      setSelectedIds(new Set(allIds));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleCheckboxChange = (eduAplyId) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eduAplyId)) {
        newSet.delete(eduAplyId);
      } else {
        newSet.add(eduAplyId);
      }
      return newSet;
    });
  };

 

  return (
    <div className="overflow-x-auto rounded-lg shadow-sm bg-white mt-4">
      <table className="w-full table-auto text-sm">
        <thead className="bg-gray-50 text-gray-700 font-semibold border-b">
          <tr>
            <th className="px-3 py-2 border-b border-gray-200 text-center">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={isAllSelected}
              />
            </th>
            <th className="px-3 py-2 border-b border-gray-200 text-center">프로그램 이름</th>
            <th className="px-3 py-2 border-b border-gray-200 text-center">분류</th>
            <th className="px-3 py-2 border-b border-gray-200 text-center">신청 상태</th>
            <th className="px-3 py-2 border-b border-gray-200 text-center">신청일</th>
            <th className="px-3 py-2 border-b border-gray-200 text-center">신청취소</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program) => (
            console.log(program),
            <tr key={program.eduAplyId} className="hover:bg-gray-100">
              <td className="px-3 py-2 border-b border-gray-200 text-center">
                <input
                  type="checkbox"
                  checked={selectedIds.has(program.eduAplyId)}
                  onChange={() => handleCheckboxChange(program.eduAplyId)}
                />
              </td>
              <td className="px-3 py-2 border-b border-gray-200 text-center">{program.programNm}</td>
              <td className="px-3 py-2 border-b border-gray-200 text-center">{program.categoryNm}</td>
              <td className="px-3 py-2 border-b border-gray-200 text-center">
                {statusMap[program.aprySttsNm] 
                    ? <span className={statusMap[program.aprySttsNm].color}>
                        {statusMap[program.aprySttsNm].text}
                    </span>
                    : <span className="text-gray-600">{program.aprySttsNm}</span>
                }
                </td>
              <td className="px-3 py-2 border-b border-gray-200 text-center">
                {program.eduAplyDt.replace("T", " ")}
              </td>
              <td className="px-3 py-2 border-b border-gray-200 text-center">
                {program.aprySttsNm === "APPLY" ? (
                <button
                onClick={() => handleCancelApply(program.eduAplyId)}
                className="px-2 py-1 bg-[#354649] text-white rounded-md hover:bg-[#6C7A89]"
                >
                신청취소
                </button>
                ) : (
                  <span className="text-red-400 font-bold">취소불가</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplyList;