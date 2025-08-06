import { useState } from "react"
import ReactModal from "react-modal";
import CoreCompetencySideBar from "../../../features/user/coreCompetency/CoreCompetencySideBar";
import UserTopBar from "../../../component/user/mainpage/UserTopBar";
import MainHeader from "../../../features/user/mainpage/MainHeader";
import ConsultInfoDetail from "../../../features/user/consultation/ConsultInfoDetail";
import ConsultSatisfaction from "../../../features/user/consultation/ConsultSatisfaction";

const ConsultListPage = ()=>{
    const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
    const [satisModalIsOpen, setSatisModalIsOpen] = useState(false);

    const navItems = [
        "상담종합",
        {link: "/consult", name: "상담신청"},
        {link: "/consult/list", name: "상담내역"}
    ]

    const openDetailModal = () => {
        // setSelectedProduct();
        setDetailModalIsOpen(true);
    };
    const closeDetailModal = () => {
        setDetailModalIsOpen(false);
        // setSelectedProduct(null);
    };

    const openSatisModal = () => {
        // setSelectedProduct();
        setSatisModalIsOpen(true);
    };
    const closeSatisModal = () => {
        setSatisModalIsOpen(false);
        // setSelectedProduct(null);
    };

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
                    <div className="flex justify-end items-center gap-2 mb-4">
                        <select className="border border-gray-300 rounded px-2 py-1">
                            <option>-</option>
                            <option>상담상태</option>
                        </select>
                        <select className="border border-gray-300 rounded px-2 py-1">
                            <option>-</option>
                            <option>상담분야</option>
                        </select>
                        <input type="date" className="border border-gray-300 rounded px-2 py-1" placeholder="날짜 시작일" />
                        <input type="date" className="border border-gray-300 rounded px-2 py-1" placeholder="날짜 종료일" />
                        <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-1 rounded">조회</button>
                    </div>

                    <div className="overflow-x-auto text-center">
                        <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                            <th className="border px-3 py-2">번호</th>
                            <th className="border px-3 py-2">신청일</th>
                            <th className="border px-3 py-2">상담일</th>
                            <th className="border px-3 py-2">상담시간</th>
                            <th className="border px-3 py-2">상담자명</th>
                            <th className="border px-3 py-2">상담유형</th>
                            <th className="border px-3 py-2">상태</th>
                            <th className="border px-3 py-2">상세보기</th>
                            <th className="border px-3 py-2">예약취소</th>
                            <th className="border px-3 py-2">만족도 설문</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-center">
                            <td className="border px-3 py-2">1</td>
                            <td className="border px-3 py-2">-</td>
                            <td className="border px-3 py-2">-</td>
                            <td className="border px-3 py-2">-</td>
                            <td className="border px-3 py-2">-</td>
                            <td className="border px-3 py-2">-</td>
                            <td className="border px-3 py-2">-</td>
                            <td className="border px-3 py-2">
                                <button onClick={() => openDetailModal()} className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-3 py-1 rounded">조회</button>
                            </td>
                            <td className="border px-3 py-2">
                                <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-3 py-1 rounded">취소</button>
                            </td>
                            <td className="border px-3 py-2">
                                <button onClick={() => openSatisModal()} className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-3 py-1 rounded">참여하기</button>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ReactModal
                isOpen={detailModalIsOpen}
                onRequestClose={closeDetailModal}
            >
                {/* {selected && <ConsultInfoDetail/>} */}
                <ConsultInfoDetail/>
                <button className=""
                    onClick={closeDetailModal}>
                    닫기
                </button>   
            </ReactModal>
            <ReactModal
                isOpen={satisModalIsOpen}
                onRequestClose={closeSatisModal}
            >
                {/* {selected && <ConsultInfoDetail/>} */}
                <ConsultSatisfaction/>
                <button className=""
                    onClick={closeSatisModal}>
                    닫기
                </button>   
            </ReactModal>
        </div>
    );
}
export default ConsultListPage;