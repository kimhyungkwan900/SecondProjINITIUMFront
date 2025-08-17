import React from 'react';

const MileageHistoryTable = ({ history, startIndex }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mt-6">
      {/* 테이블 헤더 */}
      <div className="grid grid-cols-5 gap-4 bg-[#E0E7E9] text-[#354649] px-4 py-3 text-center font-semibold">
        <div>번호</div>
        <div>내역</div>
        <div>변동</div>
        <div>누적</div>
        <div>날짜</div>
      </div>

      {/* 테이블 본문 */}
      <div className="text-sm">
        {history.length > 0 ? (
          history.map((item, index) => (
            <div key={index} className={`grid grid-cols-5 gap-4 items-center px-4 py-3 border-t border-gray-200 hover:bg-gray-50 text-center ${
              index % 2 === 1 ? "bg-gray-50/50" : "bg-white"
            }`}>
              <div>{startIndex + index + 1}</div>
              <div>{item.description}</div>
              <div className={`${item.change > 0 ? 'text-blue-600' : 'text-red-500'}`}>{item.change > 0 ? `+${item.change}` : item.change}</div>
              <div>{item.totalScore}</div>
              <div>{item.createdAt?.split('T')[0]}</div>
            </div>
          ))
        ) : (
          <div className="p-6 text-[#6C7A89] text-center">내역이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default MileageHistoryTable;
