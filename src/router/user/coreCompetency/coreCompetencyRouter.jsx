import CoreCompetencyList from "../../../component/user/coreCompetency/coreCompetencyList";
import CoreCompetencyResult from "../../../component/user/coreCompetency/coreCompetencyResult";
import CoreCompetencyMainPage from "../../../pages/user/coreCompetency/CoreCompetecyMainPage";
import CoreCompetencyAssessmentPage from "../../../pages/user/coreCompetency/CoreCompetencyAssessmentPage";
import CoreCompetencyTestPage from "../../../pages/user/coreCompetency/CoreCompetencyTestPage";


const coreCompetencyRouter = [
    {
        path: "/competency/notice",
        element: <CoreCompetencyMainPage />,
    },
    {
        path : "/competency/coreCompetency",
        element : <CoreCompetencyAssessmentPage/>
    },
    {
        path : "/competency/coreCompetency/result",
        element : <CoreCompetencyResult/>
    },
    {
        path : "/competency/coreCompetency/list",
        element : <CoreCompetencyList/>
    },
    {
        path : `/competency/coreCompetency/test/:id`,
        element : <CoreCompetencyTestPage/>
    }

    
];

export default coreCompetencyRouter;
