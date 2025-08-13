// 교수 여부 확인 헬퍼 함수
export const isProfessor = (employeeId) => {
  return employeeId && employeeId.startsWith('P');
};

// 교직원 타입 확인 헬퍼 함수
export const getEmployeeType = (employeeId) => {
  if (!employeeId) return 'unknown';
  
  const prefix = employeeId.charAt(0);
  switch (prefix) {
    case 'P': return 'professor'; // 교수
    case 'S': return 'staff';     // 직원
    case 'K': return 'lecturer';  // 강사
    default: return 'unknown';
  }
};

// 교직원 타입별 표시명 반환
export const getEmployeeTypeLabel = (employeeId) => {
  const type = getEmployeeType(employeeId);
  const labels = {
    professor: '교수',
    staff: '직원',
    lecturer: '강사',
    unknown: '기타'
  };
  return labels[type] || '기타';
};
