// src/pages/admin/diagnostic/DiagnosisAdminPage.jsx
import React, { useEffect, useState, useCallback } from 'react';
import {
  createAdminDiagnosticTest,
  deleteAdminDiagnosticTest
} from '../../../api/user/diagnostic/diagnosisAdminApi.jsx';
import { fetchPagedTests } from '../../../api/user/diagnostic/diagnosisApi.jsx';
import DiagnosisForm from '../../../component/user/diagnostic/DiagnosisForm.jsx';

const DiagnosisAdminPage = () => {
  const [tests, setTests] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [useYn, setUseYn] = useState(''); // 필터 (전체, 사용, 미사용)
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const loadTests = useCallback(() => {
    fetchPagedTests(keyword, page, 5)
      .then((res) => {
        let filtered = res.content;
        if (useYn) {
          filtered = filtered.filter(test => 
            useYn === 'Y' ? test.useYn === true : test.useYn === false
          );
        }
        setTests(filtered);
        setTotalPages(res.totalPages);
      })
      .catch(console.error);
  }, [keyword, page, useYn]);

  useEffect(() => {
    loadTests();
  }, [loadTests]);

  const handleCreate = (dto) => {
    createAdminDiagnosticTest(dto)
      .then(() => {
        alert('검사 등록 완료');
        setPage(0);
        loadTests();
      })
      .catch((err) => {
        alert('등록 실패');
        console.error(err);
      });
  };

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
    <div className="p-4">
      <DiagnosisForm onSubmit={handleCreate} />

      <hr className="my-4" />
      <h2 className="text-lg font-bold mb-2">등록된 검사 목록</h2>

      {/* 검색 + 필터 */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="검색어"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border p-1"
        />
        <select value={useYn} onChange={(e) => setUseYn(e.target.value)} className="border p-1">
          <option value="">전체</option>
          <option value="Y">사용</option>
          <option value="N">미사용</option>
        </select>
        <button
          onClick={() => { setPage(0); loadTests(); }}
          className="bg-blue-500 text-white px-3 py-1"
        >
          검색
        </button>
      </div>

      {/* 목록 */}
      <ul>
        {tests.map((test) => (
          <li key={test.id} className="flex justify-between border p-2 mb-2">
            <span>
              {test.name} ({test.useYn ? '사용' : '미사용'})
            </span>
            <button
              onClick={() => handleDelete(test.id)}
              className="bg-red-500 text-white px-2 py-1"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>

      {/* 페이징 */}
      <div className="mt-4">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            disabled={idx === page}
            onClick={() => setPage(idx)}
            className={`mx-1 px-2 py-1 border ${idx === page ? 'bg-gray-300' : ''}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DiagnosisAdminPage;
