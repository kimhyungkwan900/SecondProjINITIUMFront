import { useState } from "react";
import AdminSectionHeader from "../../../component/admin/AdminSectionHeader";
import CnslrConsultScheduleSelect from "../../../features/user/consultation/CnslrConsultScheduleSelect";
import TextInput from "../../../component/common/TextInput";
import { fetchEmployeeByNo } from "../../../api/user/auth/employeesApi";

const AdminConsultManagePage = ()=>{
    const labelCls = "block text-xs font-medium text-gray-700 mb-1 truncate";

    const [empNo, setEmpNo] = useState("");
    const [empInfo, setEmpInfo] = useState();
    const [type, setType] = useState("A");

    const handleSearch = async()=>{
        const empInfo = await fetchEmployeeByNo(empNo)
        console.log(empInfo)
        setEmpInfo(empInfo)
    }

    return(
        <div>
            <AdminSectionHeader title="상담일정 등록" />
            <div className="bg-white border border-gray-200 rounded-lg p-4">
                {/* 사번 / 이름 / 직원상태 /  소속  */}
                <div className="grid grid-cols-4 gap-x-2 gap-y-1">
                    <div className="col-span-1 min-w-0">
                        <label className={labelCls}>사번</label>
                        <input
                            className = "w-full rounded-md border border-blue-200 px-2 py-1 text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="사번 입력"
                            value={empNo}
                            onChange={(e) => setEmpNo(e.target.value)}
                        />
                    </div>
                    <div className="col-span-1 min-w-0">
                        <label className={labelCls}>이름</label>
                        <input
                            className = "w-full rounded-md border border-blue-200 px-2 py-1 text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
                            value={empInfo?.name??""}
                            disabled
                        />
                    </div>
                    <div className="col-span-1 min-w-0">
                        <label className={labelCls}>직원상태</label>
                        <input
                            className = "w-full rounded-md border border-blue-200 px-2 py-1 text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
                            value={empInfo?.employeeStatusCode === '10'
                                    ? '재직'
                                    : empInfo?.StatusCode === '20'
                                    ? '휴직'
                                    : ''}
                            disabled

                        />
                    </div>
                    <div className="col-span-1 min-w-0">
                        <label className={labelCls}>상담 구분</label>
                        <select className = "w-full rounded-md border border-blue-200 px-2 py-1 text-base focus:outline-none focus:ring-2 focus:ring-blue-300">
                            <option value="A">지도교수 상담</option>
                            <option value="C">진로취업 상담</option>
                            <option value="P">심리상담</option>
                            <option value="L">학습상담</option>
                        </select>
                    </div>
                    <div className="col-span-2 min-w-0">
                        <label className={`${labelCls} text-white`}>.</label>
                        <button
                            className=" h-10 bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-1 rounded align-bottom"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            onClick={handleSearch}
                        >조회</button>
                    </div>
                </div>
            </div>
            <br/>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
                <CnslrConsultScheduleSelect
                    userInfo={empInfo} type={type}
                />
            </div>
        </div>
    );
}
export default AdminConsultManagePage;