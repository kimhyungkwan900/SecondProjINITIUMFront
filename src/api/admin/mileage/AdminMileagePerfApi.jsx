import axiosInstance from "../../axiosInstance";

// 실적 목록
export async function fetchMileagePerfList({
  page = 1, size = 10, studentNo = "", studentName = "", subjectName = "",
} = {}) {
  const { data } = await axiosInstance.get("/admin/mileage-perf/list", {
    params: { page: page - 1, size, studentNo, studentName, subjectName },
  });
  const items = Array.isArray(data) ? data : (data?.dtoList ?? data?.content ?? []);
  const total = data?.totalCount ?? data?.totalElements ?? items.length;
  const p = (data?.pageRequestDto?.page ?? data?.pageable?.pageNumber ?? 0) + 1;
  const s = data?.pageRequestDto?.size ?? data?.pageable?.pageSize ?? size;
  return { items, total, page: p, size: s };
}

// 실적 등록 (정책 없이 accMlg로 등록 가능)
// payload: { studentNo, mileageItemId, accMlg? }
export async function createMileagePerf({ studentNo, mileageItemId, accMlg }) {
  const payload = { studentNo, mileageItemId };
  if (accMlg != null && accMlg !== "") payload.accMlg = Number(accMlg);
  const { data } = await axiosInstance.post("/admin/mileage-perf/create", payload);
  return data;
}

// 선택 삭제(있으면)
export async function deleteMileagePerfs(ids = []) {
  await axiosInstance.post("/admin/mileage-perf/delete", ids);
}

