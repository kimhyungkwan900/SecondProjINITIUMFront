// import Modal from "react-modal";
import CoreCompetencySideBar from "../../../features/user/coreCompetency/CoreCompetencySideBar";
import UserTopBar from "../../../component/user/mainpage/UserTopBar";
import MainHeader from "../../../features/user/mainpage/MainHeader";

const ConsultListPage = ()=>{
    const navItems = [
        "상담종합",
        {link: "/consult", name: "상담신청"},
        {link: "/consult/list", name: "상담내역"}
    ]

    return(
        <div className="bg-white min-h-screen border border-gray-300">
            <UserTopBar />
            <MainHeader />

            {/* 상단 회색 박스 */}
            <div className="bg-gray-100 px-12 py-10 border-b border-gray-300 flex justify-between items-center">
                <h1 className="text-3xl font-semibold">상담종합</h1>
                <div className="text-2xl text-gray-600">HOME &gt; 상담종합 &gt; 상담내역</div>
            </div>

            {/* 본문: 사이드바 + 콘텐츠 */}
            <div className="flex px-12 py-10">
                {/* 좌측 사이드바 */}
                <CoreCompetencySideBar navItems={navItems}/>

                {/* 우측 본문 콘텐츠 */}
                <div className="flex-1 ml-10 p-4">
                    <div class="flex justify-end items-center gap-2 mb-4">
                        <select class="border border-gray-300 rounded px-2 py-1">
                            <option>-</option>
                            <option>상담상태</option>
                        </select>
                        <select class="border border-gray-300 rounded px-2 py-1">
                            <option>-</option>
                            <option>상담분야</option>
                        </select>
                        <input type="date" class="border border-gray-300 rounded px-2 py-1" placeholder="날짜 시작일" />
                        <input type="date" class="border border-gray-300 rounded px-2 py-1" placeholder="날짜 종료일" />
                        <button class="bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-1 rounded">조회</button>
                    </div>

                    <div class="overflow-x-auto text-center">
                        <table class="min-w-full border-collapse">
                        <thead>
                            <tr class="bg-gray-200 text-gray-700">
                            <th class="border px-3 py-2">번호</th>
                            <th class="border px-3 py-2">신청일</th>
                            <th class="border px-3 py-2">상담일</th>
                            <th class="border px-3 py-2">상담시간</th>
                            <th class="border px-3 py-2">상담자명</th>
                            <th class="border px-3 py-2">상담유형</th>
                            <th class="border px-3 py-2">상태</th>
                            <th class="border px-3 py-2">상세보기</th>
                            <th class="border px-3 py-2">예약취소</th>
                            <th class="border px-3 py-2">만족도 설문</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center">
                            <td class="border px-3 py-2">1</td>
                            <td class="border px-3 py-2">-</td>
                            <td class="border px-3 py-2">-</td>
                            <td class="border px-3 py-2">-</td>
                            <td class="border px-3 py-2">-</td>
                            <td class="border px-3 py-2">-</td>
                            <td class="border px-3 py-2">-</td>
                            <td class="border px-3 py-2">
                                <button class="bg-blue-700 hover:bg-blue-800 text-white font-medium px-3 py-1 rounded">조회</button>
                            </td>
                            <td class="border px-3 py-2">
                                <button class="bg-blue-700 hover:bg-blue-800 text-white font-medium px-3 py-1 rounded">취소</button>
                            </td>
                            <td class="border px-3 py-2">
                                <button class="bg-blue-700 hover:bg-blue-800 text-white font-medium px-3 py-1 rounded">참여하기</button>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ConsultListPage;