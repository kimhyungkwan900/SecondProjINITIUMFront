import { useState, useEffect } from 'react';
import { startOfWeek, addDays, getDay, isSameDay, format } from 'date-fns';
import { ko } from 'date-fns/locale';

import { getSchedules, registerSchedule, deleteSchedule } from '../../../api/user/consult/ConsultUserApi';

const CnslrConsultScheduleSelect = ({userInfo, type})=>{
    const [schedules, setSchedules] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);

    const today = new Date();

    const weekStartsOnSunday = { weekStartsOn: 0, locale: ko };
    const start = startOfWeek(today, weekStartsOnSunday);

    const dates = Array.from(
        { length: 14 },
        (_, i) => addDays(start, i)
    );

    useEffect(() => {
        (async ()=>{
            try{
                const data = await getSchedules(type, userInfo.empNo);
                console.log(data);
                setSchedules(data ?? []);
            } catch(e){
                console.log("에러 발생: ", e);
            }
        })();
    }, [userInfo, type, refreshKey]);

    const startHour = 9;
    const endHour = 22;
    const timeSlots = Array.from(
        { length: endHour - startHour + 1 },
        (_, i) => startHour + i
    );

const handleRegister = async(dayStr, timeStr, empNo)=>{
  const scheduleInfos= [
    {
      dscsnType: type,
      empNo: empNo,
      scheduleDate: dayStr,
      startTime: timeStr
    }
  ];

  try{
      await registerSchedule(scheduleInfos);
      alert("상담일정이 등록되었습니다.")
      setRefreshKey((k) => k+1)
  } catch(e){
      alert("일정 등록 중 에러 발생");
  }
}

const handleDelete = async(dscsnDtId)=>{
  const scheduleIds = [dscsnDtId];

  try{
      await deleteSchedule(scheduleIds);
      alert("상담일정이 삭제되었습니다.")
      setRefreshKey((k) => k+1)
  } catch(e){
      alert("일정 삭제 중 에러 발생");
  }
}
    return(
        <div className="w-4/5 max-w-7xl px-20 py-6 mx-auto">
            <div className="flex items-center justify-between gap-3 mt-4 mb-4">
                <div className='flex gap-3 text-sm'>
                    <div><span className='bg-gray-100 text-gray-100 border-1 border-black'>....</span>일정등록 가능</div>
                    <div><span className='bg-blue-600 text-blue-600'>....</span>일정등록 완료</div>
                </div>
            </div>

            <div className="h-[600px] border-3 border-indigo-950 overflow-auto">
                <table className="w-full min-w-max min-h-full table-fixed border-collapse" >
                <thead>
                    <tr >
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
                        <tr key={hi} >
                            <th className="border px-3 py-2 text-center">
                                {`${hour.toString().padStart(2, '0')}:00`}
                            </th>
                            {dates.map((day, di) => {
                                const dayStr = format(day, 'yyyyMMdd', { locale: ko });
                                const timeStr = `${hour.toString().padStart(2, '0')}00`;
                                // const key     = buildKey(userInfo.empNo, type, dayStr, timeStr);
                                const isRegistered = schedules.find(s => s.scheduleDate === dayStr && s.startTime === timeStr);
                                // const isSelected   = selected.has(day.dscsnDtId);
                                
                                return (
                                    <td key={di} className={`border py-2.5 ${isRegistered ? 'bg-blue-500':'bg-gray-100'} hover:cursor-pointer`} onClick={()=>(isRegistered ? handleDelete(isRegistered.dscsnDtId): handleRegister(dayStr, timeStr, userInfo.empNo))}>
                                        {/* <div className="">
                                        </div> */}
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