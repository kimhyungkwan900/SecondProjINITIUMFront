import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CoreCompetencyTest = () => {
  // ---------------------------
  // 상태 정의
  // ---------------------------
  const [questions, setQuestions] = useState([]);          // 전체 문항 리스트
  const [responses, setResponses] = useState({});          // 사용자 응답 상태 (questionId → {label, score})
  const [currentPage, setCurrentPage] = useState(1);       // 현재 페이지 번호
  const itemsPerPage = 15;                                 // 한 페이지당 표시할 문항 수

  // ---------------------------
  // URL 파라미터 및 페이지 이동
  // ---------------------------
  const { assessmentId } = useParams();                    // 진단 평가 ID (URL로부터 추출)
  const navigate = useNavigate();                          // 페이지 이동 훅

  // ---------------------------
  // 진단 문항 불러오기 (최초 마운트 또는 assessmentId 변경 시)
  // ---------------------------
  useEffect(() => {
    axios
      .get(`/api/user/assessments/${assessmentId}/questions`)
      .then((res) => setQuestions(res.data))               // 서버에서 문항 데이터 받아서 상태에 저장
      .catch((err) => console.error("문항 로딩 실패", err));
  }, [assessmentId]);

  // ---------------------------
  // 페이지 변경 시 화면 맨 위로 스크롤
  // ---------------------------
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // ---------------------------
  // 라디오 버튼 선택 시 응답 상태 업데이트
  // ---------------------------
  const handleChange = (questionId, option) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: {
        label: option.label,
        score: option.score,
      },
    }));
  };

  // ---------------------------
  // 닫기 버튼 클릭 시: 확인창 후 목록 페이지로 이동
  // ---------------------------
  const handleClose = () => {
    const res = window.confirm("작성 중인 응답이 모두 삭제됩니다.\n정말 나가시겠습니까?");
    if (res) navigate("/competency/coreCompetency/list");
  };

  // ---------------------------
  // 제출 버튼 클릭 시 처리 로직
  // ---------------------------
  const handleSubmit = () => {
    // 모든 문항에 응답했는지 검사
    if (Object.keys(responses).length !== questions.length) {
      alert("모든 문항에 응답해주세요");
      return;
    }

    // 서버에 전송할 데이터 포맷 구성
    const formatted = {
      assessmentId: assessmentId,
      responses: Object.entries(responses).map(([questionId, { label, score }]) => ({
        questionId: parseInt(questionId),
        label,
        score,
      })),
    };

    // 사용자 확인 후 제출 처리
    const confirm = window.confirm("제출하시겠습니까?");
    if (!confirm) return;

    alert("제출되었습니다.");
    navigate("/competency/coreCompetency/result");

    const studentNo = localStorage.getItem("studentNo");

    axios
      .post(`/api/user/coreCompetency/submit?studentNo=${studentNo}`, formatted)
      .then(() => alert("제출 완료"))
      .catch((err) => console.error("제출 실패", err));
  };

  // ---------------------------
  // 페이징 처리 계산
  // ---------------------------
  const totalPages = Math.ceil(questions.length / itemsPerPage);  // 총 페이지 수
  const indexOfLast = currentPage * itemsPerPage;                 // 현재 페이지 마지막 문항 인덱스
  const indexOfFirst = indexOfLast - itemsPerPage;                // 현재 페이지 첫 문항 인덱스
  const currentQuestions = questions.slice(indexOfFirst, indexOfLast);  // 현재 페이지에 보여줄 문항들

  // ---------------------------
  // 페이지네이션 렌더링 함수
  // ---------------------------
  const renderPagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    // 끝 페이지 조정
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center mt-6 space-x-1">
        {/* 이전 버튼 */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          이전
        </button>

        {/* 숫자 버튼 */}
        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`px-3 py-1 border rounded ${
              currentPage === num ? "bg-blue-600 text-white" : "bg-white text-gray-800"
            }`}
          >
            {num}
          </button>
        ))}

        {/* 다음 버튼 */}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          다음
        </button>
      </div>
    );
  };

  return (
    <div className="w-[1400px] mx-auto p-6 bg-white shadow-xl rounded-xl mt-8">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">핵심역량 진단</h1>
        <button
          onClick={handleClose}
          className="text-gray-600 hover:text-red-600 border px-3 py-1 rounded"
        >
          닫기 ✕
        </button>
      </div>

      {/* 문항 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-center text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border px-4 py-3 w-20">문항번호</th>
              <th className="border px-4 py-4 w-[400px]">문항 내용</th>
              <th className="border px-4 py-2" colSpan={5}>선택지</th>
            </tr>
          </thead>
          <tbody>
            {currentQuestions.length > 0 ? (
              currentQuestions.map((q) => (
                <tr key={q.questionId} className="hover:bg-blue-50 transition">
                  <td className="border px-6 py-4">{q.questionNo}</td>
                  <td className="border px-4 py-3 text-left text-[16px]">{q.questionName}</td>

                  {/* 선택지 렌더링 */}
                  {q.responseChoiceOptions.map((opt) => (
                    <td key={opt.optionId} className="border px-2 py-2 min-w-[120px]">
                      <label className="inline-flex items-center space-x-1 cursor-pointer">
                        <input
                          type="radio"
                          name={`question_${q.questionId}`}                     // 같은 문항은 그룹핑
                          value={opt.score}
                          checked={responses[q.questionId]?.label === opt.label}
                          onChange={() => handleChange(q.questionId, opt)}     // 선택 시 상태 업데이트
                          className="accent-blue-600"
                        />
                        <span>{opt.label}</span>
                      </label>
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  문항이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {questions.length > itemsPerPage && renderPagination()}

      {/* 제출 버튼 */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow-md"
        >
          제출하기
        </button>
      </div>
    </div>
  );
};

export default CoreCompetencyTest;
