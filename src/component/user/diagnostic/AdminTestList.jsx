import React, { useEffect, useState } from 'react';
import { fetchAdminAllTests, deleteAdminDiagnosticTest } from '../../../api/user/diagnostic/diagnosisAdminApi.jsx';

const AdminTestList = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);

  // 검사 목록 불러오기
  const loadTests = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminAllTests();
      setTests(data);
    } catch (error) {
      console.error('검사 목록 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // 삭제 처리
  const handleDelete = async (testId) => {
    if (!window.confirm('정말 이 검사를 삭제하시겠습니까?')) return;
    try {
      await deleteAdminDiagnosticTest(testId);
      alert('검사가 삭제되었습니다.');
      loadTests(); // 삭제 후 목록 갱신
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    loadTests();
  }, []);

  return (
    <div>
      <h2>관리자 검사 목록</h2>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <table border="1" width="100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>검사명</th>
              <th>설명</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {tests.length > 0 ? (
              tests.map((test) => (
                <tr key={test.id}>
                  <td>{test.id}</td>
                  <td>{test.name}</td>
                  <td>{test.description}</td>
                  <td>
                    <button
                      style={{ background: 'red', color: 'white' }}
                      onClick={() => handleDelete(test.id)}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">등록된 검사가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminTestList;
