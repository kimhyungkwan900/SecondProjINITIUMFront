import { useState, useEffect } from "react";

const AttendanceList = ({ attendanceList, onSave }) => {

    
  const [checkedMap, setCheckedMap] = useState(() => {
    const map = {};
    attendanceList.forEach(att => {
      map[att.studentNo] = att.status === "Y";
    });
    return map;
  });

  useEffect(() => {
    const map = {};
    attendanceList.forEach(att => {
      map[att.studentNo] = att.status === "Y";
    });
    setCheckedMap(map);
  }, [attendanceList]);


  const toggleCheck = (studentNo) => {
    setCheckedMap(prev => ({
      ...prev,
      [studentNo]: !prev[studentNo],
    }));
  };

  const handleSaveClick = () => {
    // 체크된 학생들 상태 전달 (studentNo: true/false)
    onSave(checkedMap);
  };

  if (!Array.isArray(attendanceList) || attendanceList.length === 0) {
    return <div className="adm-card mt-4 text-center text-gray-500">
        <table className="w-full table-auto border-collapse">
            <thead>
            <tr>
                <th className="adm-th">출석</th>
                <th className="adm-th">학생 번호</th>
                <th className="adm-th">학생 이름</th>
            </tr>
            </thead>

            <tbody>
                <td className="adm-td text-center text-gray-500" colSpan={3}>
              등록된 출결이 없습니다.
            </td>
            </tbody>
            
        </table>
        <div className="mt-4 text-right">
            <button
            onClick={handleSaveClick}
            className="adm-btn adm-btn--primary"
            >
            출석 상태 저장
            </button>
            </div>
        </div>;
  }

  
  
  return (
    <div className="adm-card mt-4 overflow-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="adm-th">출석</th>
            <th className="adm-th">학생 번호</th>
            <th className="adm-th">학생 이름</th>
          </tr>
        </thead>
        <tbody>
          {attendanceList.map((att) => (
            <tr key={att.studentNo}>
              <td className="adm-td text-center">
                <input
                  type="checkbox"
                  checked={!!checkedMap[att.studentNo]}
                  onChange={() => toggleCheck(att.studentNo)}
                />
              </td>
              <td className="adm-td">{att.studentNo}</td>
              <td className="adm-td">{att.studentName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-right">
        <button
          onClick={handleSaveClick}
          className="adm-btn adm-btn--primary"
        >
          출석 상태 저장
        </button>
      </div>
    </div>
  );
};

export default AttendanceList;
