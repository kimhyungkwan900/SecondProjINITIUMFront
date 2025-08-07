const ConsultApplyForm = ()=>{
    return(
        <div className="w-4/5 px-20 py-6 mx-auto">
            <div className="flex items-center justify-center mb-8 space-x-0">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">
                        1
                    </div>
                    <div className="mt-2 text-sm">상담일정 선택</div>
                </div>
                <div className="h-1 flex-1 max-w-20 bg-gray-300"></div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center">
                        2
                    </div>
                    <div className="mt-2 text-sm font-bold">신청서 작성</div>
                </div>
                <div className="h-1 flex-1 max-w-20 bg-gray-300"></div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">
                        3
                    </div>
                    <div className="mt-2 text-sm">신청 완료</div>
                </div>
            </div>
            <div className="overflow-auto">
                <div className="border-2 border-gray-700">
                <table className="w-full table-fixed border-collapse divide-y divide-gray-500">
                    <tbody>
                    {/* 상담 구분 */}
                    <tr>
                        <th className="px-4 py-2 bg-gray-100 border border-gray-500 text-center">
                        상담 구분
                        </th>
                        <td className="px-4 py-2 border border-gray-500" colSpan={3}>
                        테스트
                        </td>
                    </tr>

                    {/* 이름 / 학번 */}
                    <tr>
                        <th className="px-4 py-2 bg-gray-100 border border-gray-500 text-center">
                        이름
                        </th>
                        <td className="px-4 py-2 border border-gray-500"></td>
                        <th className="px-4 py-2 bg-gray-100 border border-gray-500 text-center">
                        학번
                        </th>
                        <td className="px-4 py-2 border border-gray-500"></td>
                    </tr>

                    {/* 소속 */}
                    <tr>
                        <th className="px-4 py-2 bg-gray-100 border border-gray-500 text-center">
                        소속
                        </th>
                        <td className="px-4 py-2 border border-gray-500" colSpan={3}></td>
                    </tr>

                    {/* 연락처 / 이메일 */}
                    <tr>
                        <th className="px-4 py-2 bg-gray-100 border border-gray-500 text-center">
                        연락처
                        </th>
                        <td className="px-4 py-2 border border-gray-500" colSpan={3}></td>
                    </tr>

                    {/* 상담일자 / 상담시간 */}
                    <tr>
                        <th className="px-4 py-2 bg-gray-100 border border-gray-500 text-center">
                        상담일자
                        </th>
                        <td className="px-4 py-2 border border-gray-500"></td>
                        <th className="px-4 py-2 bg-gray-100 border border-gray-500 text-center">
                        상담시간
                        </th>
                        <td className="px-4 py-2 border border-gray-500"></td>
                    </tr>

                    {/* 상담자 */}
                    <tr>
                        <th className="px-4 py-2 bg-gray-100 border border-gray-500 text-center">
                        상담자
                        </th>
                        <td className="px-4 py-2 border border-gray-500" colSpan={3}></td>
                    </tr>

                    {/* 상담유형 */}
                    <tr>
                        <th className="px-4 py-2 bg-gray-100 border border-gray-500 text-center">
                        상담유형
                        </th>
                        <td className="px-4 py-2 border border-gray-500" colSpan={3}></td>
                    </tr>

                    {/* 상담신청 내용 */}
                    <tr className="h-44">
                        <th className="px-4 py-2 bg-gray-100 border border-gray-500 text-center align-middle">
                        상담신청 내용
                        </th>
                        <td
                        className="px-4 py-2 border border-gray-500 whitespace-pre-wrap"
                        colSpan={3}
                        ></td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <div className="flex justify-end items-center gap-3 mr-2 mt-2 mb-2">
                    <button className="bg-red-500 text-white hover:bg-red-700 transition no-underline font-medium px-4 py-1 rounded">
                        뒤로
                    </button>
                    <button className="bg-[#222E8D] text-white hover:bg-[#28B8B2] transition no-underline font-medium px-4 py-1 rounded">
                        제출
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ConsultApplyForm;