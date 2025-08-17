import axiosInstance from "../../axiosInstance";

// CUD (Create, Update, Delete) 작업을 위한 기본 경로
const CUD_BASE_URL = '/admin/competencyCategory';
// Read (조회) 작업을 위한 기본 경로
const READ_BASE_URL = '/admin/assessments';

// --- 조회(Read) API ---

/**
 * 특정 진단(assessment)에 속한 모든 핵심 역량(Core Categories) 목록을 조회합니다.
 * @param {number | string} assessmentId - 진단 평가 ID
 * @returns {Promise<any[]>} 핵심 역량 목록
 */
export const getCoreCategoriesByAssessment = async (assessmentId) => {
    const { data } = await axiosInstance.get(`${READ_BASE_URL}/${assessmentId}/core`);
    return data;
};

/**
 * 특정 핵심 역량(Core Category)에 속한 모든 하위 역량(Subcategories) 목록을 조회합니다.
 * @param {number | string} coreId - 핵심 역량 ID
 * @returns {Promise<any[]>} 하위 역량 목록
 */
export const getSubCategoriesByCore = async (coreId) => {
    const { data } = await axiosInstance.get(`${READ_BASE_URL}/${coreId}/subcategories`);
    return data;
};

/**
 * 모든 인재상(Ideal Talent Profiles) 목록을 조회합니다.
 * @returns {Promise<any[]>} 인재상 목록
 */
export const getIdealTalentProfiles = async () => {
    const { data } = await axiosInstance.get(`${CUD_BASE_URL}/ideal-talent-profiles`);
    return data;
};

// --- 생성/수정/삭제(CUD) API ---

/**
 * 새로운 역량 카테고리(핵심/하위)를 생성합니다.
 * @param {object} categoryDto - 생성할 카테고리 데이터
 * @returns {Promise<any>} 생성된 카테고리 정보
 */
export const createCategory = async (categoryDto) => {
    const { data } = await axiosInstance.post(`${CUD_BASE_URL}/create`, categoryDto);
    return data;
};

/**
 * 기존 역량 카테고리를 수정합니다.
 * @param {number | string} id - 수정할 카테고리 ID
 * @param {object} categoryDto - 수정할 카테고리 데이터
 * @returns {Promise<any>} 수정된 카테고리 정보
 */
export const updateCategory = async (id, categoryDto) => {
    const { data } = await axiosInstance.put(`${CUD_BASE_URL}/update/${id}`, categoryDto);
    return data;
};

/**
 * 역량 카테고리를 삭제합니다.
 * @param {number | string} id - 삭제할 카테고리 ID
 * @param {object} categoryDto - 삭제 시 필요한 추가 데이터 (선택적)
 * @returns {Promise<any>} 삭제 성공 결과
 */
export const deleteCategory = async (id, categoryDto) => {
    // DELETE 요청 시 body를 보내려면 'data' 속성을 사용해야 합니다.
    const { data } = await axiosInstance.delete(`${CUD_BASE_URL}/delete/${id}`, { data: categoryDto });
    return data;
};