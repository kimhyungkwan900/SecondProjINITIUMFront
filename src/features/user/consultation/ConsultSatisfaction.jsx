import { useState } from "react";
import { registerSatis } from "../../../api/user/consult/ConsultUserApi";

const initState = {
    dscsnSatisfyScore: '',
    dscsnImp: '',
    dscsnInfoId: '',
}

const ConsultSatisfaction = ({infoId, onClose, setRefreshKey})=>{
    const [satisInfo, setSatisInfo] = useState({...initState, dscsnInfoId: infoId});

    const handleSubmit = async (satisInfo) => {
        const isConfirmed = confirm("제출하시겠습니까?");

        if (!isConfirmed) {
            return;
        }

        try {
            await registerSatis(satisInfo);
            setRefreshKey((k) => k + 1);
        } catch (e) {
            alert("설문 등록중 오류가 발생했습니다.");
        } 
    };

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setSatisInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return(
        <div className="p-6 overflow-auto">
            <h2 className="text-2xl font-semibold text-center mb-6">상담 만족도 설문조사</h2>

            <table className="w-1/2 table-fixed border-collapse mb-6">
                <tbody>
                <tr>
                    <th className="w-1/4 bg-gray-200 border px-4 py-2 text-center">설문 연도</th>
                    <td className="border px-4 py-2">2025</td>
                </tr>
                <tr>
                    <th className="bg-gray-200 border px-4 py-2 text-center">설문지 유형</th>
                    <td className="border px-4 py-2">상담 만족도</td>
                </tr>
                </tbody>
            </table>

            <div className="mb-6">
                <div className="bg-gray-200 px-4 py-2 font-bold">1. 상담은 만족하십니까?</div>
                <div className="border border-gray-300 p-4 space-y-2">
                {["vd","d","n","s","vs"].map((val, i) => (
                <label className="flex items-center" key={val}>
                    <input
                    type="radio"
                    name="dscsnSatisfyScore"
                    value={val}
                    checked={satisInfo.dscsnSatisfyScore === val}  // ✅ 제어
                    onChange={handleChangeInput}
                    className="h-4 w-4 text-blue-700 border-gray-300 focus:ring-blue-700"
                    />
                    <span className="ml-2">
                    {["전혀 그렇지 않다.","그렇지 않다.","보통이다.","그렇다.","매우 그렇다."][i]}
                    </span>
                </label>
                ))}
                </div>
            </div>

            <div className="mb-6">
                <div className="bg-gray-200 px-4 py-2 font-bold">2. 개선사항 (1000자 이내)</div>
                <textarea
                    name="dscsnImp"
                    className="w-full border border-gray-300 p-3 mt-1 resize-none focus:outline-none focus:ring-2 focus:ring-blue-700"
                    rows="5"
                    placeholder="개선 사항을 입력해주세요 (최대 1000자)"
                    value={satisInfo.dscsnImp}
                    onChange={handleChangeInput}
                ></textarea>
            </div>

            <div className="flex justify-center gap-4">
                <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-6 py-2 rounded"
                    onClick={onClose}
                >
                닫기
                </button>
                <button 
                    className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-2 rounded"
                    onClick={()=>handleSubmit(satisInfo)}
                    disabled={!satisInfo.dscsnSatisfyScore}
                >
                    제출
                </button>
            </div>
        </div>
    );
}
export default ConsultSatisfaction;