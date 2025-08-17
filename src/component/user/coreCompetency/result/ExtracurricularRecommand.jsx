import React, { useState, useMemo, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// 날짜 포맷팅 함수 (변경 없음)
const formatDate = (dateTimeString) => {
    if (!dateTimeString) return '-';
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// 재사용성을 위해 테이블 셀 스타일을 상수로 분리
const thClass = "px-4 py-3 border";
const tdClass = "px-4 py-3 border";

const ExtracurricularRecommand = ({ assessmentNo, student }) => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const studentNo = useMemo(() => (typeof student === "string" ? student : student?.studentNo), [student]);

    // API 호출 로직을 useCallback으로 감싸서 불필요한 함수 재생성을 방지
    const fetchRecommendations = useCallback(async () => {
        if (!studentNo || !assessmentNo) {
            setPrograms([]);
            return;
        }

        setLoading(true);
        setError(null);
        
        try {
            const response = await axios.get(
                `/api/user/recommend/${assessmentNo}/${studentNo}`,
                { params: { limit: 15 } }
            );
                          console.log('[추천 프로그램 응답]', response.data);
  console.table(response.data);                 // 표 형태로 보기 좋게
            setPrograms(response.data);
        } catch (err) {
            setError('추천 프로그램을 불러오는 중 오류가 발생했습니다.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [assessmentNo, studentNo]); // assessmentNo 또는 studentNo가 변경될 때만 함수가 재생성됨

    useEffect(() => {
        fetchRecommendations();
    }, [fetchRecommendations]); // 이제 fetchRecommendations 함수 자체가 의존성이 됨

    return (
    <div className="p-4 ml-2">
        <div className="overflow-x-auto border rounded-xl">
        <table className="min-w-full text-sm text-center">
            <thead className="bg-gray-100 text-gray-700">
            <tr>
                <th className={thClass}>번호</th>
                <th className={thClass}>프로그램명</th>
                <th className={thClass}>신청시작일</th>
                <th className={thClass}>신청마감일</th>
                <th className={thClass}>시작일</th>
                <th className={thClass}>종료일</th>
                <th className={thClass}>마일리지</th>
            </tr>
            </thead>
            <tbody className="bg-white">
            {programs.length === 0 ? (
                <tr><td colSpan="7" className={tdClass}>추천할 프로그램이 없습니다.</td></tr>
            ) : (
                programs.map((prog, index) => (
                <tr key={prog.programId}>
                    <td className={tdClass}>{index + 1}</td>

                    <td className={`${tdClass} text-center`}>
                    <Link
                        to={`/program/${prog.programId}`}
                        className="text-gray-900 hover:text-blue-500 no-underline"
                    >
                        {prog.eduNm ?? '(제목 없음)'}
                    </Link>
                    </td>

                    <td className={tdClass}>{formatDate(prog.eduAplyBgngDt)}</td>
                    <td className={tdClass}>{formatDate(prog.eduAplyEndDt)}</td>
                    <td className={tdClass}>{formatDate(prog.eduBgngYmd)}</td>
                    <td className={tdClass}>{formatDate(prog.eduEndYmd)}</td>
                    <td className={tdClass}>{prog.eduMlg?.toLocaleString?.() ?? 0}</td>
                </tr>
                ))
            )}
            </tbody>
        </table>
        </div>
    </div>
    );
};

export default ExtracurricularRecommand;