import { useCallback, useEffect, useMemo, useState } from "react";
import {
  adminUpdateStudentInfo,
  enrollStudent,
  fetchStudentByNo,
  fetchStudents as fetchStudentsApi,
  validateSearchParams
} from "../../../api/user/auth/studentsApi";
import AdminSectionHeader from "../../../component/admin/AdminSectionHeader";
import TextInput from "../../../component/common/TextInput";
import StudentListTable from "../../../features/admin/students/StudentListTable";
import PageButton from "../../../component/admin/extracurricular/PagaButton";
import StudentAdminUpdateForm from "../../../component/admin/student/StudentAdminUpdateForm";
import StudentListSearchFilter from "../../../features/admin/students/StudentListSearchFilter";

const emptyDetail = {
  studentNo: "",
  name: "",
  email: "",
  birthDate: "",
  admissionDate: "",
  gender: "",
  grade: "",
  clubCode: "",
  universityCode: "",
  schoolSubjectCode: "",
  advisorNo: "",
  bankAccountNo: "",
  studentStatusCode: "",
};

export default function StudentManagePage() {
  // 검색 조건 - 백엔드 DTO와 일치하도록 확장
  const [filters, setFilters] = useState({
    studentNo: "",
    name: "",
    universityCode: "",
    schoolSubjectCode: "",
    schoolSubjectCodeSe: "", // 학과 코드 그룹
    clubCode: "",
    studentStatusCode: "",
    studentStatusCodeSe: "", // 학적 상태 코드 그룹
    grade: "",
    genderCode: "",
    genderCodeSe: "", // 성별 코드 그룹
    advisorId: "",
    email: "",
    admissionDateFrom: "",
    admissionDateTo: "",
  });

  // 페이징 상태
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(15);
  const [sort, setSort] = useState("studentNo,asc");

  // 데이터 상태
  const [rows, setRows] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  // 폼 상태
  const [mode, setMode] = useState("view"); // 'view' | 'create' | 'edit'
  const [detail, setDetail] = useState(emptyDetail);
  const [selectedNo, setSelectedNo] = useState("");
  const [saving, setSaving] = useState(false);

  // 에러 상태
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  // 학생 목록 조회
  const fetchStudents = useCallback(async (newPage = page, newSize = size, newSort = sort, f = filters) => {
    setLoading(true);
    setError("");

    try {
      // 클라이언트 측 유효성 검증
      const validation = validateSearchParams(f);
      if (!validation.isValid) {
        setValidationErrors(validation.errors);
        setLoading(false);
        return;
      }

      setValidationErrors({});

      const searchParams = {
        ...f,
        page: newPage,
        size: newSize,
        sort: newSort
      };

      console.log("[학생 검색 요청]", searchParams);

      const data = await fetchStudentsApi(searchParams);

      setRows(data.content || []);
      setTotalPages(data.totalPages || 1);
      setTotalElements(data.totalElements || 0);
      setPage(newPage);
      setSize(newSize);
      setSort(newSort);

      console.log("[학생 검색 결과]", {
        totalElements: data.totalElements,
        currentPage: data.number,
        totalPages: data.totalPages
      });

    } catch (e) {
      console.error("학생 목록 조회 실패:", e);
      setError("조회에 실패했습니다. " + (e.message || ""));
      setRows([]);
      setTotalElements(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [page, size, sort, filters]);

  // 초기 로딩 및 필터 변경 시 자동 검색
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchStudents(0, size, sort, filters);
    }, 300); // 디바운싱

    return () => clearTimeout(timeoutId);
  }, [filters, size, sort]);

  // 수동 검색
  const handleSearch = () => {
    fetchStudents(0, size, sort, filters);
    setPage(0);
  };

  // 검색 조건 초기화
  const handleResetFilters = () => {
    const resetFilters = {
      studentNo: "",
      name: "",
      universityCode: "",
      schoolSubjectCode: "",
      schoolSubjectCodeSe: "",
      clubCode: "",
      studentStatusCode: "",
      studentStatusCodeSe: "",
      grade: "",
      genderCode: "",
      genderCodeSe: "",
      advisorId: "",
      email: "",
      admissionDateFrom: "",
      admissionDateTo: "",
    };
    setFilters(resetFilters);
    setValidationErrors({});
  };

  // 신규 등록 모드
  const handleNew = () => {
    setMode("create");
    setSelectedNo("");
    setDetail(emptyDetail);
    setError("");
  };

  // 저장 처리
  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    setError("");

    try {
      if (mode === "create") {
        const payload = {
          name: detail.name,
          schoolSubjectCode: detail.schoolSubjectCode, // 오타 수정
          gender: detail.gender,
          email: detail.email,
          bankAccountNumber: detail.bankAccountNo,
          grade: detail.grade,
          advisorNo: detail.advisorNo,
          birthDate: detail.birthDate,
          admissionDate: detail.admissionDate,
          universityCode: detail.universityCode,
          studentStatusCode: detail.studentStatusCode,
          clubCode: detail.clubCode,
        };

        console.log("[학생 등록 요청]", payload);
        const created = await enrollStudent(payload);

        setSelectedNo(created?.studentNo || "");
        setDetail((prev) => ({
          ...prev,
          studentNo: created?.studentNo || prev.studentNo
        }));
        setMode("edit");

        // 등록 후 목록 새로고침
        await fetchStudents(0, size, sort, filters);
        setPage(0);

        alert("등록되었습니다.");

      } else if (mode === "edit" && selectedNo) {
        const payload = {
          name: detail.name,
          email: detail.email,
          birthDate: detail.birthDate,
          admissionDate: detail.admissionDate,
          gender: detail.gender,
          grade: detail.grade,
          clubCode: detail.clubCode,
          universityCode: detail.universityCode,
          schoolSubjectCode: detail.schoolSubjectCode,
          advisorNo: detail.advisorNo,
          bankAccountNo: detail.bankAccountNo,
          studentStatusCode: detail.studentStatusCode,
        };

        console.log("[학생 수정 요청]", { studentNo: selectedNo, payload });
        await adminUpdateStudentInfo(selectedNo, payload);

        // 수정 후 목록 새로고침
        await fetchStudents(page, size, sort, filters);

        alert("수정되었습니다.");
      }
    } catch (e) {
      console.error("저장 실패:", e);
      setError("저장 중 오류가 발생했습니다: " + (e.message || ""));
    } finally {
      setSaving(false);
    }
  };

  // 학생 상세 조회
  const handleRowClick = async (studentNo) => {
    try {
      console.log("[학생 상세 조회 요청]", studentNo);
      const s = await fetchStudentByNo(studentNo);

      setDetail({
        studentNo: s.studentNo || "",
        name: s.name || "",
        email: s.email || "",
        birthDate: s.birthDate || "",
        admissionDate: s.admissionDate || "",
        gender: s.genderCode || "",
        grade: s.grade || "",
        clubCode: s.clubCode || "",
        universityCode: s.universityCode || "",
        schoolSubjectCode: s.schoolSubjectCode || "",
        advisorNo: s.advisorId || "",
        bankAccountNo: s.bankAccountNo || "",
        studentStatusCode: s.studentStatusCode || "",
      });

      setSelectedNo(studentNo);
      setMode("edit");
      setError("");

      console.log("[학생 상세 조회 완료]", s);

    } catch (e) {
      console.error("상세 조회 실패:", e);
      setError("상세 조회에 실패했습니다: " + (e.message || ""));
    }
  };

  // 페이지 변경
  const handlePageChange = (newPage) => {
    fetchStudents(newPage - 1, size, sort, filters);
  };

  // 페이지 크기 변경
  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    fetchStudents(0, newSize, sort, filters);
    setPage(0);
  };

  // 정렬 변경
  const handleSortChange = (newSort) => {
    fetchStudents(0, size, newSort, filters);
    setPage(0);
  };

  // 필터 업데이트 헬퍼
  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // 비활성화 상태
  const disabledAll = useMemo(() => saving, [saving]);

  // 검색 조건이 있는지 확인
  const hasSearchCondition = useMemo(() => {
    return Object.entries(filters).some(([key, value]) =>
      value !== "" && value !== null && value !== undefined
    );
  }, [filters]);

  return (
    <div className="space-y-3">
      <AdminSectionHeader title="학생관리" />

      {/* 에러 메시지 */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* 유효성 검증 에러 */}
      {Object.keys(validationErrors).length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
          <ul className="list-disc list-inside">
            {Object.entries(validationErrors).map(([field, message]) => (
              <li key={field}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 액션 버튼들 */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded bg-gray-800 text-white disabled:opacity-50"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "조회중..." : "조회"}
          </button>
          <button
            className="px-3 py-1 rounded border hover:bg-gray-50"
            onClick={handleResetFilters}
          >
            초기화
          </button>
          <button
            className="px-3 py-1 rounded border hover:bg-gray-50"
            onClick={handleNew}
          >
            신규
          </button>
          <button
            className="px-3 py-1 rounded bg-[#222E8D] text-white disabled:opacity-50 hover:bg-blue-800 transition"
            onClick={handleSave}
            disabled={disabledAll}
          >
            {saving ? "저장중..." : "저장"}
          </button>
        </div>
        <div className="text-sm text-gray-600">
          {hasSearchCondition && `검색 조건 적용됨`}
        </div>
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className="grid grid-cols-12 gap-3">
        {/* 검색 필터 */}
        <div className="col-span-8 bg-white border border-gray-200 rounded-lg p-3">
          <StudentListSearchFilter
            filters={filters}
            setFilters={setFilters}
            handleSearch={handleSearch}
            size={size}
            handleSizeChange={handleSizeChange}
            loading={loading}
          />
        </div>

        {/* 선택된 학생 정보 */}
        <div className="col-span-4 bg-white border border-gray-200 rounded-lg p-3">
          <div className="text-sm text-gray-700">
            선택된 학번: <b>{selectedNo || "-"}</b>
          </div>
        </div>
      </div>

      {/* 테이블 및 폼 영역 */}
      <div className="grid grid-cols-12 gap-3">
        {/* 학생 목록 테이블 */}
        <div className="col-span-8">
          <StudentListTable
            rows={rows}
            loading={loading}
            selectedNo={selectedNo}
            onRowClick={handleRowClick}
            onSortChange={handleSortChange}
            currentSort={sort}
          />

          {/* 페이징 */}
          <div className="mt-3 flex justify-between items-center">
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
              />
            </div>
          </div>
        </div>

        {/* 학생 정보 수정 폼 */}
        <div className="col-span-4">
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="text-sm font-semibold text-gray-700 mb-2">
              {mode === "create" ? "신규 등록" : selectedNo ? "학생 정보 수정" : "학생 정보"}
            </div>
            <StudentAdminUpdateForm
              value={detail}
              onChange={setDetail}
              disabled={disabledAll}
              mode={mode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}