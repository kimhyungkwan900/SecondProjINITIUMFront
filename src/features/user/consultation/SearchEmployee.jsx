const SearchEmployee = ()=>{
    return(
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
      {/* 제목 */}
      <h2 className="text-2xl font-semibold mb-6 text-center">교원 정보 조회</h2>

      {/* 검색 폼 */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {/* 학부 */}
        <div className="flex flex-col">
          <label htmlFor="department" className="font-medium text-gray-700 mb-1">
            학부
          </label>
          <select
            id="department"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
            defaultValue=""
          >
            <option value="" disabled>
              학부를 선택하세요
            </option>
            <option value="cs">컴퓨터공학부</option>
            <option value="sw">소프트웨어학부</option>
            <option value="ee">전기전자공학부</option>
            {/* ... */}
          </select>
        </div>

        {/* 교원번호 */}
        <div className="flex flex-col">
          <label htmlFor="facultyId" className="font-medium text-gray-700 mb-1">
            교원번호
          </label>
          <input
            id="facultyId"
            type="text"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
            placeholder="교원번호 입력"
          />
        </div>

        {/* 이름 */}
        <div className="flex flex-col">
          <label htmlFor="facultyName" className="font-medium text-gray-700 mb-1">
            이름
          </label>
          <input
            id="facultyName"
            type="text"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
            placeholder="이름 입력"
          />
        </div>
      </div>

      {/* 버튼 그룹 */}
      <div className="flex justify-end space-x-3">
        <button
        //   onClick={}
          className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-2 rounded"
        >
          조회
        </button>
        <button
        //   onClick={}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded"
        >
          닫기
        </button>
      </div>
    </div>
    );
}
export default SearchEmployee;