import useEmployeeInfo from "../../hooks/useEmployeeInfo";

const EmployeeDisplay = ({ empNo }) => {
  const { employee, loading, error } = useEmployeeInfo(empNo);

  if (!empNo) return <span>-</span>;
  if (loading) return <span>조회중...</span>;
  if (error || !employee) return <span>알수없음</span>;

  return <span>{employee.name}</span>;
};

export default EmployeeDisplay;
