
import MainHeader from "../../../features/user/mainpage/MainHeader";
import CoreCompetencyImage from "../../../features/user/coreCompetency/CoreCompetencyImage";
import CoreCompetencyTable from "../../../features/user/coreCompetency/CoreCompetencyTable";

export default function CoreCompetencyMainPage() {

    return (
        <div className="bg-white min-h-screen px-12 py-10">
            <MainHeader />
            <h1 className="text-2xl font-bold mt-6 mb-6">핵심역량 안내</h1>
                <div className="text-center">
                    <CoreCompetencyImage/>
                    <CoreCompetencyTable/>
                </div>
        </div>
    );
}
