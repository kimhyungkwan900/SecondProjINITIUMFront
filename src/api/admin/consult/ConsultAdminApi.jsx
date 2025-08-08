import axios from "axios"

//상담항목 추가
// api/admin/consult/dscsnkind/new
export const addDscsnKind = async (kindInfo) => {
    const response = await axios.post("api/admin/consult/dscsnkind/new", kindInfo,);

    return response;
}

//상담항목 조회
// api/admin/consult/dscsnkind
// api/admin/consult/dscsnkind/{page}
export const findDscsnKind = async (searchParams) => {
    const response = await axios.get("api/admin/consult/dscsnkind", {params: searchParams});

    return response.data;
}

//상담항목 수정
// api/admin/consult/dscsnkind/update
export const updateDscsnKind = async (updateInfo) => {
    const response = await axios.put("api/admin/consult/dscsnkind/update", updateInfo);

    return response;
}

//상담항목 삭제
// api/admin/consult/dscsnkind/delete
export const deleteDscsnKind = async (dscsnKindIds) => {
    const response = await axios.delete("api/admin/consult/dscsnkind/delete", dscsnKindIds);

    return response;
}