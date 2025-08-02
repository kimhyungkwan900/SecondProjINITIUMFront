
import CategoryButtons from "../../../component/admin/extracurricular/category/CategoryButtons";
import CategoryFilter from "../../../component/admin/extracurricular/category/CategoryFilter";
import CategorySideContent from "../../../component/admin/extracurricular/category/CateogrySideContent";
import CategoryInputBox from "../../../component/admin/extracurricular/category/CategoryInputBox";
import CategoryList from "../../../component/admin/extracurricular/category/CategoryList";
const ExtracurricularCategoryPage = () => {
  return (
    <div className="w-full p-4">
      <div className="sticky top-0 bg-white z-10 py-2">
        <h1 className="mt-5 font-extrabold text-2xl text-gray-700">
          <span className="bg-blue-700 w-1 text-blue-700 select-none">1</span>
          <span className="ml-3">비교과 분류 체계 페이지</span>
        </h1>
        <hr className="mt-5 border" />
        <CategoryButtons />
        <CategoryFilter />

        {/* 레이아웃 구성 */}
        <div className="flex mt-10 gap-4">
          {/* 좌측 사이드 메뉴 */}
          <CategorySideContent />

          {/* 우측 콘텐츠: Main + Input */}
          <div className="flex flex-col w-full gap-4">
            <CategoryList />
            <CategoryInputBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtracurricularCategoryPage;
