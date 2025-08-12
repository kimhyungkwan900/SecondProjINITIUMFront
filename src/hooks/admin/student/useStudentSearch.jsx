import { useCallback, useEffect, useState } from "react";
import { fetchStudents, validateSearchParams } from "../../../api/user/auth/studentsApi";

export const useStudentSearch = (initialSearchParams = {}) => {
  // 검색 조건 상태
  const [searchParams, setSearchParams] = useState({
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
    page: 0,
    size: 15,
    sort: "studentNo,asc",
    ...initialSearchParams
  });

  // 검색 결과 상태
  const [searchResults, setSearchResults] = useState({
    content: [],
    totalElements: 0,
    totalPages: 0,
    number: 0,
    size: 15,
    first: true,
    last: true,
    empty: true
  });

  // 로딩 상태
  const [loading, setLoading] = useState(false);
  
  // 에러 상태
  const [error, setError] = useState(null);
  
  // 유효성 검증 에러
  const [validationErrors, setValidationErrors] = useState({});

  /**
   * 검색 실행
   */
  const executeSearch = useCallback(async (params = searchParams) => {
    // 유효성 검증
    const validation = validateSearchParams(params);
    
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }
    
    setValidationErrors({});
    setLoading(true);
    setError(null);

    try {
      const results = await fetchStudents(params);
      setSearchResults(results);
    } catch (err) {
      setError(err.message || "검색 중 오류가 발생했습니다.");
      console.error("학생 검색 오류:", err);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  /**
   * 검색 조건 업데이트
   */
  const updateSearchParams = useCallback((newParams) => {
    setSearchParams(prev => ({
      ...prev,
      ...newParams,
      page: 0 // 검색 조건이 변경되면 첫 페이지로 리셋
    }));
  }, []);

  /**
   * 페이지 변경
   */
  const changePage = useCallback((newPage) => {
    const updatedParams = { ...searchParams, page: newPage };
    setSearchParams(updatedParams);
    executeSearch(updatedParams);
  }, [searchParams, executeSearch]);

  /**
   * 페이지 크기 변경
   */
  const changePageSize = useCallback((newSize) => {
    const updatedParams = { ...searchParams, size: newSize, page: 0 };
    setSearchParams(updatedParams);
    executeSearch(updatedParams);
  }, [searchParams, executeSearch]);

  /**
   * 정렬 조건 변경
   */
  const changeSort = useCallback((newSort) => {
    const updatedParams = { ...searchParams, sort: newSort, page: 0 };
    setSearchParams(updatedParams);
    executeSearch(updatedParams);
  }, [searchParams, executeSearch]);

  /**
   * 검색 조건 초기화
   */
  const resetSearch = useCallback(() => {
    const resetParams = {
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
      page: 0,
      size: 15,
      sort: "studentNo,asc"
    };
    setSearchParams(resetParams);
    setValidationErrors({});
    executeSearch(resetParams);
  }, [executeSearch]);

  /**
   * 검색 조건이 있는지 확인
   */
  const hasSearchCondition = useCallback(() => {
    return Object.entries(searchParams).some(([key, value]) => {
      if (['page', 'size', 'sort'].includes(key)) return false;
      return value !== "" && value !== null && value !== undefined;
    });
  }, [searchParams]);

  // 검색 조건이 변경될 때 자동 검색 (디바운싱 적용)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      executeSearch();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [executeSearch]);

  return {
    // 상태
    searchParams,
    searchResults,
    loading,
    error,
    validationErrors,
    
    // 함수
    executeSearch,
    updateSearchParams,
    changePage,
    changePageSize,
    changeSort,
    resetSearch,
    hasSearchCondition,
    
    // 편의 함수
    isFirstPage: searchResults.first,
    isLastPage: searchResults.last,
    isEmpty: searchResults.empty,
    totalCount: searchResults.totalElements,
    currentPage: searchResults.number,
    totalPages: searchResults.totalPages
  };
};