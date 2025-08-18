import { useCallback, useEffect, useMemo, useState } from "react";
import { adminUpdateEmployeeInfo, appointInstructor, appointProfessor, appointStaff, fetchEmployeeByNo, fetchEmployees as fetchEmployeesApi, validateEmployeeSearchParams } from "../../../api/user/auth/employeesApi";
import AdminSectionHeader from "../../../component/admin/AdminSectionHeader";
import EmployeeListSearchFilter from "../../../features/admin/employee/EmployeeListSearchFilter";
import EmployeeListTable from "../../../features/admin/employee/EmployeeListTable";
import PageButton from "../../../component/admin/extracurricular/PageButton.jsx";
import EmployeeAdminUpdateForm from "../../../component/admin/employee/EmployeeAdminUpdateForm";
import EmployeeListToolBar from "../../../component/admin/employee/EmployeeListToolbar";

const emptyDetail = {
  empNo: "",
  loginId: "",
  name: "",
  email: "",
  birthDate: "",
  tel: "",
  gender: "",
  subjectCode: "",         // ← 통일 포인트
  employeeStatusCode: "10",
  bankCode: "",
  bankAccountNo: "",
};

export default function EmployeeManagePage() {
  // 검색 조건(입력 바인딩)
  const [filters, setFilters] = useState({
    empNo: "",
    name: "",
    subjectCode: "",
    employeeStatusCode: "",
    gender: "",
    email: "",
  });

  // ★ 실제 조회에 사용하는 확정 필터(조회 버튼 누를 때만 갱신)
  const [appliedFilters, setAppliedFilters] = useState({
    empNo: "",
    name: "",
    subjectCode: "",
    employeeStatusCode: "",
    gender: "",
    email: "",
  });

  // 페이징/정렬
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(15);
  const [sort, setSort] = useState("empNo,asc");

  // 목록 상태
  const [rows, setRows] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  // 우측 패널
  const [mode, setMode] = useState("view"); // 'view' | 'create' | 'edit'
  const [detail, setDetail] = useState(emptyDetail);
  const [selectedNo, setSelectedNo] = useState("");
  const [saving, setSaving] = useState(false);

  // 임용 타입
  const [appointType, setAppointType] = useState("professor"); // 'professor' | 'instructor' | 'staff'

  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  // 목록 조회
  const fetchEmployees = useCallback(
    async (newPage, newSize, newSort, f) => {
      setLoading(true);
      setError("");
      try {
        const validation = validateEmployeeSearchParams(f);
        if (!validation.isValid) {
          setValidationErrors(validation.errors || {});
          setRows([]);
          setTotalElements(0);
          setTotalPages(1);
          return;
        }
        setValidationErrors({});

        const searchParams = { ...f, page: newPage, size: newSize, sort: newSort };
        const data = await fetchEmployeesApi(searchParams);

        setRows(data?.content || []);
        setTotalPages(data?.totalPages || 1);
        setTotalElements(data?.totalElements || 0);
        setPage(newPage);
        setSize(newSize);
        setSort(newSort);
      } catch (e) {
        console.error("직원 목록 조회 실패:", e);
        setError("조회에 실패했습니다. " + (e.message || ""));
        setRows([]);
        setTotalElements(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, setValidationErrors, setRows, setTotalElements, setTotalPages, setPage, setSize, setSort]
  );

  // ★ 최초 1회만 로딩 (자동 조회)
  useEffect(() => {
    fetchEmployees(0, size, sort, appliedFilters);
    setPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 마운트 1회

  const handleSearch = () => {
    // ★ 조회 버튼을 눌러야만 확정된 필터 갱신 및 조회
    setAppliedFilters(filters);
    fetchEmployees(0, size, sort, filters);
    setPage(0);
  };

  const handleResetFilters = () => {
    const reset = {
      empNo: "",
      name: "",
      subjectCode: "",
      employeeStatusCode: "",
      gender: "",
      email: "",
    };
    setFilters(reset);
    setValidationErrors({});
    // ★ 확정 필터도 리셋
    setAppliedFilters(reset);
  };

  const handleCreateMode = () => {
    setMode("create");
    setSelectedNo("");
    setDetail(emptyDetail);
    setError("");
  };

  // 공통 헬퍼
  const compact = (s) => {
    const v = (s ?? "").trim();
    return v.length ? v : null;
  };

  // 임용 DTO (EmployeeAppointDto) — subjectCode 사용
  const buildAppointPayload = (d) => ({
    name: compact(d.name),
    birthDate: compact(d.birthDate),     // "YYYY-MM-DD" or null
    gender: compact(d.gender),
    email: compact(d.email),
    tel: compact(d.tel),
    subjectCode: compact(d.subjectCode), // ← 핵심 유지
    bankCode: compact(d.bankCode),       // DTO에 존재
    bankAccountNo: compact(d.bankAccountNo),
    employeeStatusCode: compact(d.employeeStatusCode ?? "10"),
  });

  // 관리자 수정 DTO — 프로젝트 스펙에 맞춰 subjectCode 사용
  const buildAdminUpdatePayload = (d) => ({
    name: compact(d.name),
    birthDate: compact(d.birthDate),
    gender: compact(d.gender),
    email: compact(d.email),
    tel: compact(d.tel),
    subjectCode: compact(d.subjectCode),
    employeeStatusCode: compact(d.employeeStatusCode ?? "10"),
    bankCode: compact(d.bankCode),
    bankAccountNo: compact(d.bankAccountNo),
  });

  // 저장
  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    setError("");

    try {
      if (mode === "create") {
        // 필수 검증: subjectCode
        const subj = (detail.subjectCode ?? "").trim();
        if (!subj) {
          alert("소속(학과/부서)을 선택해 주세요.");
          return;
        }

        const payload = buildAppointPayload({ ...detail, subjectCode: subj });

        if (appointType === "professor") await appointProfessor(payload);
        else if (appointType === "instructor") await appointInstructor(payload);
        else await appointStaff(payload);

        await fetchEmployees(0, size, sort, appliedFilters);
        setPage(0);
        alert("임용되었습니다.");
        setMode("view");
        setDetail(emptyDetail);
      } else if (mode === "edit" && selectedNo) {
        const payload = buildAdminUpdatePayload(detail);
        console.log("Sending payload for adminUpdateEmployeeInfo:", payload);
        const updated = await adminUpdateEmployeeInfo(selectedNo, payload);
        setDetail((prev) => ({ ...prev, ...updated }));
        await fetchEmployees(page, size, sort, appliedFilters);
        alert("수정되었습니다.");
      } else {
        alert("저장할 모드가 없습니다.");
      }
    } catch (e) {
      console.error("저장 실패:", e);
      setError("저장 중 오류가 발생했습니다: " + (e.message || ""));
    } finally {
      setSaving(false);
    }
  };

  // 행 클릭 → 상세 채우고 수정모드
  const handleRowClick = async (empNo) => {
    try {
      const emp = await fetchEmployeeByNo(empNo);
      setDetail({
        empNo: emp.empNo || "",
        loginId: emp.loginId || "",
        name: emp.name || "",
        email: emp.email || "",
        birthDate: emp.birthDate || "",
        tel: emp.tel || "",
        gender: emp.genderCode ?? "",
        subjectCode: emp.schoolSubjectNo ?? "",
        employeeStatusCode: emp.employeeStatusCode ?? "10",
        bankCode: emp.bankCode || "",
        bankAccountNo: emp.bankAccountNo || "",
      });
      setSelectedNo(empNo);
      setMode("edit");
      setError("");
    } catch (err) {
      console.error("상세 조회 실패:", err);
      setError("상세 조회에 실패했습니다: " + (err.message || ""));
    }
  };

  const handlePageChange = (newPage) => {
    // ★ 확정된 필터로만 페이지 이동 조회
    fetchEmployees(newPage - 1, size, sort, appliedFilters);
  };

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    // ★ 확정된 필터로만 사이즈 변경 조회
    fetchEmployees(0, newSize, sort, appliedFilters);
    setPage(0);
  };

  const handleSortChange = (newSort) => {
    // ★ 확정된 필터로만 정렬 변경 조회
    fetchEmployees(0, size, newSort, appliedFilters);
    setPage(0);
  };

  return (
    <div className="space-y-3">
      <AdminSectionHeader title="직원관리" />

      <EmployeeListToolBar
        onSearch={handleSearch}
        loading={loading}
        onReset={handleResetFilters}
        onCreate={handleCreateMode}
      />

      <div className="grid grid-cols-12 gap-3">
        {/* 좌측: 검색 + 목록 */}
        <div className="col-span-8 space-y-3">
          <EmployeeListSearchFilter
            filters={filters}
            setFilters={setFilters}
            loading={loading}
          />

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <EmployeeListTable
              rows={rows}
              loading={loading}
              selectedNo={selectedNo}
              onRowClick={handleRowClick}
              onSortChange={handleSortChange}
              currentSort={sort}
              variant="bare"
            />

            <div className="px-3 py-2 flex justify-between items-center border-t">
              <div className="text-sm text-gray-600">
                검색결과: <b>{totalElements.toLocaleString()}</b>건
                {loading && " (로딩중...)"}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm">표시개수</span>
                <select
                  className="border border-gray-300 rounded-md px-2 py-1.5 text-sm"
                  value={size}
                  onChange={handleSizeChange}
                  disabled={loading}
                >
                  {[10, 15, 20, 30, 50].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>

                <PageButton
                  totalPages={totalPages}
                  currentPage={page + 1}
                  onPageChange={handlePageChange}
                  disabled={loading}
                  maxVisible={5}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 우측: 폼 */}
        <div className="col-span-4">
          <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-3 self-start sticky top-20">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-gray-700">
                {mode === "create" ? "임용 정보 입력" : selectedNo ? "기존 정보 수정" : "직원 정보"}
              </div>
              <button
                className="bg-[#222E8D] text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-800 disabled:opacity-50"
                onClick={handleSave}
                disabled={saving || (mode === "edit" && !selectedNo)}
              >
                {saving ? "저장중..." : mode === "create" ? "임용" : "저장"}
              </button>
            </div>

            {mode === "create" && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-700">임용구분</span>
                <select
                  className="border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C7A89]"
                  value={appointType}
                  onChange={(e) => setAppointType(e.target.value)}
                >
                  <option value="professor">교수 임용</option>
                  <option value="instructor">강사 고용</option>
                  <option value="staff">직원 고용</option>
                </select>
              </div>
            )}

            <div className="text-sm text-gray-700 bg-gray-50 border rounded px-3 py-2">
              선택된 사번: <b>{selectedNo || "-"}</b>
            </div>

            <EmployeeAdminUpdateForm
              value={detail}
              onChange={setDetail}
              disabled={saving}
              mode={mode === "create" ? "create" : "edit"}
              onSubmit={handleSave}
              showSubmit={false}
              requiredTel={mode === "create"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
