import { useState, useEffect } from "react";
import CategoryButtons from "../../../component/admin/extracurricular/category/CategoryButtons";
import CategoryFilter from "../../../component/admin/extracurricular/category/CategoryFilter";
import CategoryInputBox from "../../../component/admin/extracurricular/category/CategoryInputBox";
import CategoryList from "../../../component/admin/extracurricular/category/CategoryList";
import CategorySideContent from "../../../component/admin/extracurricular/category/CateogrySideContent";
import {
  getCategory,
  insertCategory,
  deleteCategory,
  updateCategory,
} from "../../../api/admin/extracurricular/category/CategoryApi";
import AdminSectionHeader from "../../../component/admin/AdminSectionHeader";

const ExtracurricularCategoryPage = () => {
  // 필터 & 리스트 상태
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [selectedCompetency, setSelectedCompetency] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const [programList, setProgramList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 입력 상태
  const [inputValues, setInputValues] = useState({
    ctgryId: "",
    competency: "",
    stgrId: "",
    subjectCode: "",
    ctgryNm: "",
    ctgryDtl: "",
  });

  const handleSelectItem = (item) => {
    setInputValues({
      ctgryId: item.ctgryId || "",
      competency: item.coreCategoryId || "",
      stgrId: item.stgrId || "",
      subjectCode: item.subjectCode || "",
      ctgryNm: item.ctgryNm || "",
      ctgryDtl: item.ctgryDtl || "",
      ctgryUseYn: item.ctgryUseYn || "N",
    });
  };

  // 리스트 조회
  useEffect(() => {
    if (selectedCategoryId !== null) {
      getCategory({ categoryId: selectedCategoryId })
        .then(setProgramList)
        .catch(() => setProgramList([]));
    } else {
      setProgramList([]);
    }
  }, [selectedCategoryId]);

  // 필터 조회
  const onSearch = () => {
    getCategory({
      categoryId: null,
      programName: filterText,
      competencyId: selectedCompetency,
      departmentCode: selectedDepartment,
    })
      .then(setProgramList)
      .catch(() => setProgramList([]));
  };

  // 신규 저장
  const onInsert = async () => {
    try {
      const dataToSave = {
        competency: inputValues.competency,
        stgrId: inputValues.stgrId,
        subjectCode: inputValues.subjectCode,
        ctgryNm: inputValues.ctgryNm,
        ctgryDtl: inputValues.ctgryDtl,
      };
      await insertCategory(dataToSave);
      alert("신규 분류가 저장되었습니다.");
      onSearch();
      setInputValues({
        competency: "",
        stgrId: "",
        subjectCode: "",
        ctgryNm: "",
        ctgryDtl: "",
      });
    } catch (e) {
      console.error("저장 중 오류", e);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  // 삭제
  const onDelete = async () => {
    const idToDelete = inputValues.ctgryId;
    if (!idToDelete) {
      alert("삭제할 항목을 선택해주세요.");
      return;
    }
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteCategory(idToDelete);
      alert("삭제가 완료되었습니다.");
      onSearch();
      setInputValues({
        ctgryId: "",
        competency: "",
        stgrId: "",
        subjectCode: "",
        ctgryNm: "",
        ctgryDtl: "",
      });
    } catch (error) {
      console.error("삭제 실패", error);
      alert("삭제에 실패했습니다.");
    }
  };

  // 수정
  const onUpdate = async () => {
    if (!inputValues.ctgryId) {
      alert("수정할 항목을 선택해주세요.");
      return;
    }
    try {
      const dataToUpdate = {
        ctgryId: inputValues.ctgryId,
        competency: inputValues.competency,
        stgrId: inputValues.stgrId,
        subjectCode: inputValues.subjectCode,
        ctgryNm: inputValues.ctgryNm,
        ctgryDtl: inputValues.ctgryDtl,
        ctgryUseYn: inputValues.ctgryUseYn || "N",
      };
      await updateCategory(dataToUpdate);
      alert("수정이 완료되었습니다.");
      onSearch();
      setInputValues({
        ctgryId: "",
        competency: "",
        stgrId: "",
        subjectCode: "",
        ctgryNm: "",
        ctgryDtl: "",
        ctgryUseYn: "N",
      });
    } catch (e) {
      console.error("수정 중 오류", e);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* 헤더 */}
      <AdminSectionHeader title="비교과 분류 체계" />

      {/* 검색바 + 액션바 (한 줄 고정, 가로 스크롤 허용) */}
      <section className="adm-card p-4 mt-4">
        <div className="flex items-end w-full overflow-x-auto">
          {/* 필터: 남는 공간 전부 사용 */}
          <div className="flex-1 min-w-0 pr-4">
            <div className="w-full">
              <CategoryFilter
                filterText={filterText}
                onChangeFilterText={setFilterText}
                onChangeCompetency={(selected) => setSelectedCompetency(selected)}
                onChangeDepartment={(dept) => setSelectedDepartment(dept)}
              />
            </div>
          </div>

          {/* 버튼: 내용만큼만, 줄바꿈 없음 */}
          <div className="shrink-0 pl-4">
            <CategoryButtons
              onSearch={onSearch}
              onInsert={onInsert}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          </div>
        </div>
      </section>

      {/* 본문: 좌(트리) / 우(목록+입력) — 하나의 카드에 붙여 배치 */}
      <section className="adm-card p-0">
        <div className="flex flex-col lg:flex-row">
          {/* 좌측: 프로그램분류 (폭/높이 넓게, shrink 방지) */}
          <aside className="w-full shrink-0 min-w-[420px] lg:basis-[420px]  lg:border-r border-gray-200">
            <div className="p-4 h-full">
              <CategorySideContent onSelectCategory={setSelectedCategoryId} />
            </div>
          </aside>

          {/* 우측: 목록 + 입력 */}
          <main className="w-full lg:flex-1 min-w-0">
            <div className="p-4">
              <CategoryList
                programList={programList}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onToggleUseYn={(id, newYn) => {
                  setProgramList((prev) =>
                    prev.map((item) =>
                      item.ctgryId === id ? { ...item, ctgryUseYn: newYn } : item
                    )
                  );
                }}
                onSelectItem={handleSelectItem}
              />
            </div>

            <div className="border-t border-gray-200" />

            <div className="p-4">
              <div className="adm-card p-4">
                <CategoryInputBox
                  inputValues={inputValues}
                  setInputValues={setInputValues}
                />
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default ExtracurricularCategoryPage;
