import axiosInstance from "../../axiosInstance";

// 1. 목록 조회
export async function fetchScholarships({ page = 0, size = 10, studentName, studentNo, subjectName, stateCode }) {
  const { data } = await axiosInstance.get("/admin/scholarships", {
    params: { page, size, studentName, studentNo, subjectName, stateCode },
  });

  const items = data?.dtoList ?? [];
  const total = data?.totalCount ?? 0;
  const p = data?.pageRequestDto?.page ?? page;
  const s = data?.pageRequestDto?.size ?? size;

  return { items, total, page: p, size: s };
}

// 2. 상세 조회
export async function getScholarshipDetail(id) {
  const { data } = await axiosInstance.get(`/admin/scholarships/${id}`);
  return data;
}

// 3. 신청 등록
export async function createScholarship(payload) {
  await axiosInstance.post("/admin/scholarships", payload);
}

// 4. 상태 변경
export async function updateScholarshipStatus(id, newCode) {
  await axiosInstance.put(`/admin/scholarships/${id}/status`, null, {
    params: { newCode },
  });
}

// 5. 반려 사유 입력
export async function updateScholarshipRejectReason(id, reason) {
  await axiosInstance.put(`/admin/scholarships/${id}/reject-reason`, reason, {
    headers: { "Content-Type": "text/plain" },
  });
}

// 6. 지급 처리
export async function processScholarshipPayment(id) {
  await axiosInstance.post(`/admin/scholarships/${id}/payment`);
}

// 7. 마일리지 누계 확인
export async function fetchMileageTotal(studentNo) {
  const { data } = await axiosInstance.get(`/admin/scholarships/${studentNo}/mileage`);
  return data;
}
