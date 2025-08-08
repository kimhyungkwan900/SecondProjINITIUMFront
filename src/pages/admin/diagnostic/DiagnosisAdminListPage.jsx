import React, { useEffect, useState, useCallback } from 'react';
import { fetchPagedTests } from '../../../api/user/diagnostic/diagnosisApi.jsx';
import { deleteAdminDiagnosticTest } from '../../../api/user/diagnostic/diagnosisAdminApi.jsx';

const DiagnosisAdminListPage = () => {
  const [tests, setTests] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedTest, setSelectedTest] = useState(null);

  const loadTests = useCallback(() => {
    fetchPagedTests(keyword, page, 5)
      .then((res) => {
        const content = res?.content || [];
        setTests(content);
        setTotalPages(res?.totalPages || 0);
      })
      .catch(console.error);
  }, [keyword, page]);

  useEffect(() => {
    loadTests();
  }, [loadTests]);

  const handleDelete = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteAdminDiagnosticTest(id)
        .then(() => {
          alert('삭제 완료');
          loadTests();
        })
        .catch((err) => {
          alert('삭제 실패');
          console.error(err);
        });
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* 메인 콘텐츠 */}
      <main className="flex-1 ml-64 p-8">
        {/* 제목 */}
        <h1 className="font-extrabold text-2xl text-gray-700 mb-2">
          <span className="inline-block w-1 h-5 bg-[#222E8D] mr-3 align-middle"></span>
          등록된 검사 목록
        </h1>
        <hr className="border-gray-300 mb-6" />

        {/* 검색 영역 */}
        <div className="flex flex-col md:flex-row gap-2 mb-6">
          <input
            type="text"
            placeholder="검사명 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#28B8B2]"
          />
          <button
            onClick={() => { setPage(0); loadTests(); }}
            className="bg-[#222E8D] text-white px-4 py-2 rounded hover:bg-[#1a1f6b] transition"
          >
            검색
          </button>
        </div>

        {/* 목록 */}
        <div className="mb-6 border border-gray-300 rounded">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="p-2 w-1/4">ID</th>
                <th className="p-2 w-2/4">검사명</th>
                <th className="p-2 w-1/4 text-right">관리</th>
              </tr>
            </thead>
            <tbody>
              {tests.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500">
                    등록된 검사가 없습니다.
                  </td>
                </tr>
              ) : (
                tests.map((test) => (
                  <tr
                    key={test.id}
                    className={`border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${
                      selectedTest?.id === test.id ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => setSelectedTest(test)}
                  >
                    <td className="p-2">{test.id}</td>
                    <td className="p-2">{test.name}</td>
                    <td className="p-2 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(test.id);
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 상세보기 */}
        <div className="border border-gray-300 rounded p-4">
          <h2 className="text-lg font-bold text-gray-700 mb-3">검사 상세 정보</h2>
          {selectedTest ? (
            <div className="space-y-2 text-gray-600">
              <p><strong>ID:</strong> {selectedTest.id}</p>
              <p><strong>검사명:</strong> {selectedTest.name}</p>
              <p><strong>설명:</strong> {selectedTest.description || '설명 없음'}</p>
            </div>
          ) : (
            <p className="text-gray-500">상세보기를 위해 검사를 선택하세요.</p>
          )}
        </div>

        {/* 페이징 */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              disabled={idx === page}
              onClick={() => setPage(idx)}
              className={`px-3 py-1 rounded border transition font-medium ${
                idx === page
                  ? 'bg-[#222E8D] text-white border-[#222E8D]'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-[#222E8D]'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DiagnosisAdminListPage;
