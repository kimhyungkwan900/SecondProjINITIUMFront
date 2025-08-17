import EmployeeConsultListGrid from "../../../component/admin/consult/EmployeeConsultListGrid";
import PageHeader from "../../../component/common/PageHeader";
import { consultColumns } from "../../../constants/user/consultColumns";
import useMyConsults from "../../../hooks/admin/consult/useMyConsult";
import { useAuth } from "../../../hooks/useAuth";

export default function EmployeeConsultListPage() {
  const { user } = useAuth();
  const empNo = user?.loginId;

  const { rows, loading, refetch } = useMyConsults(empNo);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 bg-white">
      <PageHeader
        title="상담 내역"
        breadcrumb={[
          { label: "마이페이지(교직원)", link: "/mypage/employee" },
          { label: "상담 내역", active: true },
        ]}
      />

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-[#6C7A89]">
            총 <span className="font-semibold text-[#354649]">{rows.length}</span>건
          </div>
          <button
            type="button"
            onClick={refetch}
            className="bg-[#354649] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#6C7A89] transition-colors text-sm"
          >
            새로고침
          </button>
        </div>

        <EmployeeConsultListGrid
          columns={consultColumns}
          rows={rows}
          loading={loading}
          emptyText="상담 내역이 없습니다."
          rowKey={(row) => row?.dscsnInfoId}
        />
      </section>
    </div>
  );
}