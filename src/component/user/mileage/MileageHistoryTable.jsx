import React from 'react';

const MileageHistoryTable = ({ history, startIndex }) => {
  return (
    <table className="w-full border border-gray-300 text-center">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">번호</th>
          <th className="border p-2">내역</th>
          <th className="border p-2">변동</th>
          <th className="border p-2">누적</th>
          <th className="border p-2">날짜</th>
        </tr>
      </thead>
      <tbody>
        {history.length > 0 ? (
          history.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">{startIndex + index + 1}</td>
              <td className="border p-2">{item.description}</td>
              <td className="border p-2">{item.change}</td>
              <td className="border p-2">{item.totalScore}</td>
              <td className="border p-2">{item.createdAt?.split('T')[0]}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="p-4">내역이 없습니다.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default MileageHistoryTable;
