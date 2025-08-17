import { useState } from "react";
import PageHeader from "../../../component/common/PageHeader";
import EmployeeBasicInfo from "../../../features/user/employees/EmployeeBasicInfo";
import ConsultHistorySection from "../../../features/user/employees/MyConsultHistorySection";
import MyProgramsSection from "../../../features/user/employees/MyProgramsSection";
import { useAuth } from "../../../hooks/useAuth";
import useEmployeeInfo from "../../../hooks/useEmployeeInfo";
import CounselorConsultList from "../../../component/admin/consult/CounselorConsultList";

export default function EmployeeMyPageHome() {
  const { user } = useAuth();
  const empNo = user?.loginId;
  const { employee, loading } = useEmployeeInfo(empNo);

  const [currentPage, setCurrentPage] = useState(1);

  if (loading || !employee) {
    return <div>로딩 중...</div>;
  }


  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 bg-white">
      <PageHeader
        title="마이홈"
        breadcrumb={[
          { label: "마이페이지(교직원)", link: "/mypage/employee" },
          { label: "마이홈", active: true },
        ]}
      />

      {/* 교직원 기본정보 */}
      <section className="content-section">
        <h3 className="section-title">교직원 정보</h3>
        <EmployeeBasicInfo employee={employee} />
      </section>

      {/* 담당 비교과 프로그램 */}
      <section className="content-section">
        <MyProgramsSection empNo={empNo} />
      </section>
      {/* 상담 내역 */}
      <section className="content-section">
        <CounselorConsultList
          counselorName={employee.name}
          current={currentPage}
          onPageChange={setCurrentPage}
          searchFilters={{}}
        />
      </section>
    </div>
  );
}