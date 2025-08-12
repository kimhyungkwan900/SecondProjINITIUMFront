import axiosInstance from "../../axiosInstance";

/** 공통: 에러 표준화 */
function unwrap(err) {
  if (err?.response) {
    const { status, data } = err.response;
    const msg = data?.message || data?.error || err.message || "요청 실패";
    const e = new Error(msg);
    e.status = status;
    e.data = data;
    throw e;
  }
  throw err;
}

/** 공통: 파라미터 정리 (trim + 빈값 제거) */
function cleanParams(obj = {}) {
  const out = {};
  Object.entries(obj).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (typeof v === "string") {
      const t = v.trim();
      if (t === "") return;
      out[k] = t;
    } else {
      out[k] = v;
    }
  });
  return out;
}

/** 공통: sort 직렬화 지원 (문자열/배열 모두 OK) */
function buildParamsWithSort(params) {
  const { sort, ...rest } = params || {};
  const cleaned = cleanParams(rest);

  // axios paramsSerializer로 sort만 별도 직렬화
  const serializer = (p) => {
    const usp = new URLSearchParams();
    Object.entries(p).forEach(([k, v]) => {
      if (Array.isArray(v)) {
        v.forEach((item) => usp.append(k, String(item)));
      } else if (v !== undefined && v !== null) {
        usp.append(k, String(v));
      }
    });
    // sort 직렬화
    if (sort) {
      (Array.isArray(sort) ? sort : [sort]).forEach((s) => usp.append("sort", s));
    }
    return usp.toString();
  };

  return { cleaned, serializer };
}

// ---------- 단건 ----------
export const fetchEmployeeByNo = async (empNo, { signal } = {}) => {
  try {
    if (!empNo?.trim()) throw new Error("사번(empNo)은 필수입니다.");
    const { data } = await axiosInstance.get(`/employees/${encodeURIComponent(empNo)}`, { signal });
    return data;
  } catch (err) {
    unwrap(err);
  }
};

// ---------- 임용(신규 등록) ----------
export const appointProfessor = async (dto, { signal } = {}) => {
  try {
    const { data } = await axiosInstance.post("/employees/appoint/professor", dto, { signal });
    return data;
  } catch (err) {
    unwrap(err);
  }
};

export const appointInstructor = async (dto, { signal } = {}) => {
  try {
    const { data } = await axiosInstance.post("/employees/appoint/instructor", dto, { signal });
    return data;
  } catch (err) {
    unwrap(err);
  }
};

export const appointStaff = async (dto, { signal } = {}) => {
  try {
    const { data } = await axiosInstance.post("/employees/appoint/staff", dto, { signal });
    return data;
  } catch (err) {
    unwrap(err);
  }
};

// ---------- 정보 수정 ----------
export const adminUpdateEmployeeInfo = async (empNo, dto, { signal } = {}) => {
  try {
    const { data } = await axiosInstance.put(`/employees/${encodeURIComponent(empNo)}/admin-info`, dto, { signal });
    return data;
  } catch (err) {
    unwrap(err);
  }
};

export const updateMyInfo = async (empNo, dto, { signal } = {}) => {
  try {
    const { data } = await axiosInstance.put(`/employees/${encodeURIComponent(empNo)}/my-info`, dto, { signal });
    return data;
  } catch (err) {
    unwrap(err);
  }
};

// ---------- 상태 변경 ----------
export const changeEmployeeStatus = async (empNo, statusCode, { signal } = {}) => {
  try {
    const { data } = await axiosInstance.patch(
      `/employees/${encodeURIComponent(empNo)}/status`,
      { statusCode },
      { signal }
    );
    return data;
  } catch (err) {
    unwrap(err);
  }
};

// ---------- 검색 & 페이징 ----------
export const fetchEmployees = async (params = {}, { signal } = {}) => {
  try {
    const { cleaned, serializer } = buildParamsWithSort({
      page: 0,
      size: 15,
      ...params,
    });

    const { data } = await axiosInstance.get("/employees", {
      params: cleaned,
      paramsSerializer: serializer,
      signal,
    });
    return data;
  } catch (err) {
    unwrap(err);
  }
};

// ---------- 이름 검색(자동완성 전용) ----------
export const searchEmployeesByName = async (name, { size = 10, signal } = {}) => {
  const data = await fetchEmployees({ name, page: 0, size }, { signal });
  return (data?.content || []).map((e) => ({ empNo: e.empNo, name: e.name }));
};
