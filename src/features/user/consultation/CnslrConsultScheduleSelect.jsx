import { useState, useEffect, useMemo, useCallback } from 'react';
import { startOfWeek, addDays, getDay, isSameDay, format } from 'date-fns';
import { ko } from 'date-fns/locale';

import { getSchedules, registerSchedule, deleteSchedule } from '../../../api/user/consult/ConsultUserApi';

const CnslrConsultScheduleSelect = ({userInfo, type})=>{
    const [schedules, setSchedules] = useState([]);
    //const [selected, setSelected] = useState(() => new Set()); // 선택된 셀 키 모음

    const today = new Date();

    const weekStartsOnSunday = { weekStartsOn: 0, locale: ko };
    const start = startOfWeek(today, weekStartsOnSunday);

    const dates = Array.from(
        { length: 14 },
        (_, i) => addDays(start, i)
    );

    const totalCols = 1 + dates.length;
    const visibleCols = 1 + dates.slice(0, 7).length;
    const tableWidthPercent = (totalCols / visibleCols) * 100;
    const colWidthPercent = 100 / visibleCols;

    useEffect(() => {
        (async ()=>{
            try{
                const data = await getSchedules(type, userInfo.empNo);
                setSchedules(data ?? []);
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

    //여기부터
    // 1) 키 헬퍼
const buildKey = (empNo, type, date, time) =>
  `${empNo}|${type}|${date}|${time}`;

// 2) 기존(DB) 일정 맵: key -> schedule
const existingByKey = useMemo(() => {
  const m = new Map();
  for (const s of (schedules ?? [])) {
    const emp = s.empNo ?? userInfo.empNo; // API에 empNo가 없으면 현재 유저로 보정
    const t   = s.type ?? type;
    const key = buildKey(emp, t, s.scheduleDate, s.startTime);
    m.set(key, s);
  }
  return m;
}, [schedules, userInfo.empNo, type]);

// 3) 선택 상태: key -> { id?, empNo, type, date, time }
const [selected, setSelected] = useState(new Map());

// 4) 유저/타입 바뀌면 선택 초기화 (교차 오염 방지)
useEffect(() => {
  setSelected(new Map());
}, [userInfo.empNo, type]);

// 5) 체크 토글
const toggleSelect = useCallback((key, meta) => {
  setSelected(prev => {
    const next = new Map(prev);
    if (next.has(key)) next.delete(key);
    else {
      const exist = existingByKey.get(key);
      next.set(key, {
        id: exist?.id ?? exist?.scheduleId, // 있으면 채움
        ...meta, // { empNo, type, date, time }
      });
    }
    return next;
  });
}, [existingByKey]);

// 6) 등록: id가 없는 선택만
const handleRegister = useCallback(async () => {
  const toCreate = Array.from(selected.values())
    .filter(v => v.id == null)
    .map(v => ({
      empNo: v.empNo,
      scheduleDate: v.date,
      startTime: v.time,
      type: v.type,
    }));
  if (toCreate.length === 0) { alert('새로 등록할 일정이 없습니다.'); return; }
  const saved = await registerSchedule(toCreate);
  setSchedules(prev => [...prev, ...(saved ?? toCreate)]);
  if (saved?.length) {
    setSelected(prev => {
      const next = new Map(prev);
      for (const s of saved) {
        const k = buildKey(s.empNo ?? userInfo.empNo, s.type ?? type, s.scheduleDate, s.startTime);
        const cur = next.get(k);
        if (cur) next.set(k, { ...cur, id: s.id ?? s.scheduleId });
      }
      return next;
    });
  }
}, [selected, type, userInfo.empNo]);

// 7) 삭제: id가 있는 선택만
const handleDelete = useCallback(async () => {
  const ids = Array.from(selected.values())
    .map(v => v.id)
    .filter(v => v != null); // null/undefined만 제거
  if (ids.length === 0) { alert('삭제할 기존 일정이 없습니다.'); return; }
  await deleteSchedule(ids);
  setSchedules(prev => prev.filter(s => !ids.includes(s.id ?? s.scheduleId)));
  setSelected(prev => {
    const next = new Map(prev);
    for (const [k, v] of next) if (v.id != null && ids.includes(v.id)) next.delete(k);
    return next;
  });
}, [selected]);


    return(
        <div className="w-4/5 max-w-7xl px-20 py-6 mx-auto">
            <div className="flex items-center justify-between gap-3 mt-4 mb-4">
                <div className='flex gap-3'>
                    <button
                        className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-1 rounded"
                        onClick={handleRegister}
                        >
                        일정등록
                    </button>
                    <button
                        className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-1 rounded"
                        onClick={handleDelete}
                        >
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
                                const key     = buildKey(userInfo.empNo, type, dayStr, timeStr);

                                const isRegistered = existingByKey.has(key);
                                const isSelected   = selected.has(key);
                                
                                // 체크박스는 모든 칸에 전부, 일정이 등록된 것은 배경색 회색으로
                                return (
                                    <td key={di} className="border py-2.5">
                                        <div className="flex items-center justify-center">
                                            <label
                                                className={`items-center rounded-md shadow-sm w-16 h-10 text-white
                                                            ${isRegistered ? 'bg-red-600' : 'bg-blue-600'}`}>
                                                <input
                                                    type="checkbox"
                                                    className="ml-2 mt-2"
                                                    checked={isSelected}
                                                    onChange={() => toggleSelect(key)}
                                                    value={key}
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