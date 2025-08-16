import { useState } from "react";

const ScheduleBox = ({infos, onSelect})=>{
    const stop = (e) => e.stopPropagation();
    const [selected, setSelected] = useState(infos[0].dscsnDtId)

    const len = infos.length;

    if(len === 1) {
        const bgColor = infos[0].dscsnYn === "Y"? "bg-gray-400": "bg-blue-400";
        const hoverColor = infos[0].dscsnYn === "Y"? "": "bg-blue-500";

        return(
            <div className={`w-full flex flex-col ${bgColor} text-white rounded px-1 py-3 overflow-hidden hover:cursor-pointer hover:${hoverColor} transition`} onClick={() => onSelect(selected)}>
                <span className={`w-full justify-end text-black ${bgColor} text-xs overflow-hidden group-hover:${hoverColor}`} >{infos[0].empName}</span>
            </div>
        );
    } else {
        const handleSelectChange = (e) => {
            setSelected(e.target.value);
        };

        return(
            <div className="w-full flex flex-col bg-blue-400 text-white rounded px-1 py-3 text-xs hover:cursor-pointer hover:bg-blue-500 transition" onClick={() => onSelect(selected)}>
                <select className="w-full justify-end text-black bg-blue-400 group-hover:bg-blue-500 transition" onClick={stop} onChange={handleSelectChange}>
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