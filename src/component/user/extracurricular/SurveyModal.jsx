import React, { useState, useEffect } from "react";
import { programSurvey, surveyResponse } from "../../../api/user/extracurricular/UserSurveyApi";
import { useAuth } from "../../../hooks/useAuth.jsx";

const ratingsText = {
  5: "매우만족",
  4: "만족",
  3: "보통",
  2: "불만족",
  1: "매우 불만족",
};

const SurveyModal = ({ isOpen, onClose, program, onSubmitSuccess }) => {
  const [surveyData, setSurveyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState("");


 const { user } = useAuth();
 const logNo = user?.loginId || ""; 

  useEffect(() => {
    if (!isOpen || !program?.eduMngId) {
      setSurveyData(null);
      setSelectedRating(0);
      setComment("");
      return;
    }
    const fetchSurvey = async () => {
      try {
        setLoading(true);
        const data = await programSurvey(program.eduMngId);
        setSurveyData(data);
      } catch (error) {
        console.error(error);
        alert("설문 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [isOpen, program]);

  if (!isOpen) return null;

   const handleSubmit = async () => {
    if (selectedRating === 0) {
      alert("별점을 선택해주세요.");
      return;
    }

    const responseDTO = {
      srvyId: surveyData.srvyId,
      stdntNo: logNo,
      srvyRspnsCn: comment,
      srvyRspnsDt: new Date().toISOString(),
      srvyDgstfnScr: selectedRating,
    };

    try {
      await surveyResponse(surveyData.srvyId, responseDTO);
      alert("설문 응답이 저장되었습니다.");
      if (onSubmitSuccess) onSubmitSuccess(); // ✅ 성공 시 부모에 알림
      onClose();
    } catch (error) {
      console.error(error);
      alert("설문 응답 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      {/* 배경 */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* 모달 내용 */}
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-[550px] z-10 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 text-center">
          {loading ? "설문 불러오는 중..." : surveyData?.srvyTtl || "설문 제목 없음"}
        </h2>

        {/* 라디오 버튼 선택지 */}
      <div className="mb-6">
        <p className="mb-2 font-bold">만족도를 선택 해주세요</p>
        <form className="flex space-x-6 justify-start">
            {Object.entries(ratingsText)
            .sort((a, b) => b[0] - a[0]) // 5부터 내림차순 정렬
            .map(([value, label]) => (
                <label
                key={value}
                className="flex items-center gap-2 cursor-pointer select-none"
                >
                <input
                    type="radio"
                    name="rating"
                    value={value}
                    checked={selectedRating === Number(value)}
                    onChange={() => setSelectedRating(Number(value))}
                    className="accent-blue-700"/>
                <span>{label}</span>
                </label>
            ))}
        </form>
        </div>
        
        <div className="font-bold">
            {surveyData?.srvyQitemCn}
        </div>
        {/* 코멘트 입력 */}
        <div className="w-full border mb-4 rounded">
          <textarea
            className="w-full p-2 resize-none"
            rows={4}
            placeholder="설문 내용을 입력하세요"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
            type="button"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
            type="button"
          >
            제출
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyModal;