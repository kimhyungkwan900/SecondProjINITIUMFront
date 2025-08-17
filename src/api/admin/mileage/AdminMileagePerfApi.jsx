// src/api/admin/mileage/AdminMileagePerfApi.js
import axiosInstance from "../../axiosInstance";

// 실적 목록 (기존)
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

// 신규: 학생의 "적립 가능(수료된)" 항목만 조회
export async function fetchEligibleMileageItems(studentNo) {
  if (!studentNo?.trim()) throw new Error("학번이 필요합니다.");
  const { data } = await axiosInstance.get(
    `/admin/mileage-perf/student/${encodeURIComponent(studentNo.trim())}/eligible-items`
  );
  // data: [{id, itemCode, eduNm, eduMlg, granted}]
  return data ?? [];
}

// 실적 등록 (정책 없이 accMlg로 등록 가능)
export async function createMileagePerf({ studentNo, mileageItemId, accMlg }) {
  const payload = { studentNo: studentNo?.trim(), mileageItemId: Number(mileageItemId) };
  if (accMlg != null && accMlg !== "") payload.accMlg = Number(accMlg);
  const { data } = await axiosInstance.post("/admin/mileage-perf/create", payload);
  return data;
}

// 선택 삭제(있으면)
export async function deleteMileagePerfs(ids = []) {
  await axiosInstance.post("/admin/mileage-perf/delete", ids);
}
