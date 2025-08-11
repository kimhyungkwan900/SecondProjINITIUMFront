import { useState } from "react";

const ScheduleBox = ({infos, onSelect})=>{
    const stop = (e) => e.stopPropagation();
    const [selected, setSelected] = useState(infos[0].dscsnDtId)

    const len = infos.length;

    if(len === 1) {
        const bgColor = infos[0].dscsnYn === "Y"? "bg-gray-400": "bg-blue-600";

        return(
            <div className={`w-full flex flex-col ${bgColor} text-white rounded px-3 py-3 text-sm`} onClick={() => onSelect(selected)}>
                <span className="w-2/3 justify-end text-black" >{infos[0].empName}</span>
            </div>
        );
    } else {
        const handleSelectChange = (e) => {
            setSelected(e.target.value);
        };

        return(
            <div className="w-full flex flex-col bg-blue-600 text-white rounded px-3 py-3 text-sm" onClick={() => onSelect(selected)}>
                <select className="w-2/3 justify-end text-black" onClick={stop} onChange={handleSelectChange}>
                    {infos.map((it) => (
                        <option key={it.dscsnDtId} value={it.dscsnDtId}>
                            {it.empName}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}
export default ScheduleBox;