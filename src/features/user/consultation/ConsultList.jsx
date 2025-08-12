import { useState, useEffect } from "react"
import ReactModal from "react-modal";
import ConsultInfoDetail from "../../../features/user/consultation/ConsultInfoDetail";
import ConsultSatisfaction from "../../../features/user/consultation/ConsultSatisfaction";
import { getConsultList } from "../../../api/user/consult/ConsultUserApi"
import PageButton from "../../../component/admin/extracurricular/PagaButton";

const PAGE_SIZE = 10;

const labelById = {
    "Waiting": "예약대기",
    "Confirmed": "예약완료",
    "Canceled": "예약취소",
    "Completed": "상담완료",
};

const ConsultList = ({ searchFilters, current, onPageChange })=>{

    const [selectedInfo, setSelectedInfo] = useState(null);
    const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
    const [satisModalIsOpen, setSatisModalIsOpen] = useState(false);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        (async ()=>{
            try {
                const params = {
                    page: current-1, // 0부터 시작
                    size: PAGE_SIZE,
                    sort: "consultDate,DESC",
                    ...searchFilters,
                };
                const result = await getConsultList(params);
                // console.log(result);
                setData(result.data.dscsnInfos?.content || []);
                setTotal(result.data.dscsnInfos?.totalElements ?? 0);
                // console.log(total)
            } catch (e) {
                alert("상담 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
                setData([]);
            } 
        })();
    }, [searchFilters, current]);

    const totalPages = Math.ceil(total / PAGE_SIZE);

    const openDetailModal = (info) => {
        setSelectedInfo(info);
        setDetailModalIsOpen(true);
    };
    const closeDetailModal = () => {
        setDetailModalIsOpen(false);
        setSelectedInfo(null);
    };

    const openSatisModal = () => {
        setSatisModalIsOpen(true);
    };
    const closeSatisModal = () => {
        setSatisModalIsOpen(false);
    };

    return(
        <div className="overflow-x-auto text-center">
            <table className="min-w-full border-collapse">
            <thead>
                <tr className="bg-gray-200 text-gray-700">
                <th className="border px-3 py-2">번호</th>
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
                {
                    data.length === 0 ? (
                        <tr>
                            <td colSpan={10} className="border px-3 py-2">
                            상담 내역이 없습니다.
                            </td>
                        </tr>
                        ) : (
                        data.map((item, idx) => {
                            const scheduleDate = item.dscsnApplyDto.dscsnScheduleDto.scheduleDate;
                            const startTime = item.dscsnApplyDto.dscsnScheduleDto.startTime;
                            const empName = item.dscsnApplyDto.dscsnScheduleDto.empName;
                            const dscsnTypeName = item.dscsnApplyDto.dscsnKindDto.dscsnTypeName;
                            const statName = labelById[item.dscsnStatus];

                            return(
                            <tr key={item.dscsnInfoId}>
                                <td className="border px-3 py-2">{idx + 1}</td>
                                <td className="border px-3 py-2">{scheduleDate}</td>
                                <td className="border px-3 py-2">{startTime}</td>
                                <td className="border px-3 py-2">{empName}</td>
                                <td className="border px-3 py-2">{dscsnTypeName}</td>
                                <td className="border px-3 py-2">{statName}</td>
                                <td className="border px-3 py-2">
                                    <button onClick={() => openDetailModal(item)} className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-3 py-1 rounded">조회</button>
                                </td>
                                <td className="border px-3 py-2">
                                    <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-3 py-1 rounded">취소</button>
                                </td>
                                <td className="border px-3 py-2">
                                    <button onClick={() => openSatisModal()} className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-3 py-1 rounded">참여하기</button>
                                </td>
                            </tr>
                        )})
                    )
                }
            </tbody>
            </table>
            {/* 페이징 처리 */}
            <PageButton totalPages={totalPages} currentPage={current} onPageChange={onPageChange} />

            {/* 모달창 */}
            <ReactModal
                isOpen={detailModalIsOpen}
                onRequestClose={closeDetailModal}
            >
                <ConsultInfoDetail info={selectedInfo} onClose={closeDetailModal}/>  
            </ReactModal>
            <ReactModal
                isOpen={satisModalIsOpen}
                onRequestClose={closeSatisModal}
            >
                <ConsultSatisfaction onClose={closeSatisModal}/>   
            </ReactModal>
        </div>
    );
}
export default ConsultList;