import axiosInstance from "../../axiosInstance";

// 1. 실적 목록 조회 (검색 + 페이징)
export async function fetchMileagePerformances({ page = 0, size = 10, studentNo = "", studentName = "", subjectName = "" }) {
  const { data } = await axiosInstance.get("/admin/mileage-perf/list", {
    params: { page, size, studentNo, studentName, subjectName },
  });

  const items = Array.isArray(data) ? data : (data?.dtoList ?? data?.content ?? []);
  const total = data?.totalCount ?? data?.totalElements ?? items.length;
  const p = data?.pageRequestDto?.page ?? data?.pageable?.pageNumber ?? 0;
  const s = data?.pageRequestDto?.size ?? data?.pageable?.pageSize ?? size;

  return { items, total, page: p, size: s };
}

// 2. 실적 등록
export async function createMileagePerformance(payload) {
  const { data } = await axiosInstance.post("/admin/mileage-perf/create", payload);
  return data;
}

// 3. 실적 삭제 (다중 삭제)
export async function deleteMileagePerformances(idList = []) {
  await axiosInstance.post("/admin/mileage-perf/delete", idList);
}
