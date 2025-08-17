import React, { useEffect, useState } from 'react';
import AdminQuestionDetail from './AdminQuestionDetail';
import { createCoreCompetencyQuestion, deleteCoreCompetencyQuestion, getQuestionsByAssessment, getSubCategoriesByAssessment, setAnswerOptionCount, updateCoreCompetencyQuestion } from '../../../../api/admin/coreCompetency/AdminQuestionApi';

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

      // 문항번호 오름차순
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      // 현재 페이지 보정
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

  if (loading) return <div className="adm-loading">문항 정보를 불러오는 중...</div>;
  if (error) return <div className="adm-empty text-red-600">{error}</div>;

  return (
    <div className="space-y-4">
      {/* 목록 카드 */}
      <div className="adm-card p-4 w-full">
        {/* 상단 타이틀 & 액션 */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-800">문항 목록</h2>
          <button
            onClick={() => {
              const defaultSub = subCategories[0]?.id ?? null;
              if (defaultSub === null) {
                alert('역량 카테고리를 등록해주세요.');
                return;
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
            className="adm-btn adm-btn--primary"
          >
            새 문항 추가
          </button>
        </div>

        {/* 표 */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="adm-th w-20">문항번호</th>
                <th className="adm-th text-left">문항명</th>
                <th className="adm-th w-24">표시순서</th>
                <th className="adm-th w-28">답변허용개수</th>
              </tr>
            </thead>
            <tbody>
              {currentQuestions.length > 0 ? (
                currentQuestions.map((question) => {
                  const selected = selectedQuestion?.id === question.id;
                  return (
                    <tr
                      key={question.id}
                      onClick={() => setSelectedQuestion(question)}
                      aria-selected={selected ? 'true' : 'false'}
                      className={`cursor-pointer transition-colors hover:bg-gray-50 even:bg-gray-50/50 ${selected
                          ? 'bg-indigo-50 ring-1 ring-inset ring-indigo-200 font-semibold'
                          : 'bg-white'
                        }`}
                    >
                      <td className="adm-td text-center">{question.questionNo}</td>
                      <td className="adm-td">{question.questionName}</td>
                      <td className="adm-td text-center">{question.displayOrder}</td>
                      <td className="adm-td text-center">{question.selectAllowCount}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="adm-empty">
                    조회된 문항이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 pt-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="adm-btn adm-btn--secondary h-9 text-xs px-3 disabled:opacity-50"
            >
              이전
            </button>
            <span className="text-sm text-gray-700">
              <b>{currentPage}</b> / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="adm-btn adm-btn--secondary h-9 text-xs px-3 disabled:opacity-50"
            >
              다음
            </button>
          </div>
        )}
      </div>

      {/* 상세 패널 */}
      {selectedQuestion && (
        <AdminQuestionDetail
          key={selectedQuestion.id ?? 'new'}
          question={selectedQuestion}
          subCategories={subCategories}
          onOptionCountChange={handleOptionCountChange}
          onSave={handleSave}
          onDelete={handleDelete}
          existingQuestions={(questions || []).map((q) => ({
            id: q.id,
            questionName: q.questionName || q.name || '',
          }))}
        />
      )}
    </div>
  );
};

export default AdminQuestionList;
