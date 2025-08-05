import SideMenu from "../../../component/user/consultation/sideMenu";
import UserTopBar from "../../../component/user/mainpage/UserTopBar";
import MainHeader from "../../../features/user/mainpage/MainHeader";

const ApplyConsultMainPage = ()=>{
    return(
        <div className="min-h-screen bg-[#f6f9fc] flex flex-col items-center">
            <UserTopBar />
            <MainHeader />
            <SideMenu a1={'상담신청'} a2={'상담내역'}/>
        </div>
    );
}
export default ApplyConsultMainPage;