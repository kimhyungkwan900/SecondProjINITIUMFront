

const ApplyList = ({ programs, loading, selectedIds, setSelectedIds, handleCancelApply }) => {
  const statusMap = {
    ACCEPT: { text: "승인", color: "text-green-600" },
    APPLY: { text: "신청", color: "text-blue-600" },
    REJECT: { text: "반려", color: "text-red-600" },
  };

  if (loading) {
    return <div className="py-10 text-center text-[#6C7A89]">로딩중...</div>;
  }

  // 전체 선택 상태 계산
  const isAllSelected = programs.length > 0 && programs.every((p) => selectedIds.has(p.eduAplyId));

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = programs.map((p) => p.eduAplyId);
      setSelectedIds(new Set(allIds));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleCheckboxChange = (eduAplyId) => {
    setSelectedIds((prev) => {
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
    <div className="border border-gray-200 rounded-lg overflow-hidden mt-4">
      {/* 테이블 헤더 */}
      <div className="grid grid-cols-6 gap-4 bg-[#E0E7E9] text-[#354649] px-4 py-3 text-center font-semibold">
        <div>
          <input type="checkbox" onChange={handleSelectAll} checked={isAllSelected} />
        </div>
        <div>프로그램 이름</div>
        <div>분류</div>
        <div>신청 상태</div>
        <div>신청일</div>
        <div>신청취소</div>
      </div>

      {/* 테이블 본문 */}
      <div className="text-sm">
        {!programs || programs.length === 0 ? (
          <div className="p-6 text-[#6C7A89] text-center">조회된 프로그램이 없습니다.</div>
        ) : (
          programs.map((program, idx) => (
            <div
              key={program.eduAplyId}
              className={`grid grid-cols-6 gap-4 items-center px-4 py-3 border-t border-gray-200 text-center hover:bg-gray-50 ${
                idx % 2 === 1 ? "bg-gray-50/50" : "bg-white"
              }`}
            >
              <div>
                <input
                  type="checkbox"
                  checked={selectedIds.has(program.eduAplyId)}
                  onChange={() => handleCheckboxChange(program.eduAplyId)}
                />
              </div>
              <div>{program.programNm}</div>
              <div>{program.categoryNm}</div>
              <div>
                {statusMap[program.aprySttsNm] ? (
                  <span className={statusMap[program.aprySttsNm].color}>{statusMap[program.aprySttsNm].text}</span>
                ) : (
                  <span className="text-gray-600">{program.aprySttsNm}</span>
                )}
              </div>
              <div>{program.eduAplyDt.replace("T", " ")}</div>
              <div>
                {program.aprySttsNm === "APPLY" ? (
                  <button
                    onClick={() => handleCancelApply(program.eduAplyId)}
                    className="py-2 px-4 rounded-md bg-[#354649] text-white font-semibold text-sm hover:bg-[#6C7A89] transition-colors disabled:opacity-50"
                  >
                    신청취소
                  </button>
                ) : (
                  <span className="text-red-400 font-semibold">취소불가</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ApplyList;
