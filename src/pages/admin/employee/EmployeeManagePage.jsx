import { useCallback, useEffect, useMemo, useState } from "react";
import { adminUpdateEmployeeInfo, appointInstructor, appointProfessor, appointStaff, fetchEmployeeByNo, fetchEmployees as fetchEmployeesApi, validateEmployeeSearchParams } from "../../../api/user/auth/employeesApi";
import AdminSectionHeader from "../../../component/admin/AdminSectionHeader";
import EmployeeListSearchFilter from "../../../features/admin/employee/EmployeeListSearchFilter";
import EmployeeListTable from "../../../features/admin/employee/EmployeeListTable";
import PageButton from "../../../component/admin/extracurricular/PagaButton";
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
  employeeStatus: "10",
  bankCode: "",
  bankAccountNo: "",
};

export default function EmployeeManagePage() {
  // 검색 조건
  const [filters, setFilters] = useState({
    empNo: "",
    name: "",
    subjectCode: "",
    employeeStatus: "",
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
    async (newPage = page, newSize = size, newSort = sort, f = filters) => {
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
    [page, size, sort, filters]
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchEmployees(0, size, sort, filters);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [filters, size, sort, fetchEmployees]);

  const handleSearch = () => {
    fetchEmployees(0, size, sort, filters);
    setPage(0);
  };

  const handleResetFilters = () => {
    setFilters({
      empNo: "",
      name: "",
      subjectCode: "",
      employeeStatus: "",
      gender: "",
      email: "",
    });
    setValidationErrors({});
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
    subjectCode: compact(d.subjectCode), // ← 핵심 변경
    bankCode: compact(d.bankCode),       // DTO에 존재
    bankAccountNo: compact(d.bankAccountNo),
    employeeStatus: compact(d.employeeStatus ?? "10"),
  });

  // 관리자 수정 DTO — 프로젝트 스펙에 맞춰 subjectCode 사용(백엔드 DTO와 일치 필요)
  const buildAdminUpdatePayload = (d) => ({
    name: compact(d.name),
    birthDate: compact(d.birthDate),
    gender: compact(d.gender),
    email: compact(d.email),
    tel: compact(d.tel),
    subjectCode: compact(d.subjectCode),     // ← 통일
    employeeStatus: compact(d.employeeStatus ?? "10"), // 백엔드가 empStatus를 요구하면 여기만 empStatus로 교체
    bankCode: compact(d.bankCode),           // 백엔드 미지원 시 제거
    bankAccountNo: compact(d.bankAccountNo), // 백엔드 미지원 시 제거
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

        await fetchEmployees(0, size, sort, filters);
        setPage(0);
        alert("임용되었습니다.");
        setMode("view");
        setDetail(emptyDetail);
      } else if (mode === "edit" && selectedNo) {
        const payload = buildAdminUpdatePayload(detail);
        const updated = await adminUpdateEmployeeInfo(selectedNo, payload);
        setDetail((prev) => ({ ...prev, ...updated }));
        await fetchEmployees(page, size, sort, filters);
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
      const e = await fetchEmployeeByNo(empNo);
      setDetail({
        empNo: e.empNo || "",
        loginId: e.loginId || "",
        name: e.name || "",
        email: e.email || "",
        birthDate: e.birthDate || "",
        tel: e.tel || "",
        gender: e.gender ?? e.genderCode ?? "",
        subjectCode: e.subjectCode ?? e.schoolSubjectNo ?? "", // ← 양쪽 키 수용
        employeeStatus: e.employeeStatus ?? e.employeeStatusCode ?? "10",
        bankCode: e.bankCode || "",
        bankAccountNo: e.bankAccountNo || "",
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
    fetchEmployees(newPage - 1, size, sort, filters);
  };

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    fetchEmployees(0, newSize, sort, filters);
    setPage(0);
  };

  const handleSortChange = (newSort) => {
    fetchEmployees(0, size, newSort, filters);
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
                  className="w-auto rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                className="px-3 py-1 rounded bg-[#222E8D] text-white disabled:opacity-50"
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
                  className="w-auto rounded border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
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

            {/* 현재 사용 폼에 맞춰 유지 (공용 폼 사용 시 subjectCode로 바인딩) */}
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