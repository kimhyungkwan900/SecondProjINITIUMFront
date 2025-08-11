import { useState, useEffect } from 'react';
import { startOfWeek, addDays, getDay, isSameDay, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useMatch, useLocation } from 'react-router-dom';
import ReactModal from 'react-modal';

import ConsultScheduleBox from "./ConsultScheduleBox";
import SearchEmployee from "./SearchEmployee";
import { getSchedules } from '../../../api/user/consult/ConsultUserApi';
import { fetchStudentByNo } from '../../../api/user/auth/studentsApi';

const ConsultScheduleSelect = ({userInfo, type, onSelect})=>{
    const [schedules, setSchedules] = useState([]);

    const { pathname } = useLocation();

    const isProfessorApply = useMatch("/consult/apply/professor");
    const isCnslr = pathname.startsWith("/cnslr/consult/manage");

    const today = new Date();

    const weekStartsOnSunday = { weekStartsOn: 0, locale: ko };
    const start = startOfWeek(today, weekStartsOnSunday);

    const dates = Array.from(
        { length: 14 },
        (_, i) => addDays(start, i)
    );

    // const startDay = format(dates[0], "yyyyMMdd");
    // const endDay  = format(dates[dates.length - 1], "yyyyMMdd");

    const totalCols = 1 + dates.length;
    const visibleCols = 1 + dates.slice(0, 7).length;

    // 테이블 폭 = (전체 컬럼 수 / 보이는 컬럼 수) * 100%
    const tableWidthPercent = (totalCols / visibleCols) * 100;
    // 각 컬럼 폭 = 100% / 보이는 컬럼 수
    const colWidthPercent = 100 / visibleCols;

    useEffect(() => {
        (async ()=>{
            let empNo;

            try{
                if (type === "A") {
                    const result = await fetchStudentByNo(userInfo.studentNo);
                    empNo = result.advisorId;
                    console.log(empNo)
                } else{
                    empNo = "";
                }

                const data = await getSchedules(type, empNo);
                console.log(data);
                setSchedules(data);
            } catch(e){
                console.log("에러 발생: " + e);
            }
        })();
    }, [userInfo, type]);

    const startHour = 9;
    const endHour = 22;
    const timeSlots = Array.from(
        { length: endHour - startHour + 1 },
        (_, i) => startHour + i
    );

    const [searchModalIsOpen, setSearchModalIsOpen] = useState(false);

    const openSearchModal = () => {
        // setSelectedProduct();
        setSearchModalIsOpen(true);
    };
    const closeSearchModal = () => {
        setSearchModalIsOpen(false);
        // setSelectedProduct(null);
    };

    return(
        <div className="w-4/5 max-w-7xl px-20 py-6 mx-auto">
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

            {isProfessorApply && (
                <div className="flex items-center gap-3 mt-4 mb-4">
                    <input type="text" readOnly className="w-40 border border-black rounded px-3 py-1 text-gray-400" value={"학부 선택"}/>
                    <input type="text" readOnly className="w-40 border border-black rounded px-3 py-1 text-gray-400" value={"교수 조회"}/>
                    <button onClick={() => openSearchModal()} className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-1 rounded">
                        조회
                    </button>
                </div>
            )}
            
            {isCnslr && (
                <div className="flex items-center gap-3 mt-4 mb-4">
                    <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-1 rounded">
                        일정등록
                    </button>
                    <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-1 rounded">
                        일정삭제
                    </button>
                </div>
            )}

            <div className={`${isProfessorApply||isCnslr ? "mt-0" : "mt-[5.6rem]"} h-[600px] border-3 border-indigo-950 overflow-auto`}>
                <table className="w-full min-w-max min-h-full table-fixed border-collapse " style={{ width: `${tableWidthPercent}%` }}>
                <thead>
                    <tr style={{ width: `${colWidthPercent}%` }}>
                        {/* 반복문 처리, 열 총 14개 행 총 13개 */}
                        <th className="border bg-gray-200 px-3 py-2 text-center" >시간</th>

                        {dates.map((day, di)=>{
                            const textColor =
                                getDay(day) === 0
                                    ? "text-red-500"    // 일요일 → 빨강
                                    : getDay(day) === 6
                                    ? "text-blue-500"   // 토요일 → 파랑
                                    : "";

                            const isToday = isSameDay(day, new Date());
                            const bgClass = isToday ? "bg-gray-500" : "bg-gray-200"; // 오늘이면 하이라이트

                            return(
                                <th key={di} className={`border ${bgClass} px-3 py-2 text-center ${textColor}`}>
                                    {format(day, "MM.dd", {locale: ko})}<br/>{format(day, "EEE", {locale: ko})}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {timeSlots.map((hour, hi)=>(
                        <tr key={hi} style={{ width: `${colWidthPercent}%` }}>
                            <th className="border px-3 py-2 text-center">
                                {`${hour.toString().padStart(2, '0')}:00`}
                            </th>
                            {dates.map((day, di) => {
                                const dayStr = format(day, 'yyyyMMdd', { locale: ko });
                                const timeStr = `${hour.toString().padStart(2, '0')}00`;

                                const slotItems = schedules.filter(
                                    s => s.scheduleDate === dayStr && s.startTime === timeStr
                                );

                                return (
                                    <td key={di} className="border p-3">
                                        {slotItems.length > 0 && (
                                            <ConsultScheduleBox
                                                infos={slotItems}
                                                onSelect={onSelect}
                                            />
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
            <ReactModal
                isOpen={searchModalIsOpen}
                onRequestClose={closeSearchModal}
            >
                {/* {selected && <ConsultInfoDetail/>} */}
                <SearchEmployee/>
                <button className=""
                    onClick={closeSearchModal}>
                    닫기
                </button>   
            </ReactModal>
        </div>
    );
}
export default ConsultScheduleSelect;