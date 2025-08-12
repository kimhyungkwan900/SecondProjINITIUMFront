import { SchoolSubjectSelect, StudentStatusSelect } from "../../../component/common/CodeConverter/CodeSelect";
import TextInput from "../../../component/common/TextInput";



export default function StudentListSearchFilter({
  filters,
  setFilters,
  loading = false,
}) {
  const update = (key) => (e) =>
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-3 mb-3"
    >
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-3">
          <TextInput
            placeholder="학번"
            value={filters.studentNo ?? ""}
            onChange={update("studentNo")}
            disabled={loading}
            className="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="col-span-3">
          <TextInput
            placeholder="이름"
            value={filters.name ?? ""}
            onChange={update("name")}
            disabled={loading}
            className="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="col-span-3">
          <SchoolSubjectSelect
            value={filters.schoolSubjectCode ?? ""}
            onChange={update("schoolSubjectCode")}
            disabled={loading}
            className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="학과를 선택하세요"
            allowEmpty
          />
        </div>
        <div className="col-span-3">
          <StudentStatusSelect
            value={filters.studentStatusCode ?? ""}
            onChange={update("studentStatusCode")}
            disabled={loading}
            className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="학적상태를 선택하세요"
            allowEmpty
          />
        </div>
      </div>
    </div>
  );
}