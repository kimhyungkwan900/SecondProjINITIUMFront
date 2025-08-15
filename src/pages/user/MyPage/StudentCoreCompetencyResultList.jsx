import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { getMyRespondedAssessmentDetails } from "../../../api/user/coreCompetency/UserAssessmentApi";

const StudentCoreCompetencyResultList = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(false);

    // 권한 플래그
    const studentNo = user?.loginId;
    const hasEmployeeNo = !!user?.employeeNo;
    const canViewList = !!user && (studentNo || hasEmployeeNo);
    const isStudent = !!studentNo && !hasEmployeeNo;

    // 데이터 로드
    useEffect(() => {
        if (!canViewList || !isStudent) return;
        (async () => {
            try {
                setLoading(true);
                const res = await getMyRespondedAssessmentDetails(studentNo);
                setAssessments(Array.isArray(res?.data) ? res.data : []);
            } catch (err) {
                console.error("응답한 진단 목록 불러오기 실패:", err);
                setAssessments([]);
            } finally {
                setLoading(false);
            }
        })();
    }, [canViewList, isStudent, studentNo]);

    // 유틸 함수
    const formatDateForDisplay = (yyyymmdd) => {
        if (!yyyymmdd || String(yyyymmdd).length !== 8) return "";
        const s = String(yyyymmdd);
        return `${s.slice(0, 4)}.${s.slice(4, 6)}.${s.slice(6, 8)}`;
    };

    // 정렬
    const sortedAssessments = useMemo(() => {
        return [...assessments].sort((a, b) => Number(b.endDate) - Number(a.endDate));
    }, [assessments]);

    const goResult = (assessmentNo) => {
        navigate(`/competency/coreCompetency/result/${studentNo}/${assessmentNo}`);
    };

    // --- 공통 스타일 변수 ---
    const buttonStyle = "bg-[#354649] hover:bg-[#6C7A89] text-white text-sm px-6 py-2 rounded-md shadow-sm transition-colors disabled:opacity-50";
    // 테두리 색상 변경
    const messageBoxStyle = "p-6 border border-gray-300 rounded-lg text-center text-sm";
    const gridHeaderStyle = "grid grid-cols-12 gap-4 bg-[#E0E7E9] text-[#354649] font-semibold p-4 rounded-t-lg border-b border-gray-300";
    const gridRowStyle = "grid grid-cols-12 gap-4 items-center p-4 border-t border-gray-300";

    // --- 조건부 렌더링 ---
    if (!user) {
        return (
            <div className={messageBoxStyle}>
                <p className="mb-3 text-[#354649]">이 화면은 로그인한 사용자만 볼 수 있습니다.</p>
                <button
                    onClick={() => navigate("/login", { replace: true })}
                    className={buttonStyle}
                >
                    로그인 하러가기
                </button>
            </div>
        );
    }

    if (!canViewList || !isStudent) {
        return (
            <div className={messageBoxStyle}>
                <p className="mb-2 font-semibold text-[#354649]">접근 권한이 없습니다.</p>
                <p className="text-[#6C7A89]">학생 사용자만 열람할 수 있는 화면입니다.</p>
            </div>
        );
    }

    const renderAction = (assessmentNo) => {
        if (!isStudent) return null;
        return (
            <button
                onClick={() => goResult(assessmentNo)}
                className={buttonStyle}
                disabled={loading}
            >
                결과보기
            </button>
        );
    };

    return (
        // 테두리 색상 변경
        <div className="shadow-md rounded-lg border border-gray-300 overflow-hidden">
            {/* 목록 헤더 */}
            <div className={gridHeaderStyle}>
                <div className="col-span-1 text-center">번호</div>
                <div className="col-span-6">진단명</div>
                <div className="col-span-3 text-center">진단기간</div>
                <div className="col-span-2 text-center">결과보기</div>
            </div>

            {/* 목록 본문 */}
            <div>
                {loading ? (
                    <div className="py-10 text-center text-[#6C7A89]">
                        불러오는 중입니다…
                    </div>
                ) : sortedAssessments.length > 0 ? (
                    sortedAssessments.map((a, idx) => (
                        <div key={a.assessmentNo} className={`${gridRowStyle} hover:bg-[#E0E7E9]/50`}>
                            <div className="col-span-1 text-center text-[#6C7A89]">{idx + 1}</div>
                            <div className="col-span-6 text-[#354649] font-medium">{a.assessmentName}</div>
                            <div className="col-span-3 text-center text-[#6C7A89]">
                                {formatDateForDisplay(a.startDate)} ~ {formatDateForDisplay(a.endDate)}
                            </div>
                            <div className="col-span-2 text-center">{renderAction(a.assessmentNo)}</div>
                        </div>
                    ))
                ) : (
                    <div className="py-10 text-center text-[#6C7A89]">
                        현재 등록된 진단 결과가 없습니다.
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentCoreCompetencyResultList;
