import axios from 'axios';

/**
 * 나의 마일리지 총점 + 내역 조회 API
 * @param {string} studentNo - 학번
 * @param {number} page - 페이지 번호 (기본값 1)
 * @param {number} size - 페이지 크기 (기본값 10)
 */
export const getMileageSummary = async (studentNo, page = 1, size = 10) => {
  try {
    const response = await axios.get('/api/user/mileage/summary', {
      params: { studentNo, page, size }
    });
    return response.data; // totalScore + history(dtoList, 페이지 정보)
  } catch (error) {
    console.error('❌ 마일리지 조회 실패:', error);
    throw error;
  }
};

// 사용자 정보 조회 (이름/학번/학과/총점/계좌)
export const getUserScholarshipInfo = async (studentNo) => {
  const res = await axios.get('/api/user/scholarship/info', { params: { studentNo } });
  return res.data;
};

// 은행 코드 목록 조회 (드롭다운)
export const getBankCodes = async () => {
  const res = await axios.get('/api/user/scholarship/banks');
  return res.data; 
};

// 장학금 신청
// payload: { studentNo, accountNo }
export const applyScholarship = async (payload) => {
  const res = await axios.post('/api/user/scholarship/apply', payload);
  return res.data;
};

// 신청 현황 조회 
export const getScholarshipStatus = async (studentNo, page = 1, size = 10) => {
  const res = await axios.get(`/api/user/scholarship/status/${studentNo}`, {
    params: { page, size }
  });
  return res.data; // { dtoList, pageNumList, pageRequestDto, prev, next, totalCount }
};

