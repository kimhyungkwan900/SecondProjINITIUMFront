import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CoreCompetencyTest = () => {
  // 문항 리스트 상태
  const [questions, setQuestions] = useState([]);

  // 사용자 응답 상태 (questionId -> { label, score })
  const [responses, setResponses] = useState({});

  // URL 파라미터에서 진단 ID 추출
  const { assessmentId } = useParams();

  // 페이지 이동용 훅
  const navigate = useNavigate();

  // 진단 문항 로딩
  useEffect(() => {
    axios
      .get(`/api/user/assessments/${assessmentId}/questions`)
      .then((res) => {
        setQuestions(res.data); // 서버에서 받아온 문항 데이터 설정
      })
      .catch((err) => console.error("문항 로딩 실패", err));
  }, [assessmentId]);

  // 닫기 버튼 클릭 시: 사용자에게 경고 후 목록 페이지로 이동
  const handleClose = () => {
    const res = window.confirm("작성 중인 응답이 모두 삭제됩니다.\n정말 나가시겠습니까?");
    if (res) {
      navigate("/competency/coreCompetency/list");
    }
  };

  // 라디오 버튼 선택 시 responses 상태 업데이트
  const handleChange = (questionId, option) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: {
        label: option.label,
        score: option.score,
      },
    }));
  };

  // 제출 버튼 클릭 시 실행
  const handleSubmit = () => {
    const formatted = {
      assessmentId: assessmentId,
      responses: Object.entries(responses).map(([questionId, { label, score }]) => ({
        questionId: parseInt(questionId),
        label,
        score,
      })),
    };

    alert("제출되었습니다.");
    navigate("/competency/coreCompetency/result");

    console.log("제출 데이터:", formatted);

    // 서버 전송용 API (주석 처리됨)
    // axios.post("/api/user/coreCompetency/submit", formatted)
    //   .then(() => alert("제출 완료"))
    //   .catch((err) => console.error("제출 실패", err));
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
              <th className="border px-4 py-2 w-20">문항번호</th>
              <th className="border px-4 py-2 w-[400px]">문항 내용</th>
              <th className="border px-4 py-2" colSpan={5}>선택지</th>
            </tr>
          </thead>
          <tbody>
            {questions.length > 0 ? (
              questions.map((q) => (
                <tr key={q.questionId} className="hover:bg-blue-50 transition">
                  <td className="border px-4 py-2">{q.questionNo}</td>
                  <td className="border px-4 py-2 text-left">{q.questionName}</td>

                  {/* 선택지 렌더링 */}
                  {q.responseChoiceOptions.map((opt) => (
                    <td
                      key={`opt-${q.questionId}-${opt.optionId}`}
                      className="border px-2 py-2 min-w-[120px]"
                    >
                      <label className="inline-flex items-center space-x-1 cursor-pointer">
                        <input
                          type="radio"
                          name={`question_${q.questionId}`} // 동일 문항 그룹화
                          value={opt.score}
                          checked={responses[q.questionId]?.label === opt.label}
                          onChange={() => handleChange(q.questionId, opt)}
                          className="accent-blue-600"
                        />
                        <span>{opt.label}</span>
                      </label>
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              // 문항이 없을 경우
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  문항이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
