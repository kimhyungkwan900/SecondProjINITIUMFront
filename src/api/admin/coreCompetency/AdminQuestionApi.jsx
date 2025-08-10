// api/adminCoreQuestionApi.js
import axios from "axios";

// 문항 전체 목록 조회
export const getAllQuestions = () =>
  axios.get("/api/admin/core-competency/question/get/all");

// 문항 단건 조회
export const getQuestion = (questionId) =>
  axios.get(`/api/admin/core-competency/question/get/${questionId}`);

// 드롭다운 변경: 해당 문항 옵션 개수 재생성
export const setOptionCount = (questionId, count) =>
  axios.patch(`/api/admin/core-competency/question/${questionId}/option-count`, null, {
    params: { count },
  });

// 문항 수정(기본정보 + 옵션 라벨/점수만)
// dto 구조는 백엔드 CoreCompetencyQuestionCreateRequestDto에 맞춘다.
export const updateQuestion = (questionId, dto) =>
  axios.put(`/api/admin/core-competency/question/update/${questionId}`, dto);
