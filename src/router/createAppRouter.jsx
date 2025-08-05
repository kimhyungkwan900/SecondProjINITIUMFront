import { createBrowserRouter } from "react-router-dom";
import loginRouter from "./user/auth/loginRouter";
import MainPage from "../pages/MainPage";
import ExtracurricularRoutes from "./admin/extracurricular/ExtracurricularRouter";
import { diagnosticRoutes } from "./user/diagnostic/diagnosticRouter";
import coreCompetencyRouter from "./user/coreCompetency/coreCompetencyRouter";

const createAppRouter = () => {
    return createBrowserRouter([
        ...loginRouter,
        ...ExtracurricularRoutes,
        ...diagnosticRoutes,
        ...coreCompetencyRouter,
        ...diagnosticRoutes,
        ...coreCompetencyRouter,
        ...ExtracurricularRoutes,
        {
            path: "/",
            element: <MainPage />
        }
    ]);
};

export default createAppRouter;