import axiosInstance from "../../axiosInstance";

// 리스트 조회 (검색 + 페이징)
export async function fetchMileageItems({
  page = 1,
  size = 10,
  itemCode = "",
  eduNm = "",
  sort = "createdAt,DESC",
} = {}) {
  const { data } = await axiosInstance.get("/admin/mileage-items/list", {
    params: { page: page - 1, size, itemCode, eduNm, sort },
  });
  // PageResponseDto | Spring Page | 배열 모두 흡수
  const items = Array.isArray(data) ? data : (data?.dtoList ?? data?.content ?? []);
  const total = data?.totalCount ?? data?.totalElements ?? items.length;
  const p = (data?.pageRequestDto?.page ?? data?.pageable?.pageNumber ?? 0) + 1;
  const s = data?.pageRequestDto?.size ?? data?.pageable?.pageSize ?? size;
  return { items, total, page: p, size: s };
}

// 상세
export async function fetchMileageItemById(id) {
  const { data } = await axiosInstance.get(`/admin/mileage-items/${id}`);
  return data;
}

// 생성
export async function createMileageItem(payload) {
  // payload: { itemCode, eduMngId }
  const { data } = await axiosInstance.post("/admin/mileage-items/create", payload);
  return data;
}

// 선택 삭제
export async function deleteMileageItems(ids = []) {
  await axiosInstance.post("/admin/mileage-items/delete", ids);
}
