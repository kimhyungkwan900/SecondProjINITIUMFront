import React from 'react';

const MileageHistoryTable = ({ history, startIndex = 0 }) => {
  // 문자열/숫자 어떤 형태가 와도 안전하게 숫자 부호를 판별
  const toNumber = (v) => {
    if (typeof v === 'number') return v;
    if (v == null) return 0;
    const s = String(v).trim().replace(/,/g, '');
    const n = Number(s);
    return Number.isNaN(n) ? 0 : n;
  };

  // 화면에 보여줄 텍스트: 이미 +/−가 붙어 있으면 그대로, 아니면 부호 붙여서
  const formatChange = (v) => {
    if (v == null) return '0';
    const s = String(v).trim();
    if (s.startsWith('+') || s.startsWith('-')) return s; // 백엔드가 문자열로 준 경우
    const n = toNumber(v);
    return n > 0 ? `+${n}` : `${n}`;
  };

  const colorClass = (v) => {
    const n = toNumber(v);
    if (n > 0) return 'text-blue-600';
    if (n < 0) return 'text-red-500';
    return 'text-gray-500';
  };

  const formatDate = (dt) => {
    if (!dt) return '';
    // ISO 문자열이면 T 기준으로 자름, 아니면 Date 파싱 시도
    if (typeof dt === 'string' && dt.includes('T')) return dt.split('T')[0];
    const d = new Date(dt);
    return Number.isNaN(d.getTime()) ? String(dt) : d.toISOString().slice(0, 10);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mt-6">
      {/* 헤더 */}
      <div className="grid grid-cols-5 gap-4 bg-[#E0E7E9] text-[#354649] px-4 py-3 text-center font-semibold">
        <div>번호</div>
        <div>내역</div>
        <div>변동</div>
        <div>누적</div>
        <div>날짜</div>
      </div>

      {/* 본문 */}
      <div className="text-sm">
        {history?.length ? (
          history.map((item, index) => (
            <div
              key={item.id ?? index}
              className={`grid grid-cols-5 gap-4 items-center px-4 py-3 border-t border-gray-200 text-center ${
                index % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'
              } hover:bg-gray-50`}
            >
              <div>{startIndex + index + 1}</div>
              <div className="truncate">{item.description}</div>

              <div className={colorClass(item.change)}>
                {formatChange(item.change)}
              </div>

              <div>{item.totalScore}</div>
              <div>{formatDate(item.createdAt)}</div>
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
