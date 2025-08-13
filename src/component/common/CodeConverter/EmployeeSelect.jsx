import { fetchEmployees, fetchProfessorsSimple } from "../../../api/user/auth/employeesApi";
import DynamicSelect from "./DynamicSelect";

const EmployeeSelect = ({ filterByProfessorOnly = false, filterBySubjectCode = null, ...props }) => {
  const fetchEmployeeOptions = async () => {
    let employees;
    if (filterByProfessorOnly) {
      employees = await fetchProfessorsSimple(); // fetch all professors
    } else {
      const data = await fetchEmployees({ subjectCode: filterBySubjectCode, size: 1000 });
      employees = data.content;
    }
    return employees.map(item => ({ value: item.empNo, label: item.name }));
  };

  return (
    <DynamicSelect
      {...props}
      fetchOptions={fetchEmployeeOptions}
    />
  );
};

export default EmployeeSelect;