import axiosInstance from "../../axiosInstance";

// 1. 목록 조회 (PageResponseDto / Spring Page 양쪽 모두 흡수)
export async function fetchScholarships({
  page = 0,
  size = 10,
  studentName,
  studentNo,
  subjectName,
  stateCode,
} = {}) {
  const { data } = await axiosInstance.get("/admin/scholarships", {
    params: {
      page,
      size,
      studentName: studentName || undefined,
      studentNo: studentNo || undefined,
      subjectName: subjectName || undefined,
      stateCode: stateCode || undefined,
    },
  });

  // PageResponseDto | Spring Page | 배열 모두 대응
  const items = Array.isArray(data) ? data : (data?.dtoList ?? data?.content ?? []);
  const total = data?.totalCount ?? data?.totalElements ?? items.length;
  const p = data?.pageRequestDto?.page ?? data?.pageable?.pageNumber ?? page;
  const s = data?.pageRequestDto?.size ?? data?.pageable?.pageSize ?? size;

  return { items, total, page: p, size: s };
}

// 2. 상세 조회
export async function getScholarshipDetail(id) {
  const { data } = await axiosInstance.get(`/admin/scholarships/${id}`);
  return data;
}

// 3. 신청 등록 (관리자 대리 신청)
// payload: { studentNo, accountNo }
export async function createScholarship(payload) {
  await axiosInstance.post("/admin/scholarships", payload);
}

// 4. 상태 변경 (1=신청, 2=승인, 3=반려, 4=지급)
export async function updateScholarshipStatus(id, newCode) {
  await axiosInstance.put(`/admin/scholarships/${id}/status`, null, {
    params: { newCode },
  });
}

// 5. 반려 사유 입력 (text/plain)
export async function updateScholarshipRejectReason(id, reason) {
  await axiosInstance.put(`/admin/scholarships/${id}/reject-reason`, reason, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

// 6. 지급 처리 (승인 상태에서만 가능)
export async function processScholarshipPayment(id) {
  await axiosInstance.post(`/admin/scholarships/${id}/payment`);
}

// 7. 특정 학생 누적 마일리지 조회
export async function fetchMileageTotal(studentNo) {
  const { data } = await axiosInstance.get(`/admin/scholarships/${studentNo}/mileage`);
  return data; // { studentNo, totalScore }
}
