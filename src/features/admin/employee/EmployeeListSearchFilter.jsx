import CodeSelect, { GenderSelect } from "../../../component/common/CodeConverter/CodeSelect";
import SchoolSubjectSelect from "../../../component/common/CodeConverter/SchoolSubjectSelect";
import TextInput from "../../../component/common/TextInput";

export default function EmployeeListSearchFilter({
  filters,
  setFilters,
  loading = false,
}) {
  const update = (key) => (e) =>
    setFilters((prev) => ({ ...prev, [key]: e.target?.value ?? e }));

  // 공통 스타일 (StudentListSearchFilter 기준)
  const controlBase =
    "w-full min-w-0 h-10 px-3 text-sm rounded-md border border-gray-300 " +
    "bg-white leading-5 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 " +
    "disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed";

  const inputCls  = controlBase + " py-2";
  const selectCls =
    controlBase +
    " pr-8 appearance-none bg-no-repeat bg-[right_0.65rem_center] " +
    'bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath fill=\'%236b7280\' d=\'M6 8L0 0h12z\'/%3E%3C/svg%3E")]';

  const labelCls = "block text-xs font-medium text-gray-700 mb-1 truncate";

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      {/* 1행: 사번 / 이름 / 직원상태 / 성별 / 소속 / 이메일  */}
      <div className="grid grid-cols-12 gap-x-3 gap-y-4">
        <div className="col-span-2 min-w-0">
          <label className={labelCls}>사번</label>
          <TextInput
            placeholder="사번 입력"
            value={filters.empNo ?? ""}
            onChange={update("empNo")}
            disabled={loading}
            className={inputCls}
          />
        </div>

        <div className="col-span-2 min-w-0">
          <label className={labelCls}>이름</label>
          <TextInput
            placeholder="이름 입력"
            value={filters.name ?? ""}
            onChange={update("name")}
            disabled={loading}
            className={inputCls}
          />
        </div>

        <div className="col-span-2 min-w-0">
          <label className={labelCls}>직원상태</label>
          <CodeSelect
            category="EMPLOYEE_STATUS" // AM0120
            value={filters.employeeStatus ?? ""}
            onChange={update("employeeStatus")}
            disabled={loading}
            className={selectCls}
            placeholder="직원상태 선택"
            allowEmpty
          />
        </div>

        <div className="col-span-2 min-w-0">
          <label className={labelCls}>성별</label>
          <GenderSelect
            value={filters.gender ?? ""}
            onChange={update("gender")}
            disabled={loading}
            className={selectCls}
            placeholder="성별 선택"
            allowEmpty
          />
        </div>

        <div className="col-span-2 min-w-0">
          <label className={labelCls}>소속(학과/부서)</label>
          <SchoolSubjectSelect
            value={filters.subjectCode ?? ""}
            onChange={update("subjectCode")}
            disabled={loading}
            className={selectCls}
            placeholder="학과/부서 선택"
            allowEmpty
          />
        </div>

        <div className="col-span-2 min-w-0">
          <label className={labelCls}>이메일</label>
          <TextInput
            type="email"
            placeholder="이메일 입력"
            value={filters.email ?? ""}
            onChange={update("email")}
            disabled={loading}
            className={inputCls}
          />
        </div>
      </div>
    </div>
  );
}