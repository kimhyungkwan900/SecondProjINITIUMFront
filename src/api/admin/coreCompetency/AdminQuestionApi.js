import axios from 'axios';

const API_BASE_URL = '/api/admin/coreCompetency/question';

export const createCoreCompetencyQuestion = (assessmentId, dto) =>
  axios.post(`${API_BASE_URL}/create/${assessmentId}`, dto).then(r => r.data);

export const updateCoreCompetencyQuestion = (questionId, dto) =>
  axios.put(`${API_BASE_URL}/update/${questionId}`, dto).then(r => r.data);

export const deleteCoreCompetencyQuestion = (questionId) =>
  axios.delete(`${API_BASE_URL}/delete/${questionId}`).then(r => r.data);

export const getCoreCompetencyQuestion = (questionId) =>
  axios.get(`${API_BASE_URL}/get/${questionId}`).then(r => r.data);

export const getAllCoreCompetencyQuestions = () =>
  axios.get(`${API_BASE_URL}/get/all`).then(r => r.data);

export const setAnswerOptionCount = (questionId, count) =>
  axios.patch(`${API_BASE_URL}/${questionId}/option-count`, null, { params: { count } })
       .then(r => r.data);

export const getQuestionsByAssessment = (assessmentId) =>
  axios.get(`${API_BASE_URL}/assessment/${assessmentId}`).then(r => r.data);

export const getSubCategoriesByAssessment = (assessmentId) =>
  axios.get(`${API_BASE_URL}/assessment/${assessmentId}/subcategories`).then(r => r.data);
