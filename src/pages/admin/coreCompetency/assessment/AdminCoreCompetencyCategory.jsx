import { useEffect, useState } from "react";
import * as api from '../../../../api/admin/coreCompetency/CoreCompetencyApi';
import AdminCategoryEditModal from "../../../../component/admin/coreCompetency/assessment/AdminCategoryEditModal";

/**
 * 특정 진단 평가에 속한 핵심역량과 하위역량 카테고리를 관리하는 컴포넌트입니다.
 * 핵심역량을 선택하면 그에 해당하는 하위역량 목록을 보여줍니다.
 */
const AdminCoreCompetencyCategory = ({ assessmentId }) => {
    // API로부터 가져온 핵심역량 목록 (하위역량 포함)을 저장하는 state
    const [coreList, setCoreList] = useState([]);
    // 사용자가 선택한 핵심역량의 ID를 저장하는 state
    const [selectedCoreId, setSelectedCoreId] = useState(null);
    // 생성/수정 모달의 상태를 관리하는 state. null이 아니면 모달이 열립니다.
    const [editingItem, setEditingItem] = useState(null);

    // 핵심역량과 하위역량 테이블의 페이지네이션을 위한 state
    const [currentPageCore, setCurrentPageCore] = useState(1);
    const [currentPageSub, setCurrentPageSub] = useState(1);
    const itemsPerPage = 5; // 한 페이지에 표시할 항목 수

    // 선택된 핵심역량 객체를 coreList에서 찾습니다.
    const selectedCore = coreList.find(c => c.id === selectedCoreId);
    // 표시할 하위역량 목록을 선택된 핵심역량 객체에서 추출합니다. 없으면 빈 배열을 사용합니다.
    const subListToDisplay = selectedCore ? selectedCore.subCompetencyCategories : [];

    // --- 페이징 계산 ---
    
    // 핵심역량 목록의 총 페이지 수
    const totalPagesCore = Math.ceil(coreList.length / itemsPerPage);
    // 현재 페이지에 표시할 핵심역량 목록 (slice)
    const currentCoreList = coreList.slice((currentPageCore - 1) * itemsPerPage, currentPageCore * itemsPerPage);

    // 하위역량 목록의 총 페이지 수
    const totalPagesSub = Math.ceil(subListToDisplay.length / itemsPerPage);
    // 현재 페이지에 표시할 하위역량 목록 (slice)
    const currentSubList = subListToDisplay.slice((currentPageSub - 1) * itemsPerPage, currentPageSub * itemsPerPage);

    // assessmentId를 기반으로 핵심역량 데이터를 불러오는 비동기 함수
    const fetchData = async () => {
        if (!assessmentId) return; // assessmentId가 없으면 실행하지 않습니다.
        try {
            const coreRes = await api.getCoreCategoriesByAssessment(assessmentId);
            setCoreList(coreRes.data);
        } catch (err) { console.error("데이터 로딩 실패", err); }
    };

    // assessmentId가 변경될 때마다 데이터를 다시 불러오고, 선택 및 페이지 상태를 초기화합니다.
    useEffect(() => {
        fetchData();
        setSelectedCoreId(null);
        setCurrentPageCore(1);
    }, [assessmentId]);

    // 핵심역량 선택이 바뀔 때마다 하위역량 페이지를 1로 초기화합니다.
    useEffect(() => {
        setCurrentPageSub(1);
    }, [selectedCoreId]);

    // 수정/생성 모달을 여는 핸들러
    const handleOpenModal = (type, item = null, parent = null) => setEditingItem({ type, item, parent });
    // 모달을 닫는 핸들러
    const handleCloseModal = () => setEditingItem(null);

    // 생성/수정 내용을 저장하는 핸들러
    const handleSave = async (formData) => {
        const { type, item, parent, name, description, idealTalentProfileId } = formData;
        const isCore = type.includes('core');
        
        // 서버로 보낼 DTO(Data Transfer Object)를 구성합니다.
        const dto = {
            name, description,
            competencyCategory: { codeName: isCore ? '핵심역량' : '하위역량' },
            parentId: parent?.id,
            idealTalentProfileId: isCore ? idealTalentProfileId : null,
            assessmentId: isCore ? assessmentId : null,
        };
        
        try {
            if (item?.id) { // item ID가 있으면 수정 API를 호출합니다.
                await api.updateCategory(item.id, dto);
                alert("수정되었습니다.");
            } else { // item ID가 없으면 생성 API를 호출합니다.
                await api.createCategory(dto);
                alert("등록되었습니다.");
            }
            handleCloseModal(); // 모달을 닫습니다.
            await fetchData(); // 최신 데이터를 다시 불러옵니다.
        } catch (err) {
            alert(err.response?.data?.message || "저장에 실패했습니다.");
        }
    };
    
    // 카테고리를 삭제하는 핸들러
    const handleDelete = async (item, type) => {
        const itemName = item.name || item.coreCategoryName || item.subCategoryName;
        if (window.confirm(`'${itemName}'을(를) 정말 삭제하시겠습니까?`)) {
            const dto = { competencyCategory: { codeName: type.includes('core') ? '핵심역량' : '하위역량' } };
            try {
                await api.deleteCategory(item.id, dto);
                alert("삭제되었습니다.");
                // 만약 선택된 핵심역량을 삭제했다면, 선택 상태를 초기화합니다.
                if (type.includes('core') && item.id === selectedCoreId) {
                    setSelectedCoreId(null);
                }
                await fetchData(); // 최신 데이터를 다시 불러옵니다.
            } catch (err) {
                alert(err.response?.data?.message || "삭제에 실패했습니다.");
            }
        }
    };

    return (
        <div className="mt-6 px-6 py-6 bg-white rounded-xl shadow-md border border-gray-300">
            {/* editingItem 상태에 따라 생성/수정 모달을 조건부 렌더링합니다. */}
            {editingItem && <AdminCategoryEditModal editingItem={editingItem} onClose={handleCloseModal} onSave={handleSave} />}
            <div className="flex gap-4">
                {/* 왼쪽: 핵심역량 테이블 */}
                <div className="w-1/3">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xl text-black font-bold">▐ 핵심역량</span>
                        <button onClick={() => handleOpenModal('create-core')} className="bg-blue-500 text-white px-3 py-1 text-sm rounded">+ 추가</button>
                    </div>
                    <table className="w-full text-sm border">
                        <thead><tr className="bg-gray-100"><th className="border p-2 w-1/4">번호</th><th className="border p-2">핵심역량명</th><th className="border p-2 w-24">관리</th></tr></thead>
                        <tbody>
                            {currentCoreList.map((core) => (
                                <tr key={core.id} onClick={() => setSelectedCoreId(core.id)} className={`cursor-pointer hover:bg-blue-50 ${selectedCoreId === core.id ? "bg-blue-100 font-semibold" : ""}`}>
                                    <td className="border p-2 text-center">{core.id}</td>
                                    <td className="border p-2 text-center">{core.name || core.coreCategoryName}</td>
                                    <td className="border p-2 text-center">
                                        {/* e.stopPropagation()은 버튼 클릭 시 부모 tr의 onClick 이벤트가 실행되는 것을 막습니다. */}
                                        <button onClick={(e) => { e.stopPropagation(); handleOpenModal('edit-core', core); }} className="text-xs text-blue-600 mr-1">수정</button>
                                        <button onClick={(e) => { e.stopPropagation(); handleDelete(core, 'core'); }} className="text-xs text-red-600">삭제</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* 핵심역량 페이징 UI */}
                    {totalPagesCore > 0 && (
                        <div className="mt-3 flex justify-center gap-2 text-sm">
                            <button onClick={() => setCurrentPageCore(prev => Math.max(prev - 1, 1))} disabled={currentPageCore === 1} className="px-3 py-1 border rounded disabled:opacity-40">이전</button>
                            <span>{currentPageCore} / {totalPagesCore}</span>
                            <button onClick={() => setCurrentPageCore(prev => Math.min(prev + 1, totalPagesCore))} disabled={currentPageCore === totalPagesCore} className="px-3 py-1 border rounded disabled:opacity-40">다음</button>
                        </div>
                    )}
                </div>

                {/* 오른쪽: 하위역량 테이블 */}
                <div className="w-2/3">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xl text-black font-bold">▐ 하위역량</span>
                        {/* 핵심역량이 선택되었을 때만 '추가' 버튼이 활성화됩니다. */}
                        <button onClick={() => handleOpenModal('create-sub', null, coreList.find(c => c.id === selectedCoreId))} disabled={!selectedCoreId} className="bg-green-500 text-white px-3 py-1 text-sm rounded disabled:bg-gray-300">+ 추가</button>
                    </div>
                    <table className="w-full text-sm border">
                        <thead><tr className="bg-gray-100"><th className="border p-2 w-28">번호</th><th className="border p-2 w-1/4">하위역량명</th><th className="border p-2">정의</th><th className="border p-2 w-24">관리</th></tr></thead>
                        <tbody>
                            {currentSubList.length > 0 ? currentSubList.map((sub) => (
                                <tr key={sub.id} className="hover:bg-gray-50">
                                    <td className="border p-2 text-center">{sub.id}</td>
                                    <td className="border p-2 text-center">{sub.name || sub.subCategoryName}</td>
                                    <td className="border p-2">{sub.description || sub.subCategoryNote || "-"}</td>
                                    <td className="border p-2 text-center">
                                        <button onClick={() => handleOpenModal('edit-sub', sub, coreList.find(c => c.id === selectedCoreId))} className="text-xs text-blue-600 mr-1">수정</button>
                                        <button onClick={() => handleDelete(sub, 'sub')} className="text-xs text-red-600">삭제</button>
                                    </td>
                                </tr>
                            )) : <tr><td colSpan="4" className="text-center text-gray-500 py-4">선택된 핵심역량이 없거나 하위역량이 없습니다.</td></tr>}
                        </tbody>
                    </table>
                     {/* 하위역량 페이징 UI */}
                     {totalPagesSub > 0 && (
                         <div className="mt-3 flex justify-center gap-2 text-sm">
                            <button onClick={() => setCurrentPageSub(prev => Math.max(prev - 1, 1))} disabled={currentPageSub === 1} className="px-3 py-1 border rounded disabled:opacity-40">이전</button>
                            <span>{currentPageSub} / {totalPagesSub}</span>
                            <button onClick={() => setCurrentPageSub(prev => Math.min(prev + 1, totalPagesSub))} disabled={currentPageSub === totalPagesSub} className="px-3 py-1 border rounded disabled:opacity-40">다음</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminCoreCompetencyCategory;