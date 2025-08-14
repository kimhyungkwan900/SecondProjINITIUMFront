import React, { useEffect, useState } from 'react';
import {
  getQuestionsByAssessment,
  setAnswerOptionCount,
  createCoreCompetencyQuestion,
  updateCoreCompetencyQuestion,
  getSubCategoriesByAssessment,
  deleteCoreCompetencyQuestion,
} from '../../../../api/admin/coreCompetency/AdminQuestionApi';
import AdminQuestionDetail from './AdminQuestionDetail';

const AdminQuestionList = ({ assessmentId }) => {
  const [questions, setQuestions] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchQuestions = async () => {
    if (!assessmentId) {
      setQuestions([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [q, subs] = await Promise.all([
        getQuestionsByAssessment(assessmentId),
        getSubCategoriesByAssessment(assessmentId),
      ]);

      // <<< 문항 번호(questionNo) 기준으로 오름차순 정렬
      q.sort((a, b) => a.questionNo - b.questionNo);

      setQuestions(q);
      setSubCategories(subs || []);
    } catch (err) {
      console.error('문항 정보를 불러오는 데 실패했습니다.', err);
      setError('문항 정보를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
    setCurrentPage(1);
    setSelectedQuestion(null);
  }, [assessmentId]);

  const handleOptionCountChange = async (questionId, newCount) => {
    try {
      const updated = await setAnswerOptionCount(questionId, newCount);
      setSelectedQuestion(updated);
      await fetchQuestions();
      alert('선택지 개수가 변경되었습니다.');
    } catch (err) {
      console.error('선택지 개수 변경 실패', err);
      alert('선택지 개수 변경에 실패했습니다.');
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    const ok = window.confirm('정말 삭제하시겠습니까?');
    if (!ok) return;

    try {
      await deleteCoreCompetencyQuestion(id);
      await fetchQuestions();
      setSelectedQuestion(null);
      alert('삭제 완료');
      const after = Math.ceil((questions.length - 1) / itemsPerPage);
      if (currentPage > after) setCurrentPage(Math.max(after, 1));
    } catch (e) {
      console.error(e);
      alert('삭제 실패');
    }
  };

  const handleSave = async (form) => {
    try {
      if (!form.subCategoryId) {
        alert('하위역량을 선택해주세요.');
        return;
      }

      const duplicateOrder = questions.some(
        (q) => q.displayOrder === form.displayOrder && q.id !== form.id
      );
      if (duplicateOrder) {
        alert('표시순서가 이미 등록되어있습니다.');
        return;
      }

      if (form.id) {
        await updateCoreCompetencyQuestion(form.id, form);
        alert('문항 수정 완료');
      } else {
        await createCoreCompetencyQuestion(assessmentId, form);
        alert('문항 생성 완료');
      }
      await fetchQuestions();
      setSelectedQuestion(null);
    } catch (e) {
      console.error(e);
      alert('저장 실패');
    }
  };

  const totalPages = Math.ceil(questions.length / itemsPerPage);
  const currentQuestions = questions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <div className="p-4 text-center">문항 정보를 불러오는 중...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <div className="flex items-center justify-between">
          <span className="text-xl text-black font-bold">▐ 문항 목록</span>
          <button
            onClick={() => {
              const defaultSub = subCategories[0]?.id ?? null;

              if (defaultSub === null) {
              alert('역량 카테고리를 등록해주세요.');
              return; // 함수 실행 중단
            }

              setSelectedQuestion({
                id: null,
                questionNo: questions.length + 1,
                questionName: '',
                questionContent: '',
                displayOrder: questions.length + 1,
                optionCount: 5,
                selectAllowCount: 1,
                options: [],
                subCategoryId: defaultSub,
              });
            }}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            새 문항 추가
          </button>
        </div>

        <table className="w-full text-sm border-collapse mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 w-20">문항번호</th>
              <th className="border p-2 text-left">문항명</th>
              <th className="border p-2 w-24">표시순서</th>
              <th className="border p-2 w-28">답변허용개수</th>
            </tr>
          </thead>
          <tbody>
            {currentQuestions.map((question) => (
              <tr
                key={question.id}
                onClick={() => setSelectedQuestion(question)}
                className={`cursor-pointer hover:bg-blue-50 ${
                  selectedQuestion?.id === question.id ? 'bg-blue-100 font-bold' : ''
                }`}
              >
                <td className="border p-2 text-center">{question.questionNo}</td>
                <td className="border p-2">{question.questionName}</td>
                <td className="border p-2 text-center">{question.displayOrder}</td>
                <td className="border p-2 text-center">{question.selectAllowCount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="mt-4 flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              이전
            </button>
            <span className="font-semibold">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              다음
            </button>
          </div>
        )}
      </div>

      {selectedQuestion && (
        <AdminQuestionDetail
          key={selectedQuestion.id ?? 'new'}
          question={selectedQuestion}
          subCategories={subCategories}
          onOptionCountChange={handleOptionCountChange}
          onSave={handleSave}
          onDelete={handleDelete}
          existingQuestions={(questions || []).map(q => ({
          id: q.id,
          questionName: q.questionName || q.name || ""
        }))}
        />
      )}
    </div>
  );
};

export default AdminQuestionList;