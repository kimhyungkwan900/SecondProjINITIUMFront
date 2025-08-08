import axiosInstance from "../../axiosInstance";


//상담항목 추가
// api/admin/consult/dscsnkind/new
export const addDscsnKind = async (kindInfo) => {
    const response = await axiosInstance.post("/admin/consult/dscsnkind/new", kindInfo);
    return response;
}

//상담항목 조회
// api/admin/consult/dscsnkind
// api/admin/consult/dscsnkind/{page}
export const findDscsnKind = async (searchParams) => {
    const response = await axiosInstance.get("/admin/consult/dscsnkind", { params: searchParams });
    return response.data;
}

//상담항목 수정
// api/admin/consult/dscsnkind/update
export const updateDscsnKind = async (updateInfo) => {
    const response = await axiosInstance.put("/admin/consult/dscsnkind/update", updateInfo);
    return response;
}

//상담항목 삭제
// api/admin/consult/dscsnkind/delete
export const deleteDscsnKind = async (dscsnKindIds) => {
    const response = await axiosInstance.delete("/admin/consult/dscsnkind/delete", { data: dscsnKindIds });
    return response;
}
