import { useState } from "react";
import { createAssessment, deleteAssessment, updateAssessment } from "../../../../api/admin/coreCompetency/AdminAssessmentApi";
import AdminSectionHeader from "../../../../component/admin/AdminSectionHeader";
import AdminAssessmentSearchBar from "../../../../component/admin/coreCompetency/assessment/AdminAssessmentSearchBar";
import AdminAssessmentListTable from "../../../../component/admin/coreCompetency/assessment/AdminAssessmentListTable";
import AdminAssessmentTab from "../../../../component/admin/coreCompetency/assessment/AdminAssessmentTab";

const AdminCoreCompetencyAssessment = () => {
    const [assessmentList, setAssessmentList] = useState([]);
    const [selectedAssessment, setSelectedAssessment] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const sortAssessments = (list) => {
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

    const handleAddNew = () => {
        setSelectedAssessment({
            id: null,
            assessmentNo: "",
            assessmentName: "",
            startDate: "",
            endDate: "",
            registerDate: new Date().toISOString().slice(0, 10),
            academicYear: new Date().getFullYear().toString(),
            semesterCode: "1",
            onlineYn: "Y",
            guideContent: "",
            departmentName: "핵심역량센터",
        });
    };

    const handleSave = async (formData) => {
        setIsLoading(true);
        setError("");
        try {
            if (!formData.id) {
                const randomNumber = Math.floor(100000 + Math.random() * 900000);
                const newAssessmentNo = `ASMT${formData.academicYear}-0${formData.semesterCode}${randomNumber}`;
                formData.assessmentNo = newAssessmentNo;
            }

            if (formData.id) {
                const updated = await updateAssessment(formData.id, formData);
                alert("성공적으로 수정되었습니다.");
                setAssessmentList((prev) =>
                    sortAssessments(prev.map((it) => (it.id === updated.id ? updated : it)))
                );
            } else {
                const created = await createAssessment(formData);
                alert("성공적으로 등록되었습니다.");
                setAssessmentList((prev) => sortAssessments([created, ...prev]));
            }
            setSelectedAssessment(null);
        } catch {
            const msg = "저장에 실패했습니다.";
            setError(msg);
            alert(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("정말로 이 평가를 삭제하시겠습니까?")) return;
        setIsLoading(true);
        setError("");
        try {
            await deleteAssessment(id);
            alert("성공적으로 삭제되었습니다.");
            setSelectedAssessment(null);
            setAssessmentList((prev) => prev.filter((it) => it.id !== id));
        } catch {
            setError("삭제에 실패했습니다.");
            alert("삭제에 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => setSelectedAssessment(null);

    const setAndSortAssessmentList = (list) => {
        setAssessmentList(sortAssessments(list));
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <AdminSectionHeader title="핵심역량 진단평가" />

            {/* 검색바 + 액션바를 한 카드에서 가로 정렬 */}
            <section className="adm-card p-4">
                <div className="flex flex-col md:flex-row md:items-end gap-4">
                    {/* 검색바 영역 */}
                    <div className="flex-1 min-w-0">
                        <AdminAssessmentSearchBar setAssessmentList={setAndSortAssessmentList} />
                    </div>

                    {/* 액션바: 우측 정렬, 버튼 높이/톤 가이드 준수 */}
                    <div className="shrink-0 md:pl-2 flex md:justify-end">
                        <button
                            onClick={handleAddNew}
                            className="adm-btn adm-btn--primary"
                            disabled={isLoading}
                        >
                            + 새 진단 등록
                        </button>
                    </div>
                </div>
            </section>

            {/* 목록 카드 */}
            <section className="adm-card overflow-hidden mt-4">
                <AdminAssessmentListTable
                    assessmentList={assessmentList}
                    selectedAssessment={selectedAssessment}
                    setSelectedAssessment={setSelectedAssessment}
                />
            </section>

            {/* 에러 메시지 */}
            {error && <p className="text-sm text-red-600 text-center mt-2">{error}</p>}

            {/* 상세/수정 탭 */}
            {selectedAssessment && (
                <section className="adm-card p-6 mt-4">
                    <AdminAssessmentTab
                        selectedAssessment={selectedAssessment}
                        assessmentList={assessmentList}
                        onSave={handleSave}
                        onDelete={handleDelete}
                        onCancel={handleCancel}
                        isLoading={isLoading}
                    />
                </section>
            )}
        </div>
    );
};

export default AdminCoreCompetencyAssessment;
