import { createBrowserRouter } from "react-router-dom";
import loginRouter from "./user/auth/loginRouter";
import MainPage from "../pages/MainPage";
import { diagnosticRoutes } from "./user/diagnostic/diagnosticRouter";
import coreCompetencyRouter from "./user/coreCompetency/coreCompetencyRouter";
import ExtracurricularRoutes from "./admin/extracurricular/ExtracurricularRouter";

const createAppRouter = () => {
    return createBrowserRouter([
        ...loginRouter,
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