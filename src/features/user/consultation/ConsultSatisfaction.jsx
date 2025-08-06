const ConsultSatisfaction = ()=>{
    return(
        <div class="p-6 bg-white rounded-lg shadow-lg">
            <h2 class="text-2xl font-semibold text-center mb-6">상담 만족도 설문조사</h2>

            <table class="w-1/2 table-fixed border-collapse mb-6">
                <tbody>
                <tr>
                    <th class="w-1/4 bg-gray-200 border px-4 py-2 text-center">설문 연도</th>
                    <td class="border px-4 py-2">2025</td>
                </tr>
                <tr>
                    <th class="bg-gray-200 border px-4 py-2 text-center">설문지 유형</th>
                    <td class="border px-4 py-2">상담 만족도</td>
                </tr>
                </tbody>
            </table>

            <div class="mb-6">
                <div class="bg-gray-200 px-4 py-2 font-bold">1. 상담은 만족하십니까?</div>
                <div class="border border-gray-300 p-4 space-y-2">
                <label class="flex items-center">
                    <input type="radio" name="q1" value="1" class="h-4 w-4 text-blue-700 border-gray-300 focus:ring-blue-700" />
                    <span class="ml-2">전혀 그렇지 않다.</span>
                </label>
                <label class="flex items-center">
                    <input type="radio" name="q1" value="2" class="h-4 w-4 text-blue-700 border-gray-300 focus:ring-blue-700" />
                    <span class="ml-2">그렇지 않다.</span>
                </label>
                <label class="flex items-center">
                    <input type="radio" name="q1" value="3" class="h-4 w-4 text-blue-700 border-gray-300 focus:ring-blue-700" />
                    <span class="ml-2">보통이다.</span>
                </label>
                <label class="flex items-center">
                    <input type="radio" name="q1" value="4" class="h-4 w-4 text-blue-700 border-gray-300 focus:ring-blue-700" />
                    <span class="ml-2">그렇다.</span>
                </label>
                <label class="flex items-center">
                    <input type="radio" name="q1" value="5" class="h-4 w-4 text-blue-700 border-gray-300 focus:ring-blue-700" />
                    <span class="ml-2">매우 그렇다.</span>
                </label>
                </div>
            </div>

            <div class="mb-6">
                <div class="bg-gray-200 px-4 py-2 font-bold">2. 개선사항 (1000자 이내)</div>
                <textarea
                class="w-full border border-gray-300 p-3 mt-1 resize-none focus:outline-none focus:ring-2 focus:ring-blue-700"
                rows="5"
                placeholder="개선 사항을 입력해주세요 (최대 1000자)"
                ></textarea>
            </div>

            <div class="flex justify-center gap-4">
                <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-6 py-2 rounded">
                닫기
                </button>
                <button class="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-2 rounded">
                제출
                </button>
            </div>
        </div>
    );
}
export default ConsultSatisfaction;