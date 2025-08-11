import TextInput from "../../../component/common/TextInput";

export default function StudentListSearchFilter({ filters, setFilters, handleSearch, size, handleSizeChange, loading }) {
    return (
        <div className="flex mb-4 items-center gap-2">
            <TextInput
                placeholder="학번"
                value={filters.studentNo}
                onChange={e => setFilters(f => ({ ...f, studentNo: e.target.value }))}
                className="w-auto rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <TextInput
                placeholder="이름"
                value={filters.name}
                onChange={e => setFilters(f => ({ ...f, name: e.target.value }))}
                className="w-auto rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
                value={filters.studentStatusCode}
                onChange={e => setFilters(f => ({ ...f, studentStatusCode: e.target.value }))}
            >
                <option value="">전체</option>
                <option value="10">재학</option>
                <option value="20">휴학</option>
                <option value="30">제적</option>
                <option value="40">수료</option>
                <option value="50">졸업</option>
            </select>
            <TextInput
                placeholder="학과코드"
                value={filters.schoolSubjectCode}
                onChange={e => setFilters(f => ({ ...f, schoolSubjectCode: e.target.value }))}
                className="w-auto rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                className="bg-[#222E8D] text-white px-3 py-1 rounded text-sm font-semibold hover:bg-blue-800 transition"
                onClick={handleSearch}
                disabled={loading}
            >조회</button>
            <div className="flex items-center ml-auto">
                <span className="mr-2 text-sm">표시개수</span>
                <select
                    className="w-auto rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={size}
                    onChange={handleSizeChange}
                >
                    {[10, 15, 20, 30, 50].map(n => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
