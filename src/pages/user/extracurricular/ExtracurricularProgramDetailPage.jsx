import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { programDetail } from "../../../api/user/extracurricular/UserProgramApi";

import MainHeader from "../../../features/user/mainpage/MainHeader";
import UserTopBar from "../../../component/user/mainpage/UserTopBar";
import HeaderContent from "../../../component/user/extracurricular/HeadeContent";

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
      } catch (err) {
        console.error(err);
      }
    };

    fetchProgramDetail();
  }, [id]);


    return(
        <div className="min-h-screen bg-[#f6f9fc] flex flex-col items-center" >
            <div className="fixed top-0 left-0 w-full z-50">
            <UserTopBar/>
            <MainHeader/>
            </div>
            
            <div className="w-[56.5%] min-w-[56.5%] m-auto">
                <div className="gap-10 m-auto px-4 flex flex-wrap w-full min-h-[400px] items-center justify-center border shadow rounded bg-white">
                    <HeaderContent/>
                </div>
            </div>
        </div>
    )
}

export default ExtracurricularProgramDetailPage;