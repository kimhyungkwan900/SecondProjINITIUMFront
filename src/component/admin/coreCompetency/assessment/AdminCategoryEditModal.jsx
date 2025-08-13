import React, { useState, useEffect, useMemo } from 'react';
import * as api from '../../../../api/admin/coreCompetency/CoreCompetencyApi';

/**
 * 역량 카테고리(핵심/하위) 생성/수정 모달
 * - 중복 방지: existingItems([{id,name}]) 기준으로 이름 중복을 차단합니다.
 */
const AdminCategoryEditModal = ({ editingItem, onClose, onSave, existingItems = [] }) => {
  const [formData, setFormData] = useState({ name: '', description: '', idealTalentProfileId: '' });
  const [idealTalentProfiles, setIdealTalentProfiles] = useState([]);
  const [errors, setErrors] = useState({}); // { name?: string, idealTalentProfileId?: string }

  const { type, item } = editingItem;
  const isCore = type.includes('core');
  const isCreate = type.includes('create');
  const modalTitle = `${isCore ? '핵심' : '하위'}역량 ${isCreate ? '등록' : '수정'}`;

  // 인재상 로딩(핵심일 때만)
  useEffect(() => {
    if (isCore) {
      api.getIdealTalentProfiles().then(res => setIdealTalentProfiles(res.data || []));
    }
  }, [isCore]);

  // 초기 값 세팅
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || item.coreCategoryName || '',
        description: item.description || item.coreCategoryNote || '',
        idealTalentProfileId: item.idealTalentProfile?.id || '',
      });
    } else {
      setFormData({ name: '', description: '', idealTalentProfileId: '' });
    }
    setErrors({});
  }, [item, type]);

  // 이름 정규화
  const normalize = (v) => String(v ?? '').trim().toLowerCase();

  // 현재 아이템 id (수정 모드일 때만 존재)
  const currentId = item?.id ?? null;

  // 중복 여부 계산
  const isDuplicate = useMemo(() => {
    const currentName = normalize(formData.name);
    if (!currentName) return false;
    return (existingItems || []).some(({ id, name }) => {
      if (currentId && id === currentId) return false; // 자기 자신 제외
      return normalize(name) === currentName;
    });
  }, [formData.name, existingItems, currentId]);

  // 입력 변경
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  // 제출
  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = String(formData.name ?? '').trim();
    const nextErrors = {};

    if (!trimmedName) {
      nextErrors.name = '역량명을 입력해주세요.';
    } else if (isDuplicate) {
      nextErrors.name = '이미 존재하는 이름입니다.';
    }
    if (isCore && !formData.idealTalentProfileId) {
      nextErrors.idealTalentProfileId = '인재상을 선택해주세요.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSave({ ...editingItem, ...formData, name: trimmedName });
  };

  const trimmedName = String(formData.name ?? '').trim();
  const submitDisabled = isDuplicate || !trimmedName || (isCore && !formData.idealTalentProfileId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{modalTitle}</h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* 역량명 */}
          <div className="mb-4">
            <label className="block mb-1">
              역량명 <span className="text-red-600 text-xs ml-1">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full border p-2 rounded ${errors.name || isDuplicate ? 'border-red-500' : ''}`}
              aria-invalid={!!errors.name || isDuplicate}
              placeholder="예) 문제해결역량"
            />
            {/* 즉시 중복 피드백 */}
            {isDuplicate && !errors.name && (
              <p className="text-red-600 text-xs mt-1">이미 존재하는 이름입니다.</p>
            )}
            {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* 정의 */}
          <div className="mb-4">
            <label className="block mb-1">정의 (설명)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded h-24"
              placeholder="역량의 정의 또는 설명을 입력하세요"
            />
          </div>

          {/* 인재상(핵심만) */}
          {isCore && (
            <div className="mb-4">
              <label className="block mb-1">
                인재상 <span className="text-red-600 text-xs ml-1">*</span>
              </label>
              <select
                name="idealTalentProfileId"
                value={formData.idealTalentProfileId}
                onChange={handleChange}
                className={`w-full border p-2 rounded ${errors.idealTalentProfileId ? 'border-red-500' : ''}`}
                aria-invalid={!!errors.idealTalentProfileId}
              >
                <option value="">선택하세요</option>
                {idealTalentProfiles.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              {errors.idealTalentProfileId && (
                <p className="text-red-600 text-xs mt-1">{errors.idealTalentProfileId}</p>
              )}
            </div>
          )}

          {/* 버튼 */}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">취소</button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={submitDisabled}
              title={isDuplicate ? '중복된 이름은 저장할 수 없습니다.' : undefined}
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCategoryEditModal;
