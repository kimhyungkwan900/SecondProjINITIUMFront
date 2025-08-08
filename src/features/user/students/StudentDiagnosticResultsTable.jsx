import LinkedButton from "../../../component/common/LinkedButton";

export default function StudentDiagnosticResultsTable({ results, onViewResult }) {
    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-base flex items-center" />
                <div className="space-x-2">
                    <LinkedButton
                        to="/diagnosis/internal"
                        className="bg-[#EB568E] text-white font-semibold px-6 py-2 rounded shadow-sm hover:bg-[#d43b73] transition"
                    >
                        내부진단검사 목록
                    </LinkedButton>
                    <LinkedButton
                        to="/external-diagnosis"
                        className="bg-[#222E8D] text-white font-semibold px-6 py-2 rounded shadow-sm hover:bg-[#28B8B2] transition"
                    >
                        외부진단검사 목록
                    </LinkedButton>
                    <LinkedButton
                        to="/diagnosis/all-results"
                        className="bg-[#42516A] text-white font-semibold px-6 py-2 rounded shadow-sm hover:bg-[#28B8B2] transition"
                    >
                        전체심리검사 목록
                    </LinkedButton>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg shadow-sm bg-white">
                <table className="w-full table-auto text-sm">
                    <thead>
                        <tr className="bg-gray-50 text-gray-700">
                            <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">구분</th>
                            <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">년도</th>
                            <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">검사종류</th>
                            <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">등록일</th>
                            <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">검사결과</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center text-gray-400 py-8">
                                    결과가 없습니다.
                                </td>
                            </tr>
                        )}
                        {results.map((r, idx) => (
                            <tr key={r.resultId || idx} className="text-center">
                                <td className="px-3 py-2 border-b border-gray-200">진단평가</td>
                                <td className="px-3 py-2 border-b border-gray-200">
                                    {r.completionDate ? `${new Date(r.completionDate).getFullYear()}년도` : "-"}
                                </td>
                                <td className="px-3 py-2 border-b border-gray-200">{r.testName}</td>
                                <td className="px-3 py-2 border-b border-gray-200">
                                    {r.completionDate ? r.completionDate.slice(0, 10) : "-"}
                                </td>
                                <td className="px-3 py-2 border-b border-gray-200">
                                    <button
                                        className="bg-[#222E8D] text-white px-4 py-1 rounded font-medium hover:bg-[#1859b7] transition"
                                        onClick={() => onViewResult(r)}
                                    >
                                        보기
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
