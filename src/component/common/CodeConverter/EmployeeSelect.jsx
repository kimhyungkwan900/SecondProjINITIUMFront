import { searchEmployeesByName, fetchEmployees } from "../../../api/user/auth/employeesApi";
import DynamicSelect from "./DynamicSelect";

const EmployeeSelect = ({ filterByProfessorOnly = false, filterBySubjectCode = null, ...props }) => {
  const fetchEmployeeOptions = async () => {
    if (filterByProfessorOnly) {
      const professors = await fetchEmployees({ subjectCode: filterBySubjectCode });
      return professors.map(prof => ({ value: prof.empNo, label: prof.name }));
    } else {
      const employees = await searchEmployeesByName("", { size: 1000, subjectCode: filterBySubjectCode });
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