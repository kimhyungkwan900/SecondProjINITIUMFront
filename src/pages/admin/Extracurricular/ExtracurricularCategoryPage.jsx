import { useState, useEffect } from "react";
import CategoryButtons from "../../../component/admin/extracurricular/category/CategoryButtons";
import CategoryFilter from "../../../component/admin/extracurricular/category/CategoryFilter";
import CategoryInputBox from "../../../component/admin/extracurricular/category/CategoryInputBox";
import CategoryList from "../../../component/admin/extracurricular/category/CategoryList";
import CategorySideContent from "../../../component/admin/extracurricular/category/CateogrySideContent";
import { getCategory, insertCategory, deleteCategory, updateCategory } from "../../../api/admin/extracurricular/category/CategoryApi";

const ExtracurricularCategoryPage = () => {
  // 필터 및 리스트 관련 상태
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [selectedCompetencies, setSelectedCompetencies] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [programList, setProgramList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [setSelectedCategoryIdForDelete] = useState(null);

  // 신규 입력 상태 (CategoryInputBox에서 입력받을 값들)
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
    competency: item.competency || "",
    stgrId: item.stgrId || "",
    subjectCode: item.subjectCode || "",
    ctgryNm: item.ctgryNm || "",
    ctgryDtl: item.ctgryDtl || "",
    ctgryUseYn: item.ctgryUseYn || "N", 
  });
  setSelectedCategoryIdForDelete(item.ctgryId);  // 삭제할 ID도 저장
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
      competencyIds: selectedCompetencies,
      departmentCode: selectedDepartment,
    })
      .then(setProgramList)
      .catch(() => setProgramList([]));
  };
  // 신규 저장 함수
  const onInsert = async () => {
  try {
    const dataToSave = {
      competency: inputValues.competency,
      stgrId: inputValues.stgrId,
      subjectCode: inputValues.subjectCode,
      ctgryNm: inputValues.ctgryNm,
      ctgryDtl: inputValues.ctgryDtl,
    };
      console.log(dataToSave.subjectCode);
      await insertCategory(dataToSave);
        alert("신규 분류가 저장되었습니다.");
        onSearch(); // 저장 후 리스트 재조회
        setInputValues({
          competency: "",
          stgrId: "",
          subjectCode: "",
          ctgryNm: "",
          ctgryDtl: "",
        }); // 입력 초기화
      } catch (e) {
        console.error("저장 중 오류", e);
        alert("저장 중 오류가 발생했습니다.");
      }
    };
  // 삭제 함수
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
      ctgryId: "", // 초기화
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

// 수정 함수
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
    onSearch();  // 목록 갱신
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
    <div className="w-full p-4">
      <div className="sticky top-0 bg-white z-10 py-2">
        <h1 className="font-extrabold text-2xl text-gray-700">
          <span className="bg-blue-700 w-1 text-blue-700 select-none">1</span>
          <span className="ml-3">비교과 분류 체계 페이지</span>
        </h1>
        <hr className="border" />
        <CategoryButtons
          onSearch={onSearch}
          onInsert={onInsert} // 신규 저장 함수 전달
          onDelete={onDelete}
          onUpdate={onUpdate}
        />

        <CategoryFilter
          filterText={filterText}
          onChangeFilterText={setFilterText}
          onChangeCompetency={(selected) => setSelectedCompetencies(selected)}
          onChangeDepartment={(dept) => setSelectedDepartment(dept)}
        />

        <div className="flex mt-10 gap-4">
          <CategorySideContent onSelectCategory={setSelectedCategoryId} />

          <div className="flex flex-col w-full gap-4">
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
                  onSelectItem={handleSelectItem}  // 여기 추가
                />
            <CategoryInputBox
              inputValues={inputValues}
              setInputValues={setInputValues} // 상태 업데이트 함수 전달
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtracurricularCategoryPage;