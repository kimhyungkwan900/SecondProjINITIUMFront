const ScheduleBox = ({onSelect})=>{
    const stop = (e) => e.stopPropagation();

    return(
        <div className="w-full flex flex-col bg-blue-600 text-white rounded px-3 py-3 text-sm" onClick={onSelect}>

            <select className="w-2/3 justify-end text-black" onClick={stop} >
                <option>테스트1</option>
                <option>테스트2</option>
            </select>
        </div>
    );
}
export default ScheduleBox;