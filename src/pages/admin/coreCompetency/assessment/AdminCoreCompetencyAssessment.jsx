import { useState, useCallback, useEffect } from "react";
import AdminSectionHeader from "../../../../component/admin/AdminSectionHeader";
import AdminAssessmentSearchBar from "../../../../component/admin/coreCompetency/assessment/AdminAssessmentSearchBar";
import AdminAssessmentListTable from "../../../../component/admin/coreCompetency/assessment/AdminAssessmentListTable";
import AdminAssessmentTab from "../../../../component/admin/coreCompetency/assessment/AdminAssessmentTab";
import { createAssessment, updateAssessment, deleteAssessment } from "../../../../api/admin/coreCompetency/AdminAssessmentApi";

/**
 * 관리자 페이지의 핵심역량 진단 평가를 관리하는 메인 컴포넌트입니다.
 * 진단 평가 목록 조회, 생성, 수정, 삭제 기능을 담당합니다.
 */
const AdminCoreCompetencyAssessment = () => {
    // 진단 평가 목록을 저장하는 state
    const [assessmentList, setAssessmentList] = useState([]);
    // 사용자가 선택한(또는 새로 생성할) 진단 평가 정보를 저장하는 state. null이 아니면 하단에 탭 UI가 나타납니다.
    const [selectedAssessment, setSelectedAssessment] = useState(null);
    // API 호출 시 로딩 상태를 관리하는 state
    const [isLoading, setIsLoading] = useState(false);
    // API 호출 중 발생한 에러 메시지를 저장하는 state
    const [error, setError] = useState('');

    /**
     * 진단 평가 목록을 정렬하는 함수입니다.
     * 정렬 기준: 1. 학년도(내림차순), 2. 학기(내림차순), 3. 시작일(내림차순), 4. 종료일(내림차순)
     * @param {Array} list - 정렬할 진단 평가 목록
     * @returns {Array} 정렬된 새로운 배열
     */
    const sortAssessments = (list) => {
        // 원본 배열의 불변성을 유지하기 위해 배열을 복사하여 정렬합니다.
        return [...list].sort((a, b) => {
            const yearDiff = b.academicYear.localeCompare(a.academicYear);
            if (yearDiff !== 0) return yearDiff;

            const semesterDiff = b.semesterCode.localeCompare(a.semesterCode);
            if (semesterDiff !== 0) return semesterDiff;
            
            const startDiff = b.startDate.localeCompare(a.startDate);
            if (startDiff !== 0) return startDiff;

            return b.endDate.localeCompare(a.endDate);
        });
    };

    /**
     * '새 진단 등록' 버튼 클릭 시 호출되는 핸들러입니다.
     * 새로운 진단 평가를 위한 기본값으로 폼을 초기화합니다.
     */
    const handleAddNew = () => {
        setSelectedAssessment({
            id: null, // id가 null이면 '생성' 모드로 인식됩니다.
            assessmentNo: '',
            assessmentName: '',
            startDate: '',
            endDate: '',
            registerDate: new Date().toISOString().slice(0, 10),
            academicYear: new Date().getFullYear().toString(),
            semesterCode: '1',
            onlineYn: 'Y',
            guideContent: '',
            departmentName: '핵심역량센터',
        });
    };

    /**
     * 진단 평가 정보를 저장(생성/수정)하는 비동기 핸들러입니다.
     * @param {object} formData - 폼에서 입력된 진단 평가 데이터
     */
    const handleSave = async (formData) => {
        setIsLoading(true);
        setError('');
        try {
            // formData에 id가 없으면 생성으로 간주하고, 진단 번호를 조합하여 생성합니다.
            if (!formData.id) {
                const newAssessmentNo = `ASMT${formData.academicYear}-0${formData.semesterCode}`;
                formData.assessmentNo = newAssessmentNo;
            }

            if (formData.id) { // id가 있으면 수정 로직을 실행합니다.
                const updatedAssessment = await updateAssessment(formData.id, formData);
                alert('성공적으로 수정되었습니다.');
                // 목록에서 수정된 항목을 교체하고 다시 정렬하여 state를 업데이트합니다.
                setAssessmentList(prevList =>
                    sortAssessments(
                        prevList.map(item =>
                            item.id === updatedAssessment.id ? updatedAssessment : item
                        )
                    )
                );
            } else { // id가 없으면 생성 로직을 실행합니다.
                const newAssessment = await createAssessment(formData);
                alert('성공적으로 등록되었습니다.');
                // 기존 목록의 맨 앞에 새 항목을 추가하고 다시 정렬하여 state를 업데이트합니다.
                setAssessmentList(prevList =>
                    sortAssessments([newAssessment, ...prevList])
                );
            }
            setSelectedAssessment(null); // 저장 후 선택 상태를 초기화하여 탭을 닫습니다.
        } catch (err) {
            const errorMessage = err.response?.data?.message || '저장에 실패했습니다.';
            setError(errorMessage);
            alert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * 진단 평가를 삭제하는 비동기 핸들러입니다.
     * @param {number} id - 삭제할 진단 평가의 ID
     */
    const handleDelete = async (id) => {
        if (window.confirm('정말로 이 평가를 삭제하시겠습니까?')) {
            setIsLoading(true);
            setError('');
            try {
                await deleteAssessment(id);
                alert('성공적으로 삭제되었습니다.');
                setSelectedAssessment(null); // 선택 상태 초기화
                // 목록에서 삭제된 항목을 제외한 새 배열로 state를 업데이트합니다.
                setAssessmentList(prevList => prevList.filter(item => item.id !== id));
            } catch (err) {
                setError('삭제에 실패했습니다.');
                alert('삭제에 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    /**
     * '취소' 버튼 클릭 시 호출되는 핸들러입니다.
     * 선택된 진단 평가 상태를 초기화하여 탭 UI를 닫습니다.
     */
    const handleCancel = () => {
        setSelectedAssessment(null);
    };

    /**
     * 검색 결과를 받아 정렬한 후 state에 반영하는 핸들러입니다.
     * 이 함수는 자식 컴포넌트(AdminAssessmentSearchBar)에 props로 전달됩니다.
     * @param {Array} list - 검색 결과로 받아온 진단 평가 목록
     */
    const setAndSortAssessmentList = (list) => {
        setAssessmentList(sortAssessments(list));
    };

    return (
        <div>
            <AdminSectionHeader title="핵심역량 진단평가" />
            
            {/* 검색바 컴포넌트. 검색 결과를 정렬하기 위해 setAndSortAssessmentList 핸들러를 전달합니다. */}
            <AdminAssessmentSearchBar setAssessmentList={setAndSortAssessmentList} />

            <div className="flex justify-end my-4">
                <button
                    onClick={handleAddNew}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    + 새 진단 등록
                </button>
            </div>

            {/* 진단 평가 목록을 표시하는 테이블 컴포넌트 */}
            <AdminAssessmentListTable
                assessmentList={assessmentList}
                setSelectedAssessment={setSelectedAssessment}
            />

            {/* 에러가 발생했을 경우 메시지를 표시합니다. */}
    {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            
            {/* selectedAssessment에 값이 있을 경우에만 상세 정보/수정 탭을 렌더링합니다. */}
    {selectedAssessment && (
                <AdminAssessmentTab
                    selectedAssessment={selectedAssessment}
                    onSave={handleSave}
                    onDelete={handleDelete}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default AdminCoreCompetencyAssessment;