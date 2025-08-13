import { fetchUniversityOptions } from "../../../api/common/universityApi";
import DynamicSelect from "./DynamicSelect";

const UniversitySelect = (props) => {
  return (
    <DynamicSelect
      {...props}
      fetchOptions={fetchUniversityOptions}
    />
  );
};

export default UniversitySelect;