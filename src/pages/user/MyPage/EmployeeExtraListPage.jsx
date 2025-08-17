import { useAuth } from "../../../hooks/useAuth";
import PageHeader from "../../../component/common/PageHeader";
import MyProgramsSection from "../../../features/user/employees/MyProgramsSection";


export default function EmployeeExtraListPage() {
  const { user } = useAuth();
  const empNo = user?.loginId;


  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 bg-white">
      <PageHeader
        title="부서별 비교과 분류"
        breadcrumb={[
          { label: "마이페이지", link: "/admin" },
          { label: "비교과 프로그램 참여 현황", link: "/admin/extracurricular" },
          { label: "참여 비교과 프로그램", active: true },
        ]}
      />
            <MyProgramsSection empNo={empNo} />
    </div>
  );
}