import CoreCompetencyMainPage from "../../../pages/user/coreCompetency/CoreCompetecyMainPage";
import CoreCompetencyAssessmentPage from "../../../pages/user/coreCompetency/CoreCompetencyAssessmentPage";


const coreCompetencyRouter = [
    {
        path: "/competency/notice",
        element: <CoreCompetencyMainPage />,
    },
    {
        path : "/competency/coreCompentency",
        element : <CoreCompetencyAssessmentPage/>
    }
];

export default coreCompetencyRouter;
