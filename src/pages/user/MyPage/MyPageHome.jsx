import React, { useContext } from "react";
import StudentBasicInfo from "../../../features/user/students/StudentBasicInfo";
import { UserContext } from "../../../App";
import PageHeader from "../../../component/common/PageHeader";
import useStudentInfo from "../../../hooks/useStudentInfo";
import StudentDiagnosticResultsContainer from "../../../features/user/students/StudentDIagnosticResultContainer";
import StudentParticipatedProgramList from "../../../features/user/students/StudentParticipatedProgramList";

const MyPageHome = () => {

    const { user } = useContext(UserContext);
    const { student, loading, error } = useStudentInfo(user?.loginId);

    return (
        <div>
            <PageHeader
                title="마이홈"
                breadcrumb={[
                    { label: "마이페이지(학생)", link: "/mypage" },
                    { label: "마이홈", active: true }
                ]}
            />
            <div className="space-y-8">
                {/* 학생 기본정보 */}
                <section className="bg-white rounded-lg shadow p-6">
                    <StudentBasicInfo student={student} />
                </section>

                {/* 보유 마일리지 정보 */}
                <section className="bg-white rounded-lg shadow p-6">
                    <h3 className="font-semibold text-lg mb-4">보유 마일리지 정보</h3>
                    <div>보유 마일리지: 1200점</div>
                </section>

                {/* 상담이력 */}
                <section className="bg-white rounded-lg shadow p-6">
                    <h3 className="font-semibold text-lg mb-4">상담이력</h3>
                    <div>상담 이력 테이블</div>
                </section>

                {/* 진단검사 결과 */}
                <section className="bg-white rounded-lg shadow p-6">
                    <StudentDiagnosticResultsContainer studentNo={user?.loginId} />
                </section>

                {/* 핵심역량평가 결과 */}
                <section className="bg-white rounded-lg shadow p-6">
                    <h3 className="font-semibold text-lg mb-4">핵심역량평가 결과</h3>
                    <div>핵심역량 그래프 또는 표</div>
                </section>

                {/* 비교과 프로그램 참여 이력 */}
                <section className="bg-white rounded-lg shadow p-6">
                    <StudentParticipatedProgramList />
                </section>

                {/* 만족도 조사 참여이력 */}
                <section className="bg-white rounded-lg shadow p-6">
                    <h3 className="font-semibold text-lg mb-4">만족도 조사 참여이력</h3>
                    <div>만족도 조사 테이블</div>
                </section>
            </div>
        </div>
    );
};

export default MyPageHome;
