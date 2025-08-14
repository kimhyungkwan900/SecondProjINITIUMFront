import CoreCompetencyListPage from "../../../pages/user/coreCompetency/CoreCompetencyListPage";
import CoreCompetencyResultPage from "../../../pages/user/coreCompetency/CoreCompetencyResultPage";
import CoreCompetencyMainPage from "../../../pages/user/coreCompetency/CoreCompetecyMainPage";
import CoreCompetencyAssessmentPage from "../../../pages/user/coreCompetency/CoreCompetencyAssessmentPage";
import CoreCompetencyTestPage from "../../../pages/user/coreCompetency/CoreCompetencyTestPage";
import CoreCompetencyResultView from "../../../component/user/coreCompetency/result/CoreCompetencyResultView";
import AdminCoreCompetencyResultPdf from "../../../pages/admin/coreCompetency/result/AdminCoreCompetencyResultPdf";

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
        path : `/competency/coreCompetency/result/student`,
        element : <AdminCoreCompetencyResultPdf/>
    },
    {
        path : "/competency/coreCompetency/list",
        element : <CoreCompetencyListPage/>
    },
    {
        path : `/competency/coreCompetency/test/:assessmentId`,
        element : <CoreCompetencyTestPage/>
    },
    {
        path : `/competency/coreCompetency/result/:studentNo/:assessmentNo`,
        element : <CoreCompetencyResultView/>
    },
];

export default coreCompetencyRouter;
