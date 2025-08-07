const SearchEmployee = ()=>{
    return(
        <div class="w-full max-w-3xl mx-auto p-6 flex flex-col space-y-4">
            {/* <!-- 상단 검색 바 --> */}
            <div class="flex items-center space-x-4">
                {/* <!-- 학부 선택 --> */}
                <select class="border border-gray-300 rounded px-3 py-2">
                    <option value="">학부 선택</option>
                    <option value="">컴퓨터공학부</option>
                    <option value="">소프트웨어학부</option>
                </select>

                {/* <!-- 교원번호 입력 --> */}
                <input
                type="text"
                class="border border-gray-300 rounded px-3 py-2 flex-1"
                placeholder="교원번호 입력"
                />

                {/* <!-- 이름 입력 --> */}
                <input
                type="text"
                class="border border-gray-300 rounded px-3 py-2 flex-1"
                placeholder="이름 입력"
                />

                {/* <!-- 조회 버튼 --> */}
                <button class="h-10 bg-[#222E8D] text-white hover:bg-[#28B8B2] transition font-medium px-4 py-2 rounded">
                    조회
                </button>
            </div>

            {/* <!-- 출력창 --> */}
            <div class="border border-gray-300 rounded p-4 h-64 overflow-auto">
                {/* <!-- 조회된 교원 정보 목록이 여기 출력됩니다 --> */}
                <ul class="divide-y divide-gray-200">
                <li class="py-2">교원 A 정보</li>
                <li class="py-2">교원 B 정보</li>
                <li class="py-2">교원 C 정보</li>
                </ul>
            </div>

            {/* <!-- 닫기 버튼 --> */}
            <div class="flex justify-end">
                <button class="bg-red-500 text-white hover:bg-red-700 transition font-medium px-4 py-2 rounded">
                닫기
                </button>
            </div>
        </div>
    );
}
export default SearchEmployee;