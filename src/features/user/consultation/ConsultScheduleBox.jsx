const ScheduleBox = ()=>{
    return(
        <div className="w-full flex flex-col bg-blue-600 text-white rounded px-2 py-3 text-sm">
            <div className="mb-2">
                <span className="font-medium">9:00</span>
                <span className="ml-2">예약 대기</span>
            </div>
            <select className="w-2/3 justify-end text-black">
                <option>테스트1</option>
                <option>테스트2</option>
            </select>
        </div>
    );
}
export default ScheduleBox;