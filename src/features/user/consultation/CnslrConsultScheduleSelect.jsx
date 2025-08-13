import { useState, useEffect } from 'react';
import { startOfWeek, addDays, getDay, isSameDay, format } from 'date-fns';
import { ko } from 'date-fns/locale';

import { getSchedules } from '../../../api/user/consult/ConsultUserApi';

const CnslrConsultScheduleSelect = ({userInfo, type})=>{
    const [schedules, setSchedules] = useState([]);
    const [isChecked, setIsChecked] = useState();

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
            try{
                const data = await getSchedules(type, userInfo.employeeNo);
                console.log(data);
                setSchedules(data);
            } catch(e){
                console.log("에러 발생: ", e);
            }
        })();
    }, [userInfo, type]);

    const startHour = 9;
    const endHour = 22;
    const timeSlots = Array.from(
        { length: endHour - startHour + 1 },
        (_, i) => startHour + i
    );

    return(
        <div className="w-4/5 max-w-7xl px-20 py-6 mx-auto">
            <div className="flex items-center justify-between gap-3 mt-4 mb-4">
                <div className='flex gap-3'>
                    <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-1 rounded">
                        일정등록
                    </button>
                    <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-1 rounded">
                        일정삭제
                    </button>
                </div>
                <div className='flex gap-3 text-sm'>
                    <div><span className='bg-red-600 text-red-600'>....</span>일정등록 완료</div>
                    <div><span className='bg-blue-600 text-blue-600'>....</span>일정등록 가능</div>
                </div>
            </div>

            <div className="h-[600px] border-3 border-indigo-950 overflow-auto">
                <table className="w-full min-w-max min-h-full table-fixed border-collapse" style={{ width: `${tableWidthPercent}%` }}>
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

                                const isRegistered = (schedules ?? []).some(
                                    s => s.scheduleDate === dayStr && s.startTime === timeStr
                                );
                                
                                // 체크박스는 모든 칸에 전부, 일정이 등록된 것은 배경색 회색으로
                                return (
                                    <td key={di} className="border py-2.5">
                                        <div className="flex items-center justify-center">
                                            <label
                                                className={`items-center rounded-md shadow-sm
                                                            w-16 h-10 text-white
                                                            ${isRegistered ? 'bg-red-600' : 'bg-blue-600'}`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="ml-2 mt-2"
                                                    value={`${dayStr}_${timeStr}`}
                                                />
                                            </label>
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
}
export default CnslrConsultScheduleSelect;