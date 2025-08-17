import { useState, useEffect, useMemo } from "react"; 
import { applyCancel, getConsultList } from "../../../api/user/consult/ConsultUserApi";
import PageButton from "../extracurricular/PageButton";
import ReactModal from "react-modal";
import ConsultInfoDetail from "../../../features/user/consultation/ConsultInfoDetail";
import ConsultSatisfaction from "../../../features/user/consultation/ConsultSatisfaction";

const PAGE_SIZE = 10;

const CounselorConsultList = ({ counselorName, searchFilters, current, onPageChange }) => {
    const [selectedInfo, setSelectedInfo] = useState(null);
    const [selectedInfoId, setSelectedInfoId] = useState("");
    const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
    const [satisModalIsOpen, setSatisModalIsOpen] = useState(false);
    const [data, setData] = useState([]); // API로 받은 전체 데이터를 저장
    const [total, setTotal] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const params = {
                    page: current - 1,
                    size: PAGE_SIZE,
                    sort: "consultDate,DESC",
                    ...searchFilters,
                };
                const result = await getConsultList(params);
                setData(result.data.dscsnInfos?.content || []);
                setTotal(result.data.dscsnInfos?.totalElements ?? 0);
            } catch (e) {
                console.error("API Error:", e);
                alert("상담 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
                setData([]);
            }
        })();
    }, [searchFilters, current, refreshKey]);

    // useMemo를 사용하여 프론트엔드에서 counselorName으로 데이터 필터링
    const filteredData = useMemo(() => {
        if (!counselorName) {
            return [];
        }
        return data.filter(item => 
            item.dscsnApplyDto.dscsnScheduleDto.empName === counselorName
        );
    }, [data, counselorName]);

    const handleCancel = async (dscsnInfoId) => {
        const isConfirmed = confirm("해당 상담을 취소하시겠습니까?");
        if (!isConfirmed) return;

        try {
            await applyCancel(dscsnInfoId);
        } catch (e) {
            alert(e.response.data.message);
        } finally {
            setRefreshKey((k) => k + 1);
        }
    };
    
    const totalPages = Math.ceil(total / PAGE_SIZE);
    const openDetailModal = (info) => {
        setSelectedInfo(info);
        setDetailModalIsOpen(true);
    };
    const closeDetailModal = () => setDetailModalIsOpen(false);
    const openSatisModal = (infoId) => {
        setSelectedInfoId(infoId)
        setSatisModalIsOpen(true);
    };
    const closeSatisModal = () => setSatisModalIsOpen(false);

    return (
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
                    {/* 원본 data 대신 필터링된 filteredData를 사용 */}
                    {
                        filteredData.length === 0 ? (
                            <tr>
                                <td colSpan={10} className="border px-3 py-2">
                                    담당 상담 내역이 없습니다.
                                </td>
                            </tr>
                        ) : (
                            filteredData.map((item, idx) => {
                                const { scheduleDate, startTime, empName } = item.dscsnApplyDto.dscsnScheduleDto;
                                const { dscsnTypeName } = item.dscsnApplyDto.dscsnKindDto;

                                return (
                                    <tr key={item.dscsnInfoId}>
                                        <td className="border px-3 py-2">{idx + 1}</td>
                                        <td className="border px-3 py-2">{`${scheduleDate.slice(0, 4)}-${scheduleDate.slice(4, 6)}-${scheduleDate.slice(6)}`}</td>
                                        <td className="border px-3 py-2">{`${startTime.slice(0, 2)}:${startTime.slice(2)}`}</td>
                                        <td className="border px-3 py-2">{empName}</td>
                                        <td className="border px-3 py-2">{dscsnTypeName}</td>
                                        <td className="border px-3 py-2">{item.dscsnStatus}</td>
                                        <td className="border px-3 py-2">
                                            <button onClick={() => openDetailModal(item)} className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-3 py-1 rounded">조회</button>
                                        </td>
                                        <td className="border px-3 py-2">
                                            <button onClick={() => handleCancel(item.dscsnInfoId)} className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-3 py-1 rounded">취소</button>
                                        </td>
                                        <td className="border px-3 py-2">
                                            {item.dscsnStatus === "Completed" ? 
                                                <button onClick={() => openSatisModal(item)} className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-3 py-1 rounded">참여하기</button>
                                                :
                                                <button className="bg-gray-500 text-white font-medium px-3 py-1 rounded" disabled>참여하기</button>
                                            }
                                        </td>
                                    </tr>
                                );
                            })
                        )
                    }
                </tbody>
            </table>
            
            {/* 페이지네이션은 전체 데이터를 기준으로 동작하지만, 화면에는 필터링된 목록만 보입니다. */}
            <PageButton totalPages={totalPages} currentPage={current} onPageChange={onPageChange} />

            {/* Modal Components */}
            <ReactModal isOpen={detailModalIsOpen} onRequestClose={closeDetailModal} /* ...styles */ >
                <ConsultInfoDetail info={selectedInfo} onClose={closeDetailModal}/>
            </ReactModal>
            <ReactModal isOpen={satisModalIsOpen} onRequestClose={closeSatisModal} /* ...styles */ >
                <ConsultSatisfaction infoId={selectedInfoId} onClose={closeSatisModal} setRefreshKey={setRefreshKey}/>
            </ReactModal>
        </div>
    );
}

export default CounselorConsultList;