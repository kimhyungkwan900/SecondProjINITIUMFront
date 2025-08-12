import { useState, useEffect } from "react"
import { getConsultList } from "../../../api/user/consult/ConsultUserApi"
import PageButton from "../../../component/admin/extracurricular/PagaButton";

const ConsultList = ({ searchFilters, currentPage, onPageChange })=>{
    const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
    const [satisModalIsOpen, setSatisModalIsOpen] = useState(false);
    const [current, setCurrent] = useState(1); // 1-based
    const [total, setTotal] = useState(0);

    useEffect(() => {
        (async ()=>{
            try{
                const kinds = await getConsultList(type);

                setApplyInfo(prev => {
                    if (prev.dscsnKindId != null && prev.dscsnKindId !== "") return prev;
                    const first = kinds?.[0]?.dscsnKindId;
                    return first == null ? prev : { ...prev, dscsnKindId: String(first) };
                });
            } catch(e){
                console.log("에러 발생: " + e);
            }
        })();
    }, []);

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
export default ConsultList;