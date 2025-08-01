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
