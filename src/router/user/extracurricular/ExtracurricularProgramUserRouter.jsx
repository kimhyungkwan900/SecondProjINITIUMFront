import ExtracurricularProgramListPage from "../../../pages/user/extracurricular/ExtracurricularProgramListPage";
import ExtracurricularProgramDetailPage from "../../../pages/user/extracurricular/ExtracurricularProgramDetailPage";
const ExtracurricularProgramRouter = [
    {
        path : "/programs/:status",
        element : <ExtracurricularProgramListPage/>
    },
    {
        path : "/program/:id",
        element : <ExtracurricularProgramDetailPage/>
    }
]

export default ExtracurricularProgramRouter;