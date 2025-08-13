import { GenderSelect, GradeSelect, StudentStatusSelect } from "../../../component/common/CodeConverter/CodeSelect";
import EmployeeSelect from "../../../component/common/CodeConverter/EmployeeSelect";
import TextInput from "../../../component/common/TextInput";
import SchoolSubjectSelect from "../../../component/common/CodeConverter/SchoolSubjectSelect";

export default function StudentListSearchFilter({
  filters,
  setFilters,
  loading = false,
}) {
  const update = (key) => (e) =>
    setFilters((prev) => ({ ...prev, [key]: e.target?.value ?? e }));

  const updateDate = (key) => (e) =>
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));

  // 공통 스타일 (모든 컨트롤의 기본값)
  const controlBase =
    "w-full min-w-0 h-10 px-3 text-sm rounded-md border border-gray-300 " +
    "bg-white leading-5 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 " +
    "disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed";

  // 타입별 세부 보정
  const inputCls = controlBase + " py-2"; // text/email 등
  // 셀렉트는 기본 화살표를 숨기고 일관된 padding을 위해 pr-8 + 커스텀 caret
  const selectCls =
    controlBase +
    " pr-8 appearance-none bg-no-repeat bg-[right_0.65rem_center] " +
    'bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath fill=\'%236b7280\' d=\'M6 8L0 0h12z\'/%3E%3C/svg%3E")]';

  // 날짜 인풋은 브라우저별 기본 라인높이가 달라서 pseudo 요소로 보정
  const dateCls =
    controlBase +
    " py-0 " +
    "[&::-webkit-datetime-edit]:leading-[2.5rem] " + // 값 영역 높이 맞춤
    "[&::-webkit-datetime-edit-fields-wrapper]:p-0 " +
    "[&::-webkit-calendar-picker-indicator]:opacity-70 " +
    "[&::-webkit-calendar-picker-indicator]:cursor-pointer";

  const labelCls = "block text-xs font-medium text-gray-700 mb-1 truncate";

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      {/* 1행: 학번 / 이름 / 학과 / 이메일 / 학적상태 */}
      <div className="grid grid-cols-12 gap-x-3 gap-y-4 mb-4">
        <div className="col-span-2 min-w-0">
          <label className={labelCls}>학번</label>
          <TextInput
            placeholder="학번 입력"
            value={filters.studentNo ?? ""}
            onChange={update("studentNo")}
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
          <label className={labelCls}>학년</label>
          <GradeSelect
            value={filters.grade ?? ""}
            onChange={update("grade")}
            disabled={loading}
            className={selectCls}
            placeholder="학년 선택"
            allowEmpty
          />
        </div>

        <div className="col-span-2 min-w-0">
          <label className={labelCls}>성별</label>
          <GenderSelect
            value={filters.genderCode ?? ""}
            onChange={update("genderCode")}
            disabled={loading}
            className={selectCls}
            placeholder="성별 선택"
            allowEmpty
          />
        </div>

        <div className="col-span-2 min-w-0">
          <label className={labelCls}>입학일자 (시작)</label>
          <TextInput
            type="date"
            value={filters.admissionDateFrom ?? ""}
            onChange={updateDate("admissionDateFrom")}
            disabled={loading}
            className={dateCls}
          />
        </div>

        <div className="col-span-2 min-w-0">
          <label className={labelCls}>입학일자 (끝)</label>
          <TextInput
            type="date"
            value={filters.admissionDateTo ?? ""}
            onChange={updateDate("admissionDateTo")}
            disabled={loading}
            className={dateCls}
          />
        </div>
      </div>

      {/* 2행: 학년 / 성별 / 지도교수 / 입학일자(시작) / 입학일자(끝) */}
      <div className="grid grid-cols-12 gap-x-3 gap-y-4">
        

        <div className="col-span-3 min-w-0">
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

        <div className="col-span-3 min-w-0">
          <label className={labelCls}>학적상태</label>
          <StudentStatusSelect
            value={filters.studentStatusCode ?? ""}
            onChange={update("studentStatusCode")}
            disabled={loading}
            className={selectCls}
            placeholder="학적상태 선택"
            allowEmpty
          />
        </div>

        <div className="col-span-3 min-w-0">
          <label className={labelCls}>학과</label>
          <SchoolSubjectSelect
            value={filters.subjectCode ?? ""}
            onChange={update("subjectCode")}
            disabled={loading}
            className={selectCls}
            placeholder="학과 선택"
            allowEmpty
          />
        </div>

        <div className="col-span-3 min-w-0">
          <label className={labelCls}>지도교수</label>
          <EmployeeSelect
            value={filters.advisorId ?? ""}
            onChange={update("advisorId")}
            disabled={loading}
            className={selectCls}
            placeholder="지도교수 선택"
            allowEmpty
            filterByProfessorOnly
            filterByDeptCode={filters.subjectCode}
          />
        </div>
      </div>
    </div>
  );
}