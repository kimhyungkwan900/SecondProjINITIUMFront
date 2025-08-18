import { useEffect, useState } from "react";
import * as api from "../../../../api/admin/coreCompetency/CoreCompetencyApi";
import AdminCategoryEditModal from "../../../../component/admin/coreCompetency/assessment/AdminCategoryEditModal";

/**
 * 특정 진단 평가에 속한 핵심역량과 하위역량 카테고리를 관리하는 컴포넌트입니다.
 * 핵심역량을 선택하면 그에 해당하는 하위역량 목록을 보여줍니다.
 */
const AdminCoreCompetencyCategory = ({ assessmentId }) => {
  const [coreList, setCoreList] = useState([]);
  const [selectedCoreId, setSelectedCoreId] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const [currentPageCore, setCurrentPageCore] = useState(1);
  const [currentPageSub, setCurrentPageSub] = useState(1);
  const itemsPerPage = 5;

  const selectedCore = coreList.find((c) => c.id === selectedCoreId);
  const subListToDisplay = selectedCore ? selectedCore.subCompetencyCategories : [];

  // --- 페이징 계산 ---
  const totalPagesCore = Math.ceil(coreList.length / itemsPerPage) || 1;
  const currentCoreList = coreList.slice(
    (currentPageCore - 1) * itemsPerPage,
    currentPageCore * itemsPerPage
  );

  const totalPagesSub = Math.ceil(subListToDisplay.length / itemsPerPage) || 1;
  const currentSubList = subListToDisplay.slice(
    (currentPageSub - 1) * itemsPerPage,
    currentPageSub * itemsPerPage
  );

  const fetchData = async () => {
    if (!assessmentId) return;
    try {
      const coreRes = await api.getCoreCategoriesByAssessment(assessmentId);
      setCoreList(coreRes.data || []);
    } catch (err) {
      console.error("데이터 로딩 실패", err);
    }
  };

  useEffect(() => {
    fetchData();
    setSelectedCoreId(null);
    setCurrentPageCore(1);
  }, [assessmentId]);

  useEffect(() => {
    setCurrentPageSub(1);
  }, [selectedCoreId]);

  const handleOpenModal = (type, item = null, parent = null) =>
    setEditingItem({ type, item, parent });
  const handleCloseModal = () => setEditingItem(null);

  // 필수입력 검증
  const validateForm = (formData) => {
    const { type, name, idealTalentProfileId, parent } = formData || {};
    const isCore = type?.includes("core");
    const errs = [];

    // 공통 필수
    if (!name || !String(name).trim()) {
      errs.push("역량명을 입력해주세요.");
    }

    if (isCore) {
      if (!assessmentId) {
        errs.push("assessmentId가 없습니다. 화면을 새로고침하거나 다시 시도해주세요.");
      }
      if (
        idealTalentProfileId === null ||
        idealTalentProfileId === undefined ||
        String(idealTalentProfileId).trim() === ""
      ) {
        errs.push("이상적 인재상(idealTalentProfile)을 선택해주세요.");
      }
    } else {
      if (!parent || !parent.id) {
        errs.push("상위 핵심역량을 먼저 선택해주세요.");
      }
    }

    return errs;
  };

  const handleSave = async (formData) => {
    const { type, item, parent, name, description, idealTalentProfileId } =
      formData || {};
    const isCore = type?.includes("core");

    // 필수입력 검증
    const errors = validateForm(formData);
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    // 서버 DTO 구성
    const dto = {
      name,
      description,
      competencyCategory: { codeName: isCore ? "핵심역량" : "하위역량" },
      parentId: isCore ? null : parent?.id,
      idealTalentProfileId: isCore ? idealTalentProfileId : null,
      assessmentId: isCore ? assessmentId : null,
    };

    try {
      if (item?.id) {
        await api.updateCategory(item.id, dto);
        alert("수정되었습니다.");
      } else {
        await api.createCategory(dto);
        alert("등록되었습니다.");
      }
      handleCloseModal();
      await fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "저장에 실패했습니다.");
    }
  };

  const handleDelete = async (item, type) => {
    if (
      type.includes("core") &&
      item.subCompetencyCategories &&
      item.subCompetencyCategories.length > 0
    ) {
      alert(
        "하위역량이 등록된 핵심역량은 삭제할 수 없습니다.\n먼저 하위역량을 모두 삭제해주세요."
      );
      return; // 삭제 절차 중단
    }

    // 기존 삭제 확인 로직
    const itemName = item.name || item.coreCategoryName || item.subCategoryName;
    if (window.confirm(`'${itemName}'을(를) 정말 삭제하시겠습니까?`)) {
      const dto = {
        competencyCategory: {
          codeName: type.includes("core") ? "핵심역량" : "하위역량",
        },
      };
      try {
        await api.deleteCategory(item.id, dto);
        alert("삭제되었습니다.");
        if (type.includes("core") && item.id === selectedCoreId) {
          setSelectedCoreId(null);
        }
        await fetchData();
      } catch (err) {
        alert(err.response?.data?.message || "삭제에 실패했습니다.");
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* 생성/수정 모달 */}
      {editingItem && (
        <AdminCategoryEditModal
          editingItem={editingItem}
          onClose={handleCloseModal}
          onSave={handleSave}
          existingItems={
            editingItem.type.includes("core")
              ? (coreList || []).map((c) => ({
                id: c.id,
                name: c.name || c.coreCategoryName || "",
              }))
              : (editingItem.parent?.subCompetencyCategories || []).map((s) => ({
                id: s.id,
                name: s.name || s.subCategoryName || "",
              }))
          }
          requiredHints={{
            name: true,
            idealTalentProfileId: editingItem?.type?.includes("core") || false,
          }}
        />
      )}

      <div className="grid grid-cols-12 gap-4">
        {/* 왼쪽: 핵심역량 */}
        <div className="col-span-12 lg:col-span-4 space-y-3">
          <div className="adm-card overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">핵심역량</h3>
              <button
                onClick={() => handleOpenModal("create-core")}
                className="adm-btn adm-btn--primary"
              >
                + 추가
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="adm-th w-20">번호</th>
                    <th className="adm-th">핵심역량명</th>
                    <th className="adm-th w-28">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCoreList.length > 0 ? (
                    currentCoreList.map((core, idx) => {
                      const selected = selectedCoreId === core.id;
                      return (
                        <tr
                          key={core.id}
                          onClick={() => setSelectedCoreId(core.id)}
                          aria-selected={selected ? "true" : "false"}
                          className={`cursor-pointer transition-colors hover:bg-gray-50 even:bg-[#F9FAFB] ${selected
                              ? "bg-indigo-50 ring-1 ring-inset ring-indigo-200 font-semibold"
                              : "bg-white"
                            }`}
                        >
                          <td className="adm-td text-center">{idx + 1}</td>
                          <td className="adm-td">
                            {core.name || core.coreCategoryName}
                          </td>
                          <td className="adm-td">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenModal("edit-core", core);
                                }}
                                className="adm-btn adm-btn--secondary h-10 text-xs px-2"
                              >
                                수정
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(core, "core");
                                }}
                                className="adm-btn adm-btn--dangerOutline h-10 text-xs px-2"
                              >
                                삭제
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={3} className="adm-empty">
                        핵심역량이 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* 핵심역량 페이징 */}
            {totalPagesCore > 0 && (
              <div className="px-4 py-3 flex justify-center items-center gap-3 border-t border-gray-200">
                <button
                  onClick={() =>
                    setCurrentPageCore((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPageCore === 1}
                  className="adm-btn adm-btn--secondary h-9 text-xs px-3 disabled:opacity-50"
                >
                  이전
                </button>
                <span className="text-sm text-gray-700">
                  <b>{currentPageCore}</b> / {totalPagesCore}
                </span>
                <button
                  onClick={() =>
                    setCurrentPageCore((prev) =>
                      Math.min(prev + 1, totalPagesCore)
                    )
                  }
                  disabled={currentPageCore === totalPagesCore}
                  className="adm-btn adm-btn--secondary h-9 text-xs px-3 disabled:opacity-50"
                >
                  다음
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽: 하위역량 */}
        <div className="col-span-12 lg:col-span-8 space-y-2">
          <div className="adm-card overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">하위역량</h3>
              <button
                onClick={() =>
                  handleOpenModal(
                    "create-sub",
                    null,
                    coreList.find((c) => c.id === selectedCoreId)
                  )
                }
                disabled={!selectedCoreId}
                className="adm-btn adm-btn--primary disabled:opacity-50"
              >
                + 추가
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="adm-th w-20">번호</th>
                    <th className="adm-th w-25">하위역량명</th>
                    <th className="adm-th w-60">정의</th>
                    <th className="adm-th w-28">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSubList.length > 0 ? (
                    currentSubList.map((sub, idx) => (
                      <tr
                        key={sub.id}
                        className="transition-colors hover:bg-gray-50 even:bg-[#F9FAFB]"
                      >
                        <td className="adm-td text-center">{idx + 1}</td>
                        <td className="adm-td">
                          {sub.name || sub.subCategoryName}
                        </td>
                        <td className="adm-td">
                          {sub.description || sub.subCategoryNote || "-"}
                        </td>
                        <td className="adm-td">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() =>
                                handleOpenModal(
                                  "edit-sub",
                                  sub,
                                  coreList.find((c) => c.id === selectedCoreId)
                                )
                              }
                              className="adm-btn adm-btn--secondary h-10 text-xs px-2"
                            >
                              수정
                            </button>
                            <button
                              onClick={() => handleDelete(sub, "sub")}
                              className="adm-btn adm-btn--dangerOutline h-10 text-xs px-2"
                            >
                              삭제
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="adm-empty">
                        선택된 핵심역량이 없거나 하위역량이 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* 하위역량 페이징 */}
            {totalPagesSub > 0 && (
              <div className="px-4 py-3 flex justify-center items-center gap-3 border-t border-gray-200">
                <button
                  onClick={() =>
                    setCurrentPageSub((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPageSub === 1}
                  className="adm-btn adm-btn--secondary h-9 text-xs px-3 disabled:opacity-50"
                >
                  이전
                </button>
                <span className="text-sm text-gray-700">
                  <b>{currentPageSub}</b> / {totalPagesSub}
                </span>
                <button
                  onClick={() =>
                    setCurrentPageSub((prev) =>
                      Math.min(prev + 1, totalPagesSub)
                    )
                  }
                  disabled={currentPageSub === totalPagesSub}
                  className="adm-btn adm-btn--secondary h-9 text-xs px-3 disabled:opacity-50"
                >
                  다음
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCoreCompetencyCategory;
