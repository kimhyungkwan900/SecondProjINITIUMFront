import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAssessmentList } from "../../../api/user/coreCompetency/UserAssessmentApi";

const CoreCompetencyAssessmentListTable = () => {
    const navigate = useNavigate();
    const [assessments, setAssessments] = useState([]);

    useEffect(() => {
        const getAllAssessment = async () => {
            try {
                const res = await getAllAssessmentList();
                setAssessments(res.data);
            } catch (err) {
                console.error("진단 목록 불러오기 실패:", err);
            }
        };
        getAllAssessment();
    }, []);

    const formatDateForComparison = (yyyymmdd) => {
        if (!yyyymmdd || yyyymmdd.length !== 8) return "";
        return `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6, 8)}`;
    };

    const formatDateForDisplay = (yyyymmdd) => {
        if (!yyyymmdd || yyyymmdd.length !== 8) return "";
        return `${yyyymmdd.slice(0, 4)}.${yyyymmdd.slice(4, 6)}.${yyyymmdd.slice(6, 8)}`;
    };

    // 1. 진단 상태를 세 가지로 구분하는 함수
    const getAssessmentStatus = (start, end) => {
        const now = new Date();
        const startDate = new Date(formatDateForComparison(start));
        const endDate = new Date(formatDateForComparison(end));
        
        // 종료일의 마지막 시간(23:59:59)까지 포함하여 계산
        endDate.setHours(23, 59, 59, 999);

        if (now < startDate) {
            return 'UPCOMING'; // 대기 중
        }
        if (now > endDate) {
            return 'EXPIRED'; // 기간 만료
        }
        return 'ACTIVE'; // 진단하기
    };

    // 2. 세 가지 상태와 종료일을 기준으로 정렬
    const sortedAssessments = [...assessments].sort((a, b) => {
        const statusPriority = { 'ACTIVE': 1, 'UPCOMING': 2, 'EXPIRED': 3 };
        const aStatus = getAssessmentStatus(a.startDate, a.endDate);
        const bStatus = getAssessmentStatus(b.startDate, b.endDate);

        // 상태 우선순위(ACTIVE > UPCOMING > EXPIRED)에 따라 정렬
        const statusDiff = statusPriority[aStatus] - statusPriority[bStatus];
        if (statusDiff !== 0) {
            return statusDiff;
        }

        // 상태가 같다면, 종료일 기준으로 내림차순 정렬 (최신순)
        return Number(b.endDate) - Number(a.endDate);
    });

    const handleTest = (id) => {
        navigate(`/competency/coreCompetency/test/${id}`);
    };

    // 3. 상태에 따라 다른 UI를 렌더링하는 함수
    const renderStatusUI = (status, id) => {
        switch (status) {
            case 'ACTIVE':
                return (
                    <button
                        onClick={() => handleTest(id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-[27px] py-2 rounded shadow-sm transition"
                    >
                        진단하기
                    </button>
                );
            case 'UPCOMING':
                return (
                    <span className="bg-gray-600 text-white text-sm px-[32px] py-2 rounded inline-block">
                        대기 중
                    </span>
                );
            case 'EXPIRED':
            default:
                return (
                    <span className="bg-gray-400 text-white text-sm px-[25px] py-2 rounded inline-block">
                        기간 만료
                    </span>
                );
        }
    };

    return (
        <div className="">
            <div className="table-fixed max-w-[1000px] shadow rounded-md border border-gray-300">
                <table className="table-fixed min-w-[1000px] text-sm text-center">
                    <thead className="bg-gray-100 text-gray-700 font-semibold">
                        <tr>
                            <th className="px-4 py-3 border">번호</th>
                            <th className="px-4 py-3 border">진단명</th>
                            <th className="px-4 py-3 border">진단기간</th>
                            <th className="px-4 py-3 border">진단하기</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedAssessments.length > 0 ? (
                            sortedAssessments.map((a, idx) => {
                                const status = getAssessmentStatus(a.startDate, a.endDate);
                                return (
                                    <tr key={a.id} className="border-t hover:bg-blue-50">
                                        <td className="px-4 py-2 border">{assessments.length - idx}</td>
                                        <td className="px-4 py-2 border">{a.assessmentName}</td>
                                        <td className="px-4 py-2 border">
                                            {formatDateForDisplay(a.startDate)} ~ {formatDateForDisplay(a.endDate)}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {renderStatusUI(status, a.id)}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-6 text-center text-gray-500 text-sm">
                                    현재 등록된 진단 목록이 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CoreCompetencyAssessmentListTable;