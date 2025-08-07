import CoreCompetencyListPage from "../../../pages/user/coreCompetency/CoreCompetencyListPage";
import CoreCompetencyResultPage from "../../../pages/user/coreCompetency/CoreCompetencyResultPage";
import CoreCompetencyMainPage from "../../../pages/user/coreCompetency/CoreCompetecyMainPage";
import CoreCompetencyAssessmentPage from "../../../pages/user/coreCompetency/CoreCompetencyAssessmentPage";
import CoreCompetencyTestPage from "../../../pages/user/coreCompetency/CoreCompetencyTestPage";
import AdminCoreCompetencyAssessment from "../../../pages/admin/coreCompetency/assessment/AdminCoreCompetencyAssessment";
import AdminCoreCompetencyResult from "../../../pages/admin/coreCompetency/result/AdminCoreCompetencyResult";


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
        element : <CoreCompetencyResultPage/>
    },
    {
        path : "/competency/coreCompetency/list",
        element : <CoreCompetencyListPage/>
    },
    {
        path : `/competency/coreCompetency/test/:assessmentId`,
        element : <CoreCompetencyTestPage/>
    }
    ,
    {
        path : "/admin/coreCompetency/assessment",
        element : <AdminCoreCompetencyAssessment/>
    },
    {
        path : "/admin/coreCompetency/assessment/result",
        element : <AdminCoreCompetencyResult/>
    }


    
];

export default coreCompetencyRouter;
