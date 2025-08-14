import React, { useContext } from "react";
import StudentBasicInfo from "../../../features/user/students/StudentBasicInfo";
import { UserContext } from "../../../App";
import PageHeader from "../../../component/common/PageHeader";
import useStudentInfo from "../../../hooks/useStudentInfo";
import StudentDiagnosticResultsContainer from "../../../features/user/students/StudentDIagnosticResultContainer";
import StudentParticipatedProgramList from "../../../features/user/students/StudentParticipatedProgramList";
import StudentConsultList from "../../../features/user/students/StudentConsultList";
import StudentCoreCompetencyResultList from "./StudentCoreCompetencyResultList";

const StudentMyPageHome = () => {
    const { user } = useContext(UserContext);
    const { student } = useStudentInfo(user?.loginId);

    // 공통 스타일 변수 정의
    const sectionStyle = "bg-white rounded-lg shadow-md p-6";
    const titleStyle = "font-semibold text-lg mb-4 text-[#354649]";
    const contentStyle = "text-[#6C7A89]";

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <PageHeader
                title="마이홈"
                breadcrumb={[
                    { label: "마이페이지(학생)", link: "/mypage" },
                    { label: "마이홈", active: true }
                ]}
            />
            <div className="space-y-8">
                {/* 학생 기본정보 */}
                <section className={sectionStyle}>
                    <h3 className={titleStyle}>학생 정보</h3>
                    <StudentBasicInfo student={student} />
                </section>

                {/* 보유 마일리지 정보 */}
                <section className={sectionStyle}>
                    <h3 className={titleStyle}>보유 마일리지 정보</h3>
                    <div className={contentStyle}>보유 마일리지: 1200점</div>
                </section>

                {/* 상담이력 */}
                <section className={sectionStyle}>
                    <h3 className={titleStyle}>상담 내역</h3>
                    <StudentConsultList />
                </section>

                {/* 진단검사 결과 */}
                <section className={sectionStyle}>
                    <h3 className={titleStyle}>진단검사 결과</h3>
                    <StudentDiagnosticResultsContainer studentNo={user?.loginId} />
                </section>

                {/* 핵심역량평가 결과 */}
                <section className={sectionStyle}>
                    <h3 className={titleStyle}>핵심역량평가 결과</h3>
                    <StudentCoreCompetencyResultList />
                </section>

                {/* 비교과 프로그램 참여 이력 */}
                <section className={sectionStyle}>
                    <h3 className={titleStyle}>참여중인 비교과 프로그램 리스트</h3>
                    <StudentParticipatedProgramList />
                </section>

                {/* 만족도 조사 참여이력 */}
                <section className={sectionStyle}>
                    <h3 className={titleStyle}>만족도 조사 참여이력</h3>
                    <div className={contentStyle}>만족도 조사 테이블</div>
                </section>
            </div>
        </div>
    );
};

export default StudentMyPageHome;
