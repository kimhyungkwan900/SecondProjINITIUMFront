
import { buildParamsWithSort, unwrap } from "../../utils/apiUtils";
import axiosInstance from "../axiosInstance";

export const fetchUniversities = async (params = {}, { signal } = {}) => {
  try {
    const { cleaned, serializer } = buildParamsWithSort({
      kw: params.kw ?? params.keyword ?? "",
      ...params,
    });

    const { data } = await axiosInstance.get("/univ", {
      params: cleaned,
      paramsSerializer: serializer,
      signal,
    });
    return data;
  } catch (err) {
    unwrap(err);
  }
};

export const fetchUniversityByCode = async (univCd, { signal } = {}) => {
  try {
    if (!univCd?.trim()) throw new Error("대학코드(univCd)는 필수입니다.");
    const { data } = await axiosInstance.get(
      `/univ/${encodeURIComponent(univCd)}`,
      { signal }
    );
    return data; 
  } catch (err) {
    unwrap(err);
  }
};

export const fetchUniversityName = async (univCd, { signal } = {}) => {
  try {
    if (!univCd?.trim()) throw new Error("대학코드(univCd)는 필수입니다.");
    const { data } = await axiosInstance.get(
      `/univ/${encodeURIComponent(univCd)}/name`,
      { signal }
    );
    return data?.universityName ?? "";
  } catch (err) {
    unwrap(err);
  }
};

export const fetchUniversityOptions = async (kw = "", { signal } = {}) => {
  const list = await fetchUniversities({ kw }, { signal });
  return (list || []).map((u) => ({
    value: u.universityCode,
    label: u.universityName,
  }));
};
