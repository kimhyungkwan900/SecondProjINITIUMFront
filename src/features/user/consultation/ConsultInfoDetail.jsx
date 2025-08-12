const ConsultInfoDetail = ({info, onClose})=>{
    return(
        <div className="p-6 overflow-auto">
            <table className="min-w-[640px] h- w-full table-fixed border-collapse text-sm">
                <tbody>
                <tr>
                    <th className="w-1/4 border bg-gray-100 px-5 py-3 text-left">상담 구분</th>
                    <td className="border px-5 py-3" colSpan="3">진로취업 상담</td>
                </tr>
                <tr>
                    <th className="border bg-gray-100 px-5 py-3 text-left">이름</th>
                    <td className="border px-5 py-3"></td>
                    <th className="border bg-gray-100 px-5 py-3 text-left">학번</th>
                    <td className="border px-5 py-3">-</td>
                </tr>
                <tr>
                    <th className="border bg-gray-100 px-5 py-3 text-left">소속</th>
                    <td className="border px-5 py-3" colSpan="3">-</td>
                </tr>
                <tr>
                    <th className="border bg-gray-100 px-5 py-3 text-left">연락처</th>
                    <td className="border px-5 py-3">-</td>
                    <th className="border bg-gray-100 px-5 py-3 text-left">이메일</th>
                    <td className="border px-5 py-3">-</td>
                </tr>
                <tr>
                    <th className="border bg-gray-100 px-5 py-3 text-left">상담 일자</th>
                    <td className="border px-5 py-3">-</td>
                    <th className="border bg-gray-100 px-5 py-3 text-left">상담 시간</th>
                    <td className="border px-5 py-3">-</td>
                </tr>
                <tr>
                    <th className="border bg-gray-100 px-5 py-3 text-left">상담 상태</th>
                    <td className="border px-5 py-3" colSpan="3">상담 완료</td>
                </tr>
                <tr>
                    <th className="border bg-gray-100 px-5 py-3 text-left">상담자</th>
                    <td className="border px-5 py-3">-</td>
                    <th className="border bg-gray-100 px-5 py-3 text-left">상담 장소</th>
                    <td className="border px-5 py-3">-</td>
                </tr>
                <tr>
                    <th className="border bg-gray-100 px-5 py-3 text-left">상담 유형</th>
                    <td className="border px-5 py-3" colSpan="3">-</td>
                </tr>
                <tr>
                    <th className="border bg-gray-100 px-5 py-3 text-left align-top">상담 신청 내용</th>
                    <td className="border px-5 py-3" colSpan="3">-</td>
                </tr>
                <tr>
                    <th className="border bg-gray-100 px-5 py-3 text-left align-top">상담 결과 내용</th>
                    <td className="border px-5 py-3" colSpan="3">-</td>
                </tr>
                </tbody>
            </table>

            <div className="mt-4 flex justify-end">
                <button
                    className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-2 rounded"
                    onClick={onClose}
                >
                닫기
                </button>
            </div>
        </div>
    );
}
export default ConsultInfoDetail;