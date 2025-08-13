import DynamicSelect from "./DynamicSelect";
import { fetchSchoolSubjectOptions } from "../../../api/common/scbjtApi";

const SchoolSubjectSelect = ({ filterByAcademicOnly = false, ...props }) => {
  const fetchOptions = async () => {
    const allOptions = await fetchSchoolSubjectOptions();
    let filteredOptions = allOptions;

    if (filterByAcademicOnly) {
      // isAcademic 속성이 있다고 가정하고 필터링
      filteredOptions = allOptions.filter(item => item.isAcademic);
    }

    return filteredOptions.map(item => ({
      value: item.subjectCode,
      label: item.subjectName
    }));
  };

  return (
    <DynamicSelect
      {...props}
      fetchOptions={fetchOptions}
    />
  );
};

export default SchoolSubjectSelect;