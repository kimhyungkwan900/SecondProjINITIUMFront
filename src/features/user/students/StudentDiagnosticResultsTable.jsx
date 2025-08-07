import LinkedButton from "../../../component/common/LinkedButton";

export default function StudentDiagnosticResultsTable({ results, onViewResult }) {
    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-base flex items-center">
                    <span className="text-[#1859b7] mr-1 text-lg">●</span>
                    진단평가 결과
                </div>
                <div>
                    <LinkedButton
                        to="/diagnosis/internal"
                        className="mr-2 bg-[#EB568E] text-white font-semibold px-6 py-2 rounded shadow-sm hover:bg-[#d43b73] transition"
                    >
                        내부진단검사 목록
                    </LinkedButton>
                    <LinkedButton
                        to="/external-diagnosis"
                        className="mr-2 bg-[#222E8D] text-white font-semibold px-6 py-2 rounded shadow-sm hover:bg-[#28B8B2] transition"
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
            <div className="overflow-x-auto">
                <table className="w-full border border-[#E5E7EB] border-collapse text-sm bg-white">
                    <thead>
                        <tr className="bg-[#F9FAFB]">
                            <th className="border border-[#E5E7EB] py-2 font-medium">구분</th>
                            <th className="border border-[#E5E7EB] py-2 font-medium">년도</th>
                            <th className="border border-[#E5E7EB] py-2 font-medium">검사종류</th>
                            <th className="border border-[#E5E7EB] py-2 font-medium">등록일</th>
                            <th className="border border-[#E5E7EB] py-2 font-medium">검사결과</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center text-gray-400 py-8">결과가 없습니다.</td>
                            </tr>
                        )}
                        {results.map((r, idx) => (
                            <tr key={r.resultId || idx} className="text-center">
                                <td className="border-x py-2">진단평가</td>
                                <td className="border-x py-2">{r.completionDate ? `${new Date(r.completionDate).getFullYear()}년도` : "-"}</td>
                                <td className="border-x py-2">{r.testName}</td>
                                <td className="border-x py-2">{r.completionDate ? r.completionDate.slice(0, 10) : "-"}</td>
                                <td className="border-x py-2">
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
