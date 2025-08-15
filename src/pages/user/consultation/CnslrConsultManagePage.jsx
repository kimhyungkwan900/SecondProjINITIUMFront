import { useAuth } from "../../../hooks/useAuth.jsx";

import UserTopBar from "../../../component/user/mainpage/UserTopBar";
import MainHeader from "../../../features/user/mainpage/MainHeader";
import CnslrConsultScheduleSelect from "../../../features/user/consultation/CnslrConsultScheduleSelect";

const CnslrConsultManagePage = ({type})=>{
    const { user } = useAuth();

    return(
        <div className="bg-white min-h-screen border border-gray-300">
            <UserTopBar />
            <MainHeader />

            {/* 상단 회색 박스 */}
            <div className="bg-gray-100 px-12 py-10 border-b border-gray-300 flex justify-between items-center">
                <h1 className="text-3xl font-semibold">상담종합</h1>
                <div className="text-2xl text-gray-600">HOME &gt; 상담종합</div>
            </div>
            <CnslrConsultScheduleSelect userInfo={user} type={type}/>
        </div>
    );
}
export default CnslrConsultManagePage