export const handleApiError = (error) => {
  if (error.response) {
    console.error(`API Error: ${error.response.status} - ${error.response.data.message || '오류 발생'}`);
    alert(error.response.data.message || '서버 오류가 발생했습니다.');
  } else if (error.request) {
    console.error('API 요청 실패: 응답 없음');
    alert('네트워크 오류가 발생했습니다.');
  } else {
    console.error('Error', error.message);
    alert('알 수 없는 오류가 발생했습니다.');
  }
};