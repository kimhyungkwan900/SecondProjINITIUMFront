import ProgramGridTableByEmpNo from "../../../component/admin/extracurricular/program/ProgramGridTableByEmpNo";
import { programColumns } from "../../../constants/user/programColumns";
import useMyPrograms from "../../../hooks/admin/extracurricular/useMyPrograms";


export default function MyProgramsSection({ empNo }) {
  const { rows, loading, refetch } = useMyPrograms(empNo);

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h3 className="section-title !mb-0">담당 비교과 프로그램</h3>
        <button
          type="button"
          onClick={refetch}
          className="bg-[#354649] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#6C7A89] transition-colors text-sm"
        >
          새로고침
        </button>
      </div>

      <div className="mt-6">
        <ProgramGridTableByEmpNo
          columns={programColumns}
          rows={rows}
          loading={loading}
          emptyText="담당하고 있는 비교과 프로그램이 없습니다."
          rowKey={(row) => row.eduMngId}
        />
      </div>
    </section>
  );
}