import { useState, useEffect } from "react"
import { getDscsnKind } from "../../../api/user/consult/ConsultUserApi";

const labelById = {
    "A": "지도교수 상담",
    "C": "진로취업 상담",
    "P": "심리상담",
    "L": "학습상담",
};

const initState = {
    studentNo: '',
    dscsnDtId: '',
    studentTelno: '',
    dscsnApplyCn: '',
    dscsnKindId: '',
}

const ConsultApplyForm = ({userInfo, type, schedule, onSubmit, onBack})=>{

    const typeName = labelById[type] ?? "-";
    initState.studentNo = userInfo.studentNo;
    initState.dscsnDtId = schedule.dscsnDtId;


    const [dscsnKinds, setDscsnKinds] = useState([]);
    const [applyInfo, setApplyInfo] = useState({...initState});
    
    useEffect(() => {
        (async ()=>{
            try{
                const kinds = await getDscsnKind(type);
                setDscsnKinds(kinds);

                setApplyInfo(prev => {
                    if (prev.dscsnKindId != null && prev.dscsnKindId !== "") return prev;
                    const first = kinds?.[0]?.dscsnKindId;
                    return first == null ? prev : { ...prev, dscsnKindId: String(first) };
                });
            } catch(e){
                console.log("에러 발생: " + e);
            }
        })();
    }, [type]);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setApplyInfo(prev => ({ ...prev, [name]: name === "dscsnKindId" ? String(value) : value }));
    }

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
                <div className="overflow-auto">
                    <div className="border-2 border-gray-700">
                        {/* 상담 구분 */}
                        <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-500 md:divide-x md:divide-gray-500">
                            <div className="px-4 py-2 bg-gray-100 text-center">상담 구분</div>
                            <div className="px-4 py-2 md:col-span-3">
                                {typeName}
                            </div>
                        </div>

                        {/* 이름 / 학번 */}
                        <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-500 md:divide-x md:divide-gray-500">
                            <div className="px-4 py-2 bg-gray-100 text-center">이름</div>
                            <div className="px-4 py-2">{userInfo.name}</div>
                            <div className="px-4 py-2 bg-gray-100 text-center">학번</div>
                            <div className="px-4 py-2">{userInfo.studentNo}</div>
                        </div>

                        {/* 소속 */}
                        <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-500 md:divide-x md:divide-gray-500">
                            <div className="px-4 py-2 bg-gray-100 text-center">학과</div>
                            <div className="px-4 py-2 md:col-span-3">{userInfo.schoolSubject}</div>
                        </div>

                        {/* 연락처 */}
                        <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-500 md:divide-x md:divide-gray-500">
                            <div className="px-4 py-2 bg-gray-100 text-center">연락처</div>
                            <div className="px-4 py-2 md:col-span-3">
                                <input type="text" className="text-center rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    placeholder="예: - 제외하고 작성"
                                    name="studentTelno"
                                    value={applyInfo.studentTelno}
                                    onChange={handleChangeInput}/>
                                {/* - <input type="text" className="w-12 text-center rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"/> - <input type="text" className="w-12 text-center rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"/> */}
                            </div>
                        </div>

                        {/* 상담일자 / 상담시간 */}
                        <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-500 md:divide-x md:divide-gray-500">
                            <div className="px-4 py-2 bg-gray-100 text-center">상담일자</div>
                            <div className="px-4 py-2">
                                {schedule?.scheduleDate
                                ? `${String(schedule.scheduleDate).slice(0,4)}. ${String(schedule.scheduleDate).slice(4,6)}. ${String(schedule.scheduleDate).slice(6,8)}`
                                : "-"}
                            </div>
                            <div className="px-4 py-2 bg-gray-100 text-center">상담시간</div>
                            <div className="px-4 py-2">
                                {schedule?.startTime
                                ? `${String(schedule.startTime).slice(0,2)} : ${String(schedule.startTime).slice(2)}`
                                : "-"}
                            </div>
                        </div>

                        {/* 상담자 */}
                        <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-500 md:divide-x md:divide-gray-500">
                            <div className="px-4 py-2 bg-gray-100 text-center">상담자</div>
                            <div className="px-4 py-2 md:col-span-3">{schedule.empName}</div>
                        </div>

                        {/* 상담유형 */}
                        <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-500 md:divide-x md:divide-gray-500">
                            <div className="px-4 py-2 bg-gray-100 text-center">상담유형</div>
                            <div className="px-4 py-2 md:col-span-3">
                                <select 
                                    className="border border-black"
                                    name="dscsnKindId"
                                    type={'text'} 
                                    value={applyInfo.dscsnKindId}
                                    onChange={handleChangeInput}>
                                        {dscsnKinds.map((kind)=>(
                                            <option id={kind.dscsnKindId} value={String(kind.dscsnKindId)}>{kind.dscsnKindName}</option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        {/* 상담신청 내용 */}
                        <div className="grid grid-cols-1 md:grid-cols-4 md:divide-x md:divide-gray-500">
                            <div className="grid place-items-center px-4 py-2 bg-gray-100 text-center">상담신청 내용</div>
                            <div className="p-1 md:col-span-3 h-[11rem] whitespace-pre-wrap border-t md:border-t-0 border-gray-500">
                                <textarea 
                                    className="w-full h-full resize-none rounded-md border border-blue-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    placeholder="신청내용을 입력하세요"
                                    name="dscsnApplyCn"
                                    value={applyInfo.dscsnApplyCn}
                                    onChange={handleChangeInput}
                                />
                            </div>
                        </div>
                        </div>

                </div>
                <div className="flex justify-end items-center gap-3 mr-2 mt-2 mb-2">
                    <button 
                        className="bg-red-500 text-white hover:bg-red-700 transition no-underline font-medium px-4 py-1 rounded"
                        onClick={()=>onBack}
                    >
                        뒤로
                    </button>
                    <button
                        className="bg-[#222E8D] text-white hover:bg-[#28B8B2] transition no-underline font-medium px-4 py-1 rounded"
                        onClick={()=>onSubmit(applyInfo)}
                    >
                        제출
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ConsultApplyForm;