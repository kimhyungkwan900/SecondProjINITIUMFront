import { useState, useEffect } from "react"
import ReactModal from "react-modal";
import ConsultInfoDetail from "../../../features/user/consultation/ConsultInfoDetail";
import RegisterConsultResult from "../../../features/user/consultation/RegisterConsultResult";
import { getConsultList, applyCancel, updateStatus, registerResult } from "../../../api/user/consult/ConsultUserApi"
import PageButton from "../../../component/admin/extracurricular/PageButton";

const PAGE_SIZE = 10;
const CnslrConsultList = ({ searchFilters, current, onPageChange })=>{

    const [selectedInfo, setSelectedInfo] = useState(null);
    const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
    const [resultModalIsOpen, setResultModalIsOpen] = useState(false);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0);
    const [result, setResult] = useState({
        release: '',
        dscsnResultCn: '',
    });

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
                console.log(result);
                setData(result.data.dscsnInfos?.content || []);
                setTotal(result.data.dscsnInfos?.totalElements ?? 0);
            } catch (e) {
                alert("상담 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
                setData([]);
            } 
        })();
    }, [searchFilters, current, refreshKey]);

    const handleCancel = async (dscsnInfoId) => {
        const isConfirmed = confirm("해당 상담을 취소하시겠습니까?");

        if (!isConfirmed) {
           return;
        }

        try {
            await applyCancel(dscsnInfoId);
        } catch (e) {
            alert(e.response.data.message);
        } finally {
            setRefreshKey((k) => k + 1);
        }
    };

    const handleSubmit =async(dscsnInfoId)=>{
    
        const payload = {
            dscsnInfoId: dscsnInfoId,
            release: result.release,
            dscsnResultCn: result.dscsnResultCn,
        };

        if (!payload.release) {
            alert('공개여부를 선택해 주세요.');
            return;
        }
        if (!payload.dscsnResultCn.trim()) {
            alert('상담결과 내용을 입력해 주세요.');
            return;
        }

        try {
            await registerResult(payload);
            alert('상담결과가 등록되었습니다.');
            setResultModalIsOpen(false);
        } catch (e) {
            console.error(e);
            alert('등록 중 오류가 발생했습니다.');
        } finally{
            setRefreshKey((k) => k + 1);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
            setResult((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (dscsnInfoId) => {
        try {
            await updateStatus(dscsnInfoId);
        } catch (e) {
            alert("상태 업데이트 중 오류 발생");
        } finally {
            setRefreshKey((k) => k + 1);
        }
    };

    // const handleResultChange = (e) => {
    //     const { name, value } = e.target;
    //         setResult((prev) => ({ ...prev, [name]: value }));
    // };

    const totalPages = Math.ceil(total / PAGE_SIZE);

    const openDetailModal = (info) => {
        setSelectedInfo(info);
        setDetailModalIsOpen(true);
    };
    const closeDetailModal = () => {
        setDetailModalIsOpen(false);
    };
    
    const openResultModal = (info) => {
        setSelectedInfo(info)
        setResultModalIsOpen(true);
    };
    const closeResultModal = () => {
        setResultModalIsOpen(false);
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
                <th className="border px-3 py-2">예약완료</th>
                <th className="border px-3 py-2">예약취소</th>
                <th className="border px-3 py-2">상담결과 등록</th>
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

                            return(
                            <tr key={item.dscsnInfoId}>
                                <td className="border px-3 py-2">{idx + 1}</td>
                                <td className="border px-3 py-2">{`${scheduleDate.slice(0,4)}-${scheduleDate.slice(4,6)}-${scheduleDate.slice(6)}`}</td>
                                <td className="border px-3 py-2">{`${startTime.slice(0,2)}:${startTime.slice(2)}`}</td>
                                <td className="border px-3 py-2">{empName}</td>
                                <td className="border px-3 py-2">{dscsnTypeName}</td>
                                <td className="border px-3 py-2">{item.dscsnStatus}</td>
                                <td className="border px-3 py-2">
                                    <button onClick={() => openDetailModal(item)} className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-3 py-1 rounded">조회</button>
                                </td>
                                <td className="border px-3 py-2">
                                    <button onClick={() => handleUpdate(item.dscsnInfoId)} className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-3 py-1 rounded">확인</button>
                                </td>
                                <td className="border px-3 py-2">
                                    <button onClick={()=> handleCancel(item.dscsnInfoId)} className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-3 py-1 rounded">취소</button>
                                </td>
                                <td className="border px-3 py-2">
                                    {item.dscsnStatus !== "Completed"? 
                                        <button onClick={() => openResultModal(item)} className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-3 py-1 rounded">상담결과 등록</button>
                                        :
                                        <button className="bg-gray-500 text-white font-medium px-3 py-1 rounded" disabled>상담결과 등록</button>
                                    }
                                </td>
                            </tr>
                        )})
                    )
                }
            </tbody>
            </table>
            {/* 페이징 처리 */}
            <PageButton totalPages={totalPages} currentPage={current} onPageChange={onPageChange} />

            {/* 상세정보 모달창 */}
             <ReactModal
                isOpen={detailModalIsOpen}
                onRequestClose={closeDetailModal}
                overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center p-0 md:p-4 z-50"
                style={{
                    content: {
                    inset: "unset",
                    padding: 0,
                    background: "transparent",
                    border: "none",
                    position: "static",
                    overflow: "visible",
                    }
                }}
            >
                <div className="bg-white rounded-2xl shadow-xl w-[clamp(24rem,92vw,80rem)] max-h-[96dvh] md:max-h-[92dvh] flex flex-col">
                    <ConsultInfoDetail info={selectedInfo} onClose={closeDetailModal}/>
                </div>  
            </ReactModal>
            <ReactModal
                isOpen={resultModalIsOpen}
                onRequestClose={closeResultModal}
                overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center p-0 md:p-4 z-50"
                style={{
                    content: {
                    inset: "unset",
                    padding: 0,
                    background: "transparent",
                    border: "none",
                    position: "static",
                    overflow: "visible",
                    }
                }}
            >
                <div className="bg-white rounded-2xl shadow-xl w-[clamp(24rem,92vw,80rem)] max-h-[96dvh] md:max-h-[92dvh] flex flex-col">
                    <RegisterConsultResult info={selectedInfo} onSubmit={handleSubmit} onChange={handleChange} result={result} onClose={closeResultModal} setRefreshKey={setRefreshKey}/>
                </div>  
            </ReactModal>
        </div>
    );
}
export default CnslrConsultList;