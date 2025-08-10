import React from 'react';

const Pagination = ({ pageInfo, onPageChange }) => {
  const { pageNumList, prev, next, pageRequestDto } = pageInfo;
  const currentPage = pageRequestDto?.page || 1;

  return (
    <div className="flex justify-center mt-4 space-x-2">
      {prev && (
        <button
          className="px-3 py-1 border rounded"
          onClick={() => onPageChange(currentPage - 1)}
        >
          이전
        </button>
      )}
      {pageNumList?.map((num) => (
        <button
          key={num}
          className={`px-3 py-1 border rounded ${num === currentPage ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}
      {next && (
        <button
          className="px-3 py-1 border rounded"
          onClick={() => onPageChange(currentPage + 1)}
        >
          다음
        </button>
      )}
    </div>
  );
};

export default Pagination;
