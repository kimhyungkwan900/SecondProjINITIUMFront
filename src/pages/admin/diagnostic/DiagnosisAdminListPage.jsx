import React, { useEffect, useState, useCallback } from 'react';
import { fetchPagedTests } from '../../../api/user/diagnostic/diagnosisApi.jsx';
import { deleteAdminDiagnosticTest } from '../../../api/user/diagnostic/diagnosisAdminApi.jsx';
import Sidebar from '../../../layouts/admin/extracurricular/Sidebar.jsx';

const DiagnosisAdminListPage = () => {
  const [tests, setTests] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const loadTests = useCallback(() => {
    fetchPagedTests(keyword, page, 5)
      .then((res) => {
        let filtered = res?.content || [];
        
        setTests(filtered);
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
    <div className="min-h-screen bg-[#f6f9fc] flex">
      {/* Sidebar */}
      <Sidebar />

      {/* 메인 콘텐츠 */}
      <main className="flex-1 ml-64 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-5xl w-full mx-auto">
          <h1 className="text-2xl font-bold text-[#222E8D] mb-6 text-center">
            📋 등록된 검사 목록
          </h1>

          {/* 검색 + 필터 */}
          <div className="flex flex-col md:flex-row gap-2 mb-6">
            <input
              type="text"
              placeholder="검색어"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#28B8B2]"
            />
            <button
              onClick={() => { setPage(0); loadTests(); }}
              className="bg-[#222E8D] text-white px-4 py-2 rounded-lg hover:bg-[#1a1f6b] transition"
            >
              검색
            </button>
          </div>

          {/* 목록 */}
          <ul className="space-y-3">
            {tests.map((test) => (
              <li
                key={test.id}
                className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition"
              >
                <span className="font-medium text-gray-800">
                  {test.name}
                </span>
                <button
                  onClick={() => handleDelete(test.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>

          {/* 페이징 */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx}
                disabled={idx === page}
                onClick={() => setPage(idx)}
                className={`px-3 py-1 rounded-lg border transition font-medium ${
                  idx === page
                    ? 'bg-[#222E8D] text-white border-[#222E8D]'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-[#f0f4ff] hover:text-[#222E8D]' 
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DiagnosisAdminListPage;
