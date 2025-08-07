import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { programDetail } from "../../../api/user/extracurricular/UserProgramApi";

import MainHeader from "../../../features/user/mainpage/MainHeader";
import UserTopBar from "../../../component/user/mainpage/UserTopBar";
import HeaderContent from "../../../component/user/extracurricular/HeadeContent";
import SubContent from "../../../component/user/extracurricular/SubContent";
import Schedule from "../../../component/user/extracurricular/Schedule";

const ExtracurricularProgramDetailPage = () => {
    const {id} = useParams();
    const [program, setProgram] = useState(null);

    useEffect(() => {
    if (!id){
        return;
    } 
    console.log(program);
    
    const fetchProgramDetail = async () => {
      try {
        const data = await programDetail(id);
        setProgram(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProgramDetail();
  }, [id]);

    return(
        <div className="min-h-screen bg-[#f6f9fc] flex flex-col items-center pt-[220px]"> 
          {/* pt-[100px]는 상단 고정 바 높이만큼 padding */}
          <div className="fixed top-0 left-0 w-full z-50">
            <UserTopBar />
            <MainHeader />
          </div>

          <div className="w-[62.6%] min-w-[62.6%] flex flex-col gap-3">
            <div className="gap-10 m-auto px-4 py-7 flex flex-wrap w-full min-h-[400px] items-center justify-center border shadow rounded bg-white">
              {program && <HeaderContent {...program}/>}
            </div>
            
          <div className="gap-10 m-auto px-4 py-7 w-full min-h-[100px] border shadow rounded bg-white">
              {program && <SubContent {...program} />}
            </div>

            <div className="gap-10 m-auto px-4 py-7 flex flex-wrap w-full min-h-[50px] items-center border shadow rounded bg-white">
              {program && <Schedule {...program} />}
            </div>
          </div>
        </div>
    )
}

export default ExtracurricularProgramDetailPage;