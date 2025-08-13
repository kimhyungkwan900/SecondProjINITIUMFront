import { searchEmployeesByName, fetchProfessors } from "../../../api/user/auth/employeesApi";
import DynamicSelect from "./DynamicSelect";

const EmployeeSelect = ({ filterByProfessorOnly = false, filterByDeptCode = null, ...props }) => {
  const fetchEmployeeOptions = async () => {
    if (filterByProfessorOnly) {
      const professors = await fetchProfessors({ deptCode: filterByDeptCode });
      return professors.map(prof => ({ value: prof.empNo, label: prof.name }));
    } else {
      const employees = await searchEmployeesByName("", { size: 1000, filterByDeptCode });
      return employees.map(emp => ({ value: emp.empNo, label: emp.name }));
    }
  };

  return (
    <DynamicSelect
      {...props}
      fetchOptions={fetchEmployeeOptions}
    />
  );
};

export default EmployeeSelect;