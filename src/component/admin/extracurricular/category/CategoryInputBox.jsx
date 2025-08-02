


const CategoryInputBox = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 border rounded bg-white w-full">
      {/* 핵심역량 */}
      <div className="flex items-center">
        <label className="w-32 font-semibold">핵심역량</label>
        <select className="flex-1 border rounded p-1 outline-none">
          <option>S.융합역량</option>
          <option>S2.자기관리역량</option>
        </select>
      </div>

      {/* 상위분류 */}
      <div className="flex items-center">
        <label className="w-32 font-semibold">상위분류</label>
        <select className="flex-1 border rounded p-1 outline-none">
          <option>S.융합역량</option>
          <option>S1.종합적사고력</option>
        </select>
      </div>

      {/* 주관부서 */}
      <div className="flex items-center">
        <label className="w-32 font-semibold">주관부서</label>
        <select className="flex-1 border rounded p-1 outline-none">
          <option>교육혁신원</option>
          <option>교무처</option>
          <option>학생처</option>
        </select>
      </div>

      {/* 프로그램분류명 */}
      <div className="flex items-center">
        <label className="w-32 font-semibold">프로그램 분류 명</label>
        <input
          type="text"
          className="flex-1 border rounded p-1 outline-none"
          placeholder="분류 명을 입력하세요"
        />
      </div>

      {/* 프로그램 주요 내용 */}
      <div className="col-span-2 flex items-start">
        <label className="w-32 font-semibold pt-1">주요내용</label>
        <textarea
          className="flex-1 border rounded p-1 h-24 outline-none resize-none"
          placeholder="프로그램 내용을 입력하세요"
        ></textarea>
      </div>
    </div>
  );
};

export default CategoryInputBox;