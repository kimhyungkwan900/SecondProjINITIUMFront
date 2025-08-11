import React, { useState, useEffect } from 'react';
import * as api from '../../../../api/admin/coreCompetency/CoreCompetencyApi';

/**
 * 역량 카테고리(핵심/하위)를 생성하거나 수정하기 위한 모달 컴포넌트입니다.
 */

const AdminCategoryEditModal = ({ editingItem, onClose, onSave }) => {
    // 폼 입력 데이터를 관리하는 state (역량명, 설명, 인재상 ID)
    const [formData, setFormData] = useState({ name: '', description: '', idealTalentProfileId: '' });
    // API로부터 받아온 인재상 목록을 저장하는 state
    const [idealTalentProfiles, setIdealTalentProfiles] = useState([]);

    // 부모로부터 전달받은 props에서 type과 item을 추출합니다.
    const { type, item } = editingItem;
    // 'type' 문자열에 'core'가 포함되어 있는지 여부로 핵심역량/하위역량을 구분합니다.
    const isCore = type.includes('core');
    // 모달의 제목을 동적으로 설정합니다. (예: "핵심역량 등록", "하위역량 수정")
    const modalTitle = `${isCore ? '핵심' : '하위'}역량 ${type.includes('create') ? '등록' : '수정'}`;

    // 핵심역량 작업 시에만 인재상 목록을 불러오는 useEffect
    useEffect(() => {
        // isCore가 true일 때만 API를 호출하여 인재상 목록을 가져옵니다.
        if (isCore) {
            api.getIdealTalentProfiles().then(res => setIdealTalentProfiles(res.data));
        }
    }, [isCore]); // isCore 값이 변경될 때만 이 effect를 재실행합니다.

    // 모달이 열리거나 수정할 아이템이 변경될 때 폼 데이터를 설정하는 useEffect
    useEffect(() => {
        if (item) { // 'item'이 존재하면 수정 모드입니다.
            setFormData({
                // item 객체의 프로퍼티 이름이 다를 수 있어 || 연산자로 처리합니다.
                name: item.name || item.coreCategoryName || '',
                description: item.description || item.coreCategoryNote || '',
                // 옵셔널 체이닝(?.)을 사용하여 item.idealTalentProfile이 null일 때 오류를 방지합니다.
                idealTalentProfileId: item.idealTalentProfile?.id || '',
            });
        } else { // 'item'이 없으면 생성 모드이므로 폼을 초기화합니다.
            setFormData({ name: '', description: '', idealTalentProfileId: '' });
        }
    }, [item, type]); // item이나 type이 변경될 때마다 폼 데이터를 재설정합니다.

    /**
     * 입력 필드(input, textarea, select)의 값이 변경될 때 호출되는 핸들러입니다.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        // 이전 state를 기반으로 변경된 필드의 값만 업데이트합니다.
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    /**
     * '저장' 버튼을 클릭하여 폼을 제출할 때 호출되는 핸들러입니다.
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // 폼 제출 시 페이지가 새로고침되는 기본 동작을 막습니다.
        
        // 유효성 검사: 역량명이 비어있는지 확인합니다.
        if (!formData.name) {
            alert("역량명을 입력해주세요.");
            return;
        }
        // 유효성 검사: 핵심역량인 경우, 인재상이 선택되었는지 확인합니다.
        if (isCore && !formData.idealTalentProfileId) {
            alert("인재상을 선택해주세요.");
            return;
        }
        // 모든 유효성 검사를 통과하면 onSave 콜백 함수를 호출하여 데이터를 부모 컴포넌트로 전달합니다.
        onSave({ ...editingItem, ...formData });
    };

    return (
        // 모달 배경 (어두운 오버레이)
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            {/* 모달 컨텐츠 */}
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{modalTitle}</h2>
                <form onSubmit={handleSubmit}>
                    {/* 역량명 입력 필드 */}
                    <div className="mb-4">
                        <label className="block mb-1">역량명</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" />
                    </div>
                    {/* 정의(설명) 입력 필드 */}
                    <div className="mb-4">
                        <label className="block mb-1">정의 (설명)</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded h-24" />
                    </div>
                    
                    {/* 핵심역량일 경우에만 인재상 선택 드롭다운을 렌더링합니다. */}
                    {isCore && (
                        <div className="mb-4">
                            <label className="block mb-1">연관 인재상</label>
                            <select name="idealTalentProfileId" value={formData.idealTalentProfileId} onChange={handleChange} className="w-full border p-2 rounded">
                                <option value="">선택하세요</option>
                                {/* API로 불러온 인재상 목록으로 option 태그를 생성합니다. */}
                                {idealTalentProfiles.map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* 버튼 영역 */}
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">취소</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">저장</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminCategoryEditModal;