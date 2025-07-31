import React, { useEffect, useState } from 'react';
import {
  createAdminDiagnosticTest,
  deleteAdminDiagnosticTest,
  fetchAdminAllTests
} from '../../../api/user/diagnostic/diagnosisAdminApi.jsx';
import DiagnosisForm from '../../../component/user/diagnostic/DiagnosisForm.jsx';

const DiagnosisAdminPage = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = () => {
    fetchAdminAllTests()
      .then((res) => setTests(res.data))
      .catch(console.error);
  };

  const handleCreate = (dto) => {
    createAdminDiagnosticTest(dto)
      .then(() => {
        alert('검사 등록 완료');
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
      <ul>
        {tests.map((test) => (
          <li key={test.id} className="flex justify-between border p-2 mb-2">
            <span>{test.name}</span>
            <button
              onClick={() => handleDelete(test.id)}
              className="bg-red-500 text-white px-2 py-1"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiagnosisAdminPage;
