import TextInput from "../../../component/common/TextInput";

const ConsultKindForm = ()=>{
  return(
    <div className="grid grid-cols-2 gap-3">
        {/* 이름 */}
        <label className="flex flex-col text-sm">
        <span className="font-medium text-gray-700 mb-1">
            이름 <span className="text-red-500">*</span>
        </span>
        <TextInput
            value={value.name || ""}
            onChange={update("name")}
            placeholder="홍길동"
            disabled={isRO("name")}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
        />
        </label>
    </div>
  );
}
export default ConsultKindForm;