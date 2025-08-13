import { CODEBOOK, getLabel } from "./CodeBook";

export const CodeSelect = ({
  value,
  onChange,
  disabled = false,
  placeholder = "선택하세요",
  category,
  className = "border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400",
  allowEmpty = true,
  required = false,
  excludeCodes = [],
  onlyCodes = [],
  filterByAcademicOnly = false,
  ...props
}) => {
  const options = CODEBOOK[category] || {};
  
  // 필터링된 옵션 생성
  const filteredOptions = Object.entries(options).filter(([code, data]) => {
    if (onlyCodes.length > 0) {
      return onlyCodes.includes(code);
    }
    if (excludeCodes.length > 0) {
      return !excludeCodes.includes(code);
    }
    if (filterByAcademicOnly && category === "SCHOOL_SUBJECT") {
      return data.isAcademic;
    }
    return true;
  });

  return (
    <select
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      className={`${className} ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      required={required}
      {...props}
    >
      {allowEmpty && (
        <option value="" disabled={required}>
          {placeholder}
        </option>
      )}
      {filteredOptions.map(([code, data]) => (
        <option key={code} value={code}>
          {typeof data === 'object' && data !== null ? data.label : data}
        </option>
      ))}
    </select>
  );
};

export const GenderSelect = (props) => (
  <CodeSelect
    {...props}
    category="GENDER"
    placeholder="성별을 선택하세요"
  />
);

export const StudentStatusSelect = (props) => (
  <CodeSelect
    {...props}
    category="STUDENT_STATUS"
    placeholder="학적상태를 선택하세요"
  />
);



export const BankSelect = (props) => (
  <CodeSelect
    {...props}
    category="BANK"
    placeholder="은행을 선택하세요"
  />
);

export const DeptTypeSelect = (props) => (
  <CodeSelect
    {...props}
    category="DEPT_TYPE"
    placeholder="부서구분을 선택하세요"
  />
);

export const UserTypeSelect = (props) => (
  <CodeSelect
    {...props}
    category="USER_TYPE"
    placeholder="사용자 구분을 선택하세요"
  />
);



export const GradeSelect = ({
  value,
  onChange,
  disabled = false,
  className = "border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400",
  required = false,
  allowEmpty = true,
  maxGrade = 4,
  placeholder = "학년을 선택하세요",
  ...props
}) => {
  const grades = Array.from({ length: maxGrade }, (_, i) => i + 1);

  return (
    <select
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      className={`${className} ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      required={required}
      {...props}
    >
      {allowEmpty && (
        <option value="" disabled={required}>
          {placeholder}
        </option>
      )}
      {grades.map((grade) => (
        <option key={grade} value={grade.toString()}>
          {grade}학년
        </option>
      ))}
    </select>
  );
};

export const CodeDisplay = ({
  category,
  code,
  fallback = "미지정",
  className = "",
  render = null
}) => {
  const label = getLabel(category, code, fallback);
  
  if (render && typeof render === 'function') {
    return render(label, code);
  }
  
  return <span className={className}>{label}</span>;
};

export default CodeSelect;