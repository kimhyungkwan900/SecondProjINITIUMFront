import { useCallback, useEffect, useMemo, useState } from "react";
import {
  adminUpdateStudentInfo,
  enrollStudent,
  fetchStudentByNo,
  fetchStudents as fetchStudentsApi,
  validateSearchParams
} from "../../../api/user/auth/studentsApi";
import AdminSectionHeader from "../../../component/admin/AdminSectionHeader";
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
  genderCode: "",
  grade: "",
  clubCode: "",
  universityCode: "",
  schoolSubjectCode: "",
  advisorNo: "",
  bankCode: "",
  bankAccountNo: "",
  studentStatusCode: "",
};

export default function StudentManagePage() {
  // 검색 조건
  const [filters, setFilters] = useState({
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
  });

  // 페이징
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(15);
  const [sort, setSort] = useState("studentNo,asc");

  // 데이터 상태
  const [rows, setRows] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  // 폼/선택 상태
  const [mode, setMode] = useState("view"); // 'view' | 'create' | 'edit'
  const [detail, setDetail] = useState(emptyDetail);
  const [selectedNo, setSelectedNo] = useState("");
  const [saving, setSaving] = useState(false);

  // 에러/검증
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  // 목록 조회
  const fetchStudents = useCallback(async (newPage = page, newSize = size, newSort = sort, f = filters) => {
    setLoading(true);
    setError("");

    try {
      const validation = validateSearchParams(f);
      if (!validation.isValid) {
        setValidationErrors(validation.errors);
        setLoading(false);
        return;
      }
      setValidationErrors({});

      const searchParams = { ...f, page: newPage, size: newSize, sort: newSort };
      const data = await fetchStudentsApi(searchParams);

      setRows(data.content || []);
      setTotalPages(data.totalPages || 1);
      setTotalElements(data.totalElements || 0);
      setPage(newPage);
      setSize(newSize);
      setSort(newSort);
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

  // 초기 및 필터 변경 시 자동조회(원하면 제거 가능)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchStudents(0, size, sort, filters);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [filters, size, sort, fetchStudents]);

  // 수동 조회
  const handleSearch = () => {
    fetchStudents(0, size, sort, filters);
    setPage(0);
  };

  // 필터 초기화
  const handleResetFilters = () => {
    const reset = {
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
    setFilters(reset);
    setValidationErrors({});
  };

  // 모드 전환: 생성(입학정보 입력)
  const handleCreateMode = () => {
    setMode("create");
    setSelectedNo("");
    setDetail(emptyDetail);
    setError("");
  };

  // 모드 전환: 수정(기존 정보 수정)
  const handleEditMode = () => {
    if (!selectedNo) {
      alert("수정할 학생을 먼저 선택하세요.");
      return;
    }
    setMode("edit");
  };

  // 저장
  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    setError("");

    try {
      if (mode === "create") {
        const payload = {
          name: detail.name,
          schoolSubjectCode: detail.schoolSubjectCode,
          genderCode: detail.genderCode,
          email: detail.email,
          bankCode: detail.bankCode,
          bankAccountNumber: detail.bankAccountNo,
          grade: detail.grade,
          advisorNo: detail.advisorNo,
          birthDate: detail.birthDate,
          admissionDate: detail.admissionDate,
          universityCode: detail.universityCode,
          studentStatusCode: detail.studentStatusCode,
          clubCode: detail.clubCode,
        };
        const created = await enrollStudent(payload);
        setSelectedNo(created?.studentNo || "");
        setDetail((prev) => ({ ...prev, studentNo: created?.studentNo || prev.studentNo }));
        setMode("edit"); // 생성 후 수정모드로
        await fetchStudents(0, size, sort, filters);
        setPage(0);
        alert("등록되었습니다.");
      } else if (mode === "edit" && selectedNo) {
        const payload = {
          name: detail.name,
          email: detail.email,
          birthDate: detail.birthDate,
          admissionDate: detail.admissionDate,
          genderCode: detail.genderCode,
          grade: detail.grade,
          clubCode: detail.clubCode,
          universityCode: detail.universityCode,
          schoolSubjectCode: detail.schoolSubjectCode,
          advisorNo: detail.advisorNo,
          bankCode: detail.bankCode,
          bankAccountNo: detail.bankAccountNo,
          studentStatusCode: detail.studentStatusCode,
        };
        await adminUpdateStudentInfo(selectedNo, payload);
        await fetchStudents(page, size, sort, filters);
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
  const handleRowClick = async (studentNo) => {
    try {
      const s = await fetchStudentByNo(studentNo);
      setDetail({
        studentNo: s.studentNo || "",
        name: s.name || "",
        email: s.email || "",
        birthDate: s.birthDate || "",
        admissionDate: s.admissionDate || "",
        genderCode: s.genderCode || "",
        grade: s.grade || "",
        clubCode: s.clubCode || "",
        universityCode: s.universityCode || "",
        schoolSubjectCode: s.schoolSubjectCode || "",
        advisorNo: s.advisorId || "",
        bankCode: s.bankCode || "",
        bankAccountNo: s.bankAccountNo || "",
        studentStatusCode: s.studentStatusCode || "",
      });
      setSelectedNo(studentNo);
      setMode("edit");
      setError("");
    } catch (e) {
      console.error("상세 조회 실패:", e);
      setError("상세 조회에 실패했습니다: " + (e.message || ""));
    }
  };

  const handlePageChange = (newPage) => {
    fetchStudents(newPage - 1, size, sort, filters);
  };

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    fetchStudents(0, newSize, sort, filters);
    setPage(0);
  };

  const handleSortChange = (newSort) => {
    fetchStudents(0, size, newSort, filters);
    setPage(0);
  };

  return (
    <div className="space-y-3">
      <AdminSectionHeader title="학생관리" />

      {/* 상단 액션 */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded bg-gray-800 text-white disabled:opacity-50"
            onClick={handleSearch} disabled={loading}>
            {loading ? "조회중..." : "조회"}
          </button>
          <button className="px-3 py-1 rounded border hover:bg-gray-50"
            onClick={handleCreateMode}>
            생성
          </button>
          <button className="px-3 py-1 rounded border hover:bg-gray-50"
            onClick={handleResetFilters}>
            초기화
          </button>
        </div>
      </div>

      {/* 메인 레이아웃: 좌(검색+목록) / 우(학생 폼) */}
      <div className="grid grid-cols-12 gap-3">
        {/* 좌측: 검색 + 목록(두 섹션) */}
        <div className="col-span-8 space-y-3">
          {/* 검색 카드 */}
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <StudentListSearchFilter
              filters={filters}
              setFilters={setFilters}
              handleSearch={handleSearch}
              size={size}
              handleSizeChange={handleSizeChange}
              loading={loading}
            />
          </div>

          {/* 목록 카드: 테이블+페이징을 하나의 카드로 */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* 테이블은 bare 모드로 */}
            <StudentListTable
              rows={rows}
              loading={loading}
              selectedNo={selectedNo}
              onRowClick={handleRowClick}
              onSortChange={handleSortChange}
              currentSort={sort}
              variant="bare"
            />

            {/* 페이징: 같은 카드 안의 하단 바 */}
            <div className="px-3 py-2 flex justify-between items-center border-t">
              <div className="text-sm text-gray-600">
                검색결과: <b>{totalElements.toLocaleString()}</b>건{loading && " (로딩중...)"}
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
        </div>

        {/* ▶ 우측: 학생 폼 카드 */}
        <div className="col-span-4">
          <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-3 self-start sticky top-20">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-gray-700">
                {mode === "create" ? "입학정보 입력" : selectedNo ? "기존 정보 수정" : "학생 정보"}
              </div>
              {/* 필요 시 우측 상단에 저장 버튼을 두고 싶다면 여기에 추가 */}
            </div>

            {/* 선택된 학번 표시 (헤더와 폼 사이) */}
            <div className="text-sm text-gray-700 bg-gray-50 border rounded px-3 py-2">
              선택된 학번: <b>{selectedNo || "-"}</b>
            </div>

            {/* 폼 */}
            <StudentAdminUpdateForm
              value={detail}
              onChange={setDetail}
              disabled={saving}
              mode={mode}
              onSubmit={handleSave}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
