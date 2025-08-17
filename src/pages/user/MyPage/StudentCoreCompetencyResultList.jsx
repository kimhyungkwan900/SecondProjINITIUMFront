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
    const buttonStyle = "py-2 px-4 rounded-md bg-[#354649] text-white font-semibold text-sm hover:bg-[#6C7A89] transition-colors disabled:opacity-50";
    // 테두리 색상 변경
    const messageBoxStyle = "p-6 rounded-lg text-center text-sm";

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
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 bg-white">
            <div className="border border-gray-300 rounded-md overflow-hidden">
                {/* 목록 헤더 */}
                <div className="grid grid-cols-4 gap-4 bg-[#E0E7E9] text-[#354649] font-semibold p-4 text-center">
                    <div className="col-span-2">진단명</div>
                    <div>진단기간</div>
                    <div>결과보기</div>
                </div>

                {/* 목록 본문 */}
                <div>
                    {loading ? (
                        <div className="py-10 text-center text-[#6C7A89]">불러오는 중입니다…</div>
                    ) : sortedAssessments.length > 0 ? (
                        sortedAssessments.map((a, idx) => (
                            <div key={a.assessmentNo} className={`grid grid-cols-4 gap-4 items-center p-4 border-t border-gray-200 hover:bg-gray-50 ${
                                idx % 2 === 1 ? "bg-gray-50/50" : "bg-white"
                            }`}>
                                <div className="col-span-2 text-[#354649] font-medium text-left">{a.assessmentName}</div>
                                <div className="text-center text-[#6C7A89]">
                                    {formatDateForDisplay(a.startDate)} ~ {formatDateForDisplay(a.endDate)}
                                </div>
                                <div className="text-center">{renderAction(a.assessmentNo)}</div>
                            </div>
                        ))
                    ) : (
                        <div className="py-10 text-center text-[#6C7A89]">현재 등록된 진단 결과가 없습니다.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentCoreCompetencyResultList;
