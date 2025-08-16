import { Result } from "postcss";

const RegisterConsultResult = ({info, onSubmit, onChange, result, onClose})=>{
    return(
        <div className="p-6 border border-gray-300">
            <table className="w-full table-fixed border-collapse">
                <tbody>
                <tr>
                    <th className="w-1/4 bg-gray-200 border border-gray-300 px-4 py-2 text-left">연도/학기</th>
                    <td className="border border-gray-300 px-4 py-2">2025-1</td>
                    <th className="w-1/4 bg-gray-200 border border-gray-300 px-4 py-2 text-left">상담일자</th>
                    <td className="border border-gray-300 px-4 py-2">{`${info.dscsnApplyDto.dscsnScheduleDto.scheduleDate.slice(0,4)}-${info.dscsnApplyDto.dscsnScheduleDto.scheduleDate.slice(4,6)}-${info.dscsnApplyDto.dscsnScheduleDto.scheduleDate.slice(6)}`}</td>
                </tr>

                <tr>
                    <th className="bg-gray-200 border border-gray-300 px-4 py-2 text-left">상담시간</th>
                    <td className="border border-gray-300 px-4 py-2">{`${info.dscsnApplyDto.dscsnScheduleDto.startTime.slice(0,2)}:${info.dscsnApplyDto.dscsnScheduleDto.startTime.slice(2)}`}</td>
                    <th className="bg-gray-200 border border-gray-300 px-4 py-2 text-left">상담장소</th>
                    <td className="border border-gray-300 px-4 py-2">상담실</td>
                </tr>

                <tr>
                    <th className="bg-gray-200 border border-gray-300 px-4 py-2 text-left">상담자</th>
                    <td className="border border-gray-300 px-4 py-2">{info.dscsnApplyDto.dscsnScheduleDto.empName}</td>
                </tr>

                <tr>
                    <th className="bg-gray-200 border border-gray-300 px-4 py-2 text-left">상담항목</th>
                    <td className="border border-gray-300 px-4 py-2">{info.dscsnApplyDto.dscsnKindDto.dscsnKindName}</td>
                    <th className="bg-gray-200 border border-gray-300 px-4 py-2 text-left">공개여부</th>
                    <td className="border border-gray-300 px-4 py-2">
                    <label className="inline-flex items-center mr-6">
                        <input 
                            type="radio"
                            name="release"
                            value="Y"
                            className="h-4 w-4 text-blue-700 border-gray-300 focus:ring-blue-700"
                            checked={result.release === 'Y'}
                            onChange={onChange}/>
                        <span classNameName="ml-2">Y</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            name="release"
                            value="N"
                            className="h-4 w-4 text-blue-700 border-gray-300 focus:ring-blue-700"
                            checked={result.release === 'N'}
                            onChange={onChange}/>
                        <span className="ml-2">N</span>
                    </label>
                    </td>
                </tr>

                <tr>
                    <th className="bg-gray-200 border border-gray-300 px-4 py-2 text-left align-top">상담신청 내용</th>
                    <td className="border border-gray-300 px-4 py-2" colspan="3">
                    {info.dscsnApplyDto.dscsnApplyCn}
                    </td>
                </tr>

                <tr>
                    <th className="bg-gray-200 border border-gray-300 px-4 py-2 text-left align-top">상담결과 내용</th>
                    <td className="border border-gray-300 p-0" colspan="3">
                        <textarea
                            name="dscsnResultCn"
                            value={result.dscsnResultCn}
                            onChange={onChange}
                            className="block w-full h-full border-0 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
                            placeholder="결과를 입력해주세요"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="flex justify-end mt-4 space-x-2">
                <button
                    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
                    onClick={() => onSubmit(info.dscsnInfoId)}>
                    등록
                </button>
                <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                    onClick={onClose}>
                    취소
                </button>
            </div>
        </div>
    );
}
export default RegisterConsultResult;