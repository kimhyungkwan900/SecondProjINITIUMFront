import EmployeeConsultListGrid from "../../../component/admin/consult/EmployeeConsultListGrid";
import { consultColumns } from "../../../constants/user/consultColumns";
import useMyConsults from "../../../hooks/admin/consult/useMyConsult";


export default function ConsultHistorySection({ empNo }) {
  const { rows, loading, refetch } = useMyConsults(empNo);

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h3 className="section-title !mb-0">상담 내역</h3>
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
  );
}