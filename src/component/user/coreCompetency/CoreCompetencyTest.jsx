import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CoreCompetencyTest = () => {
    // ---------------------------
    // 상태 정의
    // ---------------------------
    const [questions, setQuestions] = useState([]);      // 전체 문항 리스트
    const [responses, setResponses] = useState({});      // 사용자 응답 상태 (questionId → {label, score})

    // ---------------------------
    // URL 파라미터 및 페이지 이동
    // ---------------------------
    const { assessmentId } = useParams();                // 진단 평가 ID (URL로부터 추출)
    const navigate = useNavigate();                      // 페이지 이동 훅

    // ---------------------------
    // 진단 문항 불러오기
    // ---------------------------
    useEffect(() => {
        axios
            .get(`/api/user/assessments/${assessmentId}/questions`)
            .then((res) => setQuestions(res.data))
            .catch((err) => console.error("문항 로딩 실패", err));
    }, [assessmentId]);

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
    // 닫기 버튼 클릭 시
    // ---------------------------
    const handleClose = () => {
        const res = window.confirm("작성 중인 응답이 모두 삭제됩니다.\n정말 나가시겠습니까?");
        if (res) navigate("/competency/coreCompetency/list");
    };

    // ---------------------------
    // 제출 버튼 클릭 시
    // ---------------------------
    const handleSubmit = () => {
        if (Object.keys(responses).length !== questions.length) {
            alert("모든 문항에 응답해주세요");
            return;
        }

        const formatted = {
            assessmentId: assessmentId,
            responses: Object.entries(responses).map(([questionId, { label, score }]) => ({
                questionId: parseInt(questionId),
                label,
                score,
            })),
        };

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
                        {questions.length > 0 ? (
                            // ✅ currentQuestions 대신 questions 전체를 렌더링
                            questions.map((q) => (
                                <tr key={q.questionId} className="hover:bg-blue-50 transition">
                                    <td className="border px-6 py-4">{q.questionNo}</td>
                                    <td className="border px-4 py-3 text-left text-[16px]">{q.questionName}</td>
                                    {q.responseChoiceOptions.map((opt) => (
                                        <td key={opt.optionId} className="border px-2 py-2 min-w-[120px]">
                                            <label className="inline-flex items-center space-x-1 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name={`question_${q.questionId}`}
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
                            <tr>
                                <td colSpan={7} className="text-center py-8 text-gray-500">
                                    문항이 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* ✅ 페이지네이션 UI 및 관련 함수 호출 제거 */}

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