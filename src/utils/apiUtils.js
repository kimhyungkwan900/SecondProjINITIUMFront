export function unwrap(err) {
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
export function cleanParams(obj = {}) {
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
export function buildParamsWithSort(params) {
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

export const handleApiError = (error) => {
  const isDev = import.meta.env.MODE === 'development'; // Vite 방식
  
  let message = '서버 오류가 발생했습니다.';

  if (error.response) {
    message = error.response.data?.message 
      || (typeof error.response.data === 'string' ? error.response.data : message);
    if (isDev) console.error(`API Error: ${error.response.status} - ${message}`);
  } else if (error.request) {
    message = '네트워크 오류가 발생했습니다.';
    if (isDev) console.error('API 요청 실패: 응답 없음');
  } else {
    message = '알 수 없는 오류가 발생했습니다.';
    if (isDev) console.error('Error', error.message);
  }
  
  alert(message);
};