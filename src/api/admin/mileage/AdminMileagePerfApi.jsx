import axiosInstance from "../../axiosInstance";

const BASE = "/admin/mileage-perf"; 
// 목록 조회 (검색 + 페이징)
export async function fetchMileagePerfs({
  page = 1,
  size = 10,
  studentNo,
  studentName,
  subjectName,
  sort = "createdAt,DESC",
} = {}) {
  const { data } = await axiosInstance.get(`${BASE}/list`, {
    params: { page: page - 1, size, studentNo, studentName, subjectName, sort },
  });
  const items = Array.isArray(data) ? data : (data?.dtoList ?? data?.content ?? []);
  const total = data?.totalCount ?? data?.totalElements ?? items.length;
  const p = (data?.pageRequestDto?.page ?? data?.pageable?.pageNumber ?? 0) + 1;
  const s = data?.pageRequestDto?.size ?? data?.pageable?.pageSize ?? size;
  return { items, total, page: p, size: s };
}

// 상세
export const fetchMileagePerfById = async (id) =>
  (await axiosInstance.get(`${BASE}/${id}`)).data;

// 생성: { studentNo, mileageItemId, scorePolicyId, scholarshipApplyId? }
export const createMileagePerf = async (dto) =>
  (await axiosInstance.post(`${BASE}/create`, dto)).data;

// 선택 삭제
export const deleteMileagePerfs = async (ids = []) =>
  (await axiosInstance.post(`${BASE}/delete`, ids)).data;
