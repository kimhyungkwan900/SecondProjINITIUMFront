import UserTopBar from "../../../component/user/mainpage/UserTopBar";
import MainHeader from "../../../features/user/mainpage/MainHeader";

const ApplyProfessorConsultPage = ()=>{
    return(
        <div className="bg-white min-h-screen border border-gray-300">
            <UserTopBar />
            <MainHeader />

            {/* 상단 회색 박스 */}
            <div className="bg-gray-100 px-12 py-10 border-b border-gray-300 flex justify-between items-center">
                <h1 className="text-3xl font-semibold">상담종합</h1>
                <div className="text-2xl text-gray-600">HOME &gt; 상담종합</div>
            </div>

            {/* 본문: 사이드바 + 콘텐츠 */}
            {/* <div className="flex px-12 py-10">
                
                <div className="flex-1 flex-col ml-10">
                    상담일정 선택 넣기
                </div>
            </div> */}
            <div className="px-20 py-6 bg-white">

            <div className="flex items-center justify-center mb-8 space-x-0">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center">
                        1
                    </div>
                    <div className="mt-2 text-sm font-bold">상담일정 선택</div>
                </div>
                <div className="h-1 flex-1 max-w-20 bg-gray-300"></div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">
                        2
                    </div>
                    <div className="mt-2 text-sm">신청서 작성</div>
                </div>
                <div className="h-1 flex-1 max-w-20 bg-gray-300"></div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">
                        3
                    </div>
                    <div className="mt-2 text-sm">신청 완료</div>
                </div>
            </div>

            <div className="flex items-center gap-3 mt-4 mb-4">
                <input type="text" readOnly className="w-40 border border-black rounded px-3 py-1 text-gray-400" value={"학부 선택"}/>
                <input type="text" readOnly className="w-40 border border-black rounded px-3 py-1 text-gray-400" value={"교수 조회"}/>
                <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-1 rounded">
                    조회
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full table-fixed border-collapse text-sm">
                <thead>
                    <tr>
                        {/* 반복문 처리, 열 총 14개 행 총 13개 */}
                    <th className="border bg-gray-200 px-3 py-2 text-center">시간</th>
                    <th className="border bg-gray-200 px-3 py-2 text-center">07.28<br/>월</th>
                    <th className="border bg-gray-200 px-3 py-2 text-center">07.29<br/>화</th>
                    <th className="border bg-gray-200 px-3 py-2 text-center">07.30<br/>수</th>
                    <th className="border bg-gray-200 px-3 py-2 text-center">07.31<br/>목</th>
                    <th className="border bg-gray-200 px-3 py-2 text-center">08.01<br/>금</th>
                    <th className="border bg-gray-200 px-3 py-2 text-center text-blue-500">08.01<br/>토</th>
                    <th className="border bg-gray-200 px-3 py-2 text-center text-red-500">08.01<br/>일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td className="border px-3 py-2 text-center">9:00</td>
                    <td className="border px-3 py-2"></td>
                    <td className="border px-3 py-2 text-center">
                        <div className="inline-block px-2 py-1 border border-gray-300 rounded bg-gray-50 text-xs">
                            9:00 예약 대기
                        </div>
                    </td>
                    <td className="border px-3 py-2"></td>
                    <td className="border px-3 py-2"></td>
                    <td className="border px-3 py-2"></td>
                    </tr>
                    <tr>
                    <td className="border px-3 py-2 text-center">10:00</td>
                    <td className="border px-3 py-2"></td>
                    <td className="border px-3 py-2"></td>
                    <td className="border px-3 py-2 text-center">
                        <div className="inline-block px-2 py-1 border border-gray-300 rounded bg-gray-50 text-xs">
                        10:00 예약 가능
                        </div>
                    </td>
                    <td className="border px-3 py-2"></td>
                    <td className="border px-3 py-2"></td>
                    </tr>
                    <tr>
                    <td className="border px-3 py-2 text-center">11:00</td>
                    <td className="border px-3 py-2"></td>
                    <td className="border px-3 py-2"></td>
                    <td className="border px-3 py-2"></td>
                    <td className="border px-3 py-2"></td>
                    <td className="border px-3 py-2"></td>
                    </tr>
                    <tr>
                    <td className="border px-3 py-2 text-center">13:30</td>
                    <td className="border px-3 py-2"></td>
                    <td className="border px-3 py-2 text-center">
                        <div className="inline-block px-2 py-1 border border-gray-300 rounded bg-gray-50 text-xs">
                        13:30 예약 가능
                        </div>
                    </td>
                    <td className="border px-3 py-2"></td>
                    <td className="border px-3 py-2"></td>
                    <td className="border px-3 py-2"></td>
                    </tr>
                </tbody>
                </table>
            </div>
            </div>

        </div>
    );
}
export default ApplyProfessorConsultPage;