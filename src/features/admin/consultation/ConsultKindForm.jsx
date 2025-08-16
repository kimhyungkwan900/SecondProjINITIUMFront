import TextInput from "../../../component/common/TextInput";

const ConsultKindForm = ({mode, kind, setKind})=>{
    const update = (key) => (e) =>
    setKind((prev) => ({ ...prev, [key]: e.target?.value ?? e }));

    const isDisabled = mode !== 'create';

    return(
        <div className="grid grid-cols-1 gap-3 mt-3">
            {/* 상담항목 코드 */}
            <label className="flex flex-col text-sm ">
                <span className="font-medium text-gray-700 mb-1">
                    상담항목 코드 <span className="text-red-500">*</span>
                </span>
                <input type="text" value={kind.dscsnKindId} onChange={update("dscsnKindId")} disabled={isDisabled} className="w-full rounded-md border border-blue-200 px-2 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-300"/>
            </label>
            {/* 상담항목명 */}
            <label className="flex flex-col text-sm">
                <span className="font-medium text-gray-700 mb-1" >
                    상담항목명 <span className="text-red-500">*</span>
                </span>
                <input type="text" value={kind.dscsnKindName} onChange={update("dscsnKindName")} className="w-full rounded-md border border-blue-200 px-2 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-300"/>
            </label>
            {/* 상담종류 */}
            <label className="flex flex-col text-sm">
                <span className="font-medium text-gray-700 mb-1">
                    상담종류 <span className="text-red-500">*</span>
                </span>
                <input type="text" value={kind.dscsnTypeName} onChange={update("dscsnTypeName")} className="w-full rounded-md border border-blue-200 px-2 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-300"/>
            </label>
        </div>
    );
}
export default ConsultKindForm;