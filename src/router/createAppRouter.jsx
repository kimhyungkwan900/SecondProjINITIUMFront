import { createBrowserRouter } from "react-router-dom";
import loginRouter from "./user/auth/loginRouter";
import consultationRouter from "./user/consultation/consultationRouter";
import MainPage from "../pages/MainPage";
import ExtracurricularRoutes from "./admin/extracurricular/ExtracurricularRouter";
import { diagnosticRoutes } from "./user/diagnostic/diagnosticRouter";
import coreCompetencyRouter from "./user/coreCompetency/coreCompetencyRouter";
import ExtracurricularProgramRouter from "./user/extracurricular/ExtracurricularProgramUserRouter";
import adminMainRouter from "./admin/adminMainRouter";
import myPageRouter from "./user/myPage/myPageRouter";
import NotFoundPage from "../pages/user/diagnostic/NotFoundPage";

const createAppRouter = () => {
    return createBrowserRouter([
        ...loginRouter,
        ...consultationRouter,
        ...ExtracurricularRoutes,
        ...diagnosticRoutes,
        ...coreCompetencyRouter,
        ...ExtracurricularProgramRouter,
        ...adminMainRouter,
        ...myPageRouter,

        { path: "/", element: <MainPage /> },

        // 404
        { path: '*', element: <NotFoundPage /> }
    ]);
};

export default createAppRouter;