import React from "react";
import StudentBasicInfo from "../../../features/user/students/StudentBasicInfo";
import PageHeader from "../../../component/common/PageHeader";
import useStudentInfo from "../../../hooks/useStudentInfo";
import StudentDiagnosticResultsContainer from "../../../features/user/students/StudentDIagnosticResultContainer";
import StudentParticipatedProgramList from "../../../features/user/students/StudentParticipatedProgramList";
import StudentConsultList from "../../../features/user/students/StudentConsultList";
import StudentCoreCompetencyResultList from "./StudentCoreCompetencyResultList";
import { useAuth } from "../../../hooks/useAuth.jsx";

const StudentMyPageHome = () => {
    const { user } = useAuth();
    const { student } = useStudentInfo(user?.loginId);

    const contentStyle = "text-[#6C7A89]";

    return (
        <div className="max-w-5xl mx-auto">
            <PageHeader
                title="마이홈"
                breadcrumb={[
                    { label: "마이페이지(학생)", link: "/mypage" },
                    { label: "마이홈", active: true }
                ]}
            />
            <div>
                {/* 학생 기본정보 */}
                <section className="content-section">
                    <h3 className="section-title">학생 정보</h3>
                    <StudentBasicInfo student={student} />
                </section>

                {/* 보유 마일리지 정보 */}
                <section className="content-section">
                    <h3 className="section-title">보유 마일리지 정보</h3>
                    <div className={contentStyle}>보유 마일리지: 1200점</div>
                </section>

                {/* 상담이력 */}
                <section className="content-section">
                    <h3 className="section-title">상담 내역</h3>
                    <StudentConsultList />
                </section>

                {/* 진단검사 결과 */}
                <section className="content-section">
                    <h3 className="section-title">진단검사 결과</h3>
                    <StudentDiagnosticResultsContainer studentNo={user?.loginId} />
                </section>

                {/* 핵심역량평가 결과 */}
                <section className="content-section">
                    <h3 className="section-title">핵심역량평가 결과</h3>
                    <StudentCoreCompetencyResultList />
                </section>

                {/* 비교과 프로그램 참여 이력 */}
                <section className="content-section">
                    <h3 className="section-title">참여중인 비교과 프로그램 리스트</h3>
                    <StudentParticipatedProgramList />
                </section>

                {/* 만족도 조사 참여이력 */}
                <section className="content-section">
                    <h3 className="section-title">만족도 조사 참여이력</h3>
                    <div className={contentStyle}>만족도 조사 테이블</div>
                </section>
            </div>
        </div>
    );
};

export default StudentMyPageHome;