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
  ...props
}) => {
  const options = CODEBOOK[category] || {};
  
  // 필터링된 옵션 생성
  const filteredOptions = Object.entries(options).filter(([code]) => {
    if (onlyCodes.length > 0) {
      return onlyCodes.includes(code);
    }
    if (excludeCodes.length > 0) {
      return !excludeCodes.includes(code);
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
      {filteredOptions.map(([code, label]) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  );
};

export const GenderSelect = (props) => (
  <CodeSelect
    {...props}
    category="gender"
    placeholder="성별을 선택하세요"
  />
);

export const StudentStatusSelect = (props) => (
  <CodeSelect
    {...props}
    category="studentStatus"
    placeholder="학적상태를 선택하세요"
  />
);

export const SchoolSubjectSelect = (props) => (
  <CodeSelect
    {...props}
    category="schoolSubject"
    placeholder="학과를 선택하세요"
  />
);

export const BankSelect = (props) => (
  <CodeSelect
    {...props}
    category="bank"
    placeholder="은행을 선택하세요"
  />
);

export const DeptTypeSelect = (props) => (
  <CodeSelect
    {...props}
    category="deptType"
    placeholder="부서구분을 선택하세요"
  />
);

export const UserTypeSelect = (props) => (
  <CodeSelect
    {...props}
    category="userType"
    placeholder="사용자 구분을 선택하세요"
  />
);

export const GradeSelect = ({ 
  value, 
  onChange, 
  disabled = false, 
  className = "border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400",
  required = false,
  maxGrade = 4,
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
      <option value="" disabled={required}>
        학년을 선택하세요
      </option>
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