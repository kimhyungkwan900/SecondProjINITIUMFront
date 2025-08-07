const RegisterConsultResult = ()=>{
    return(
        <div class="p-6 border border-gray-300">
            <table class="w-full table-fixed border-collapse">
                <tbody>
                <tr>
                    <th class="w-1/4 bg-gray-200 border border-gray-300 px-4 py-2 text-left">연도/학기</th>
                    <td class="border border-gray-300 px-4 py-2">(신청서 정보 가져오기)</td>
                    <th class="w-1/4 bg-gray-200 border border-gray-300 px-4 py-2 text-left">상담일자</th>
                    <td class="border border-gray-300 px-4 py-2">(신청서 정보 가져오기)</td>
                </tr>

                <tr>
                    <th class="bg-gray-200 border border-gray-300 px-4 py-2 text-left">상담시간</th>
                    <td class="border border-gray-300 px-4 py-2">(신청서 정보 가져오기)</td>
                    <th class="bg-gray-200 border border-gray-300 px-4 py-2 text-left">상담장소</th>
                    <td class="border border-gray-300 px-4 py-2">(신청서 정보 가져오기)</td>
                </tr>

                <tr>
                    <th class="bg-gray-200 border border-gray-300 px-4 py-2 text-left">상담자</th>
                    <td class="border border-gray-300 px-4 py-2">(신청서 정보 가져오기)</td>
                    <th class="bg-gray-200 border border-gray-300 px-4 py-2 text-left">진행방식</th>
                    <td class="border border-gray-300 px-4 py-2">(신청서 정보 가져오기)</td>
                </tr>

                <tr>
                    <th class="bg-gray-200 border border-gray-300 px-4 py-2 text-left">상담항목</th>
                    <td class="border border-gray-300 px-4 py-2">(신청서 정보 가져오기)</td>
                    <th class="bg-gray-200 border border-gray-300 px-4 py-2 text-left">공개여부</th>
                    <td class="border border-gray-300 px-4 py-2">
                    <label class="inline-flex items-center mr-6">
                        <input type="radio" name="public" value="Y" class="h-4 w-4 text-blue-700 border-gray-300 focus:ring-blue-700"/>
                        <span class="ml-2">Y</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="radio" name="public" value="N" class="h-4 w-4 text-blue-700 border-gray-300 focus:ring-blue-700"/>
                        <span class="ml-2">N</span>
                    </label>
                    </td>
                </tr>

                <tr>
                    <th class="bg-gray-200 border border-gray-300 px-4 py-2 text-left align-top">상담신청 내용</th>
                    <td class="border border-gray-300 px-4 py-2" colspan="3">
                    (신청서 정보 가져오기)
                    </td>
                </tr>

                <tr>
                    <th class="bg-gray-200 border border-gray-300 px-4 py-2 text-left align-top">상담결과 내용</th>
                    <td class="border border-gray-300 p-0" colspan="3">
                        <input
                            type="text"
                            class="block w-full h-full border-0 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
                            placeholder="결과를 입력해주세요"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div class="flex justify-end mt-4 space-x-2">
                <button class="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded">
                등록
                </button>
                <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">
                취소
                </button>
            </div>
        </div>
    );
}
export default RegisterConsultResult;