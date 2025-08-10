import { useContext } from "react";
import useStudentInfo from "../../../hooks/useStudentInfo";
import { UserContext } from "../../../App";
import PageHeader from "../../../component/common/PageHeader";

const EmployeeMyPageHome = () => {

    const { user } = useContext(UserContext);
    const { employee } = useStudentInfo(user?.loginId);

    return (
        <div className="space-y-10">
            <PageHeader
                title="마이홈"
                breadcrumb={[
                    { label: "마이페이지(교직원)", link: "/mypage" },
                    { label: "마이홈", active: true }
                ]}
            />
            <div className="space-y-8">
                {/* 교직원 기본정보 */}
                <section className="bg-white rounded-lg shadow p-6">
                    <h3 className="font-semibold text-lg mb-4">교직원 정보</h3>
                </section>

                {/* 상담이력 */}
                <section className="bg-white rounded-lg shadow p-6">
                    <h3 className="font-semibold text-lg mb-4">학생상담 내역</h3>
                </section>

                {/* 담당 비교과 프로그램 목록 */}
                <section className="bg-white rounded-lg shadow p-6">
                    <h3 className="font-semibold text-lg mb-4">참여중인 비교과 프로그램 리스트</h3>
                </section>

            </div>
        </div>
    );
};

export default EmployeeMyPageHome;