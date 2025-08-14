
import { Link } from "react-router-dom";
import PageHeader from "../../../component/common/PageHeader";
import EmployeeBasicInfo from "../../../features/user/employees/EmployeeBasicInfo";
import useEmployeeInfo from "../../../hooks/useEmployeeInfo";
import { useContext } from "react";
import { UserContext } from "../../../App";

const EmployeeMyPageHome = () => {
  const { user } = useContext(UserContext);
  const { employee } = useEmployeeInfo(user?.loginId);

  // 공통 링크 버튼 스타일
  const linkButtonStyle = "text-sm text-blue-600 hover:underline";

  return (
    <div className="space-y-10">
      <PageHeader
        title="마이홈"
        breadcrumb={[
          { label: "마이페이지(교직원)", link: "/mypage/employee" },
          { label: "마이홈", active: true },
        ]}
      />
      <div className="space-y-8">
        {/* 교직원 기본정보 */}
        <section className="content-section">
          <h3 className="section-title">교직원 정보</h3>
          <EmployeeBasicInfo employee={employee} />
        </section>

        {/* 상담 내역(본인이 상담한 학생) */}
        <section className="content-section">
          <div className="flex justify-between items-center mb-4">
            <h3 className="section-title !mb-0">상담 내역</h3>
            <Link to="/mypage/consult" className={linkButtonStyle}>
              전체 상담 이력 조회 &rarr;
            </Link>
          </div>
          {/* API 연결 후 상담 내역 리스트 표시 영역 */}
          <div className="text-center text-gray-400 py-8">
            최근 상담 내역이 여기에 표시됩니다.
          </div>
        </section>

        {/* 참여 비교과 프로그램(본인 담당) */}
        <section className="content-section">
          <div className="flex justify-between items-center mb-4">
            <h3 className="section-title !mb-0">담당 비교과 프로그램</h3>
            <Link to="/mypage/program" className={linkButtonStyle}>
              전체 프로그램 현황 조회 &rarr;
            </Link>
          </div>
          {/* API 연결 후 담당 프로그램 리스트 표시 영역 */}
          <div className="text-center text-gray-400 py-8">
            담당하고 있는 비교과 프로그램 목록이 여기에 표시됩니다.
          </div>
        </section>
      </div>
    </div>
  );
};

export default EmployeeMyPageHome;
