// src/api/admin/mileage/scorePolicyApi.js
import axiosInstance from "../../axiosInstance";

// 1. 목록 조회 (검색 + 페이징)
export async function fetchScorePolicies({ page = 0, size = 10, eduNm = "" }) {
  const { data } = await axiosInstance.get("/admin/score-policies/list", {
    params: { page, size, eduNm },
  });

  const items = Array.isArray(data) ? data : (data?.dtoList ?? data?.content ?? []);
  const total = data?.totalCount ?? data?.totalElements ?? items.length;
  const p = (data?.pageRequestDto?.page ?? data?.pageable?.pageNumber ?? 0);
  const s = data?.pageRequestDto?.size ?? data?.pageable?.pageSize ?? size;

  return { items, total, page: p, size: s };
}

// 2. 상세 조회
export async function getScorePolicyDetail(id) {
  const { data } = await axiosInstance.get(`/admin/score-policies/${id}`);
  return data;
}

// 3. 등록
export async function createScorePolicy(payload) {
  const { data } = await axiosInstance.post("/admin/score-policies/create", payload);
  return data;
}

// 4. 다중 삭제
export async function deleteScorePolicies(idList = []) {
  await axiosInstance.post("/admin/score-policies/delete", idList);
}

