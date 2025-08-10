import axiosInstance from "../../axiosInstance";

const CUD_BASE_URL = '/admin/competencyCategory';
const READ_BASE_URL = '/admin/assessments';

// --- 조회(Read) API ---
// assessment에 속한 핵심역량 목록 조회
export const getCoreCategoriesByAssessment = (assessmentId) => {
    return axiosInstance.get(`${READ_BASE_URL}/${assessmentId}/core`);
};

// coreCategory에 속한 하위역량 목록 조회
export const getSubCategoriesByCore = (coreId) => {
    return axiosInstance.get(`${READ_BASE_URL}/${coreId}/subcategories`);
};

// --- 인재상 목록 API ---
export const getIdealTalentProfiles = () => {
    return axiosInstance.get(`${CUD_BASE_URL}/ideal-talent-profiles`);
};

// --- 생성/수정/삭제(CUD) API ---
export const createCategory = (categoryDto) => {
    return axiosInstance.post(`${CUD_BASE_URL}/create`, categoryDto);
};

export const updateCategory = (id, categoryDto) => {
    return axiosInstance.put(`${CUD_BASE_URL}/update/${id}`, categoryDto);
};

export const deleteCategory = (id, categoryDto) => {
    return axiosInstance.delete(`${CUD_BASE_URL}/delete/${id}`, { data: categoryDto });
};