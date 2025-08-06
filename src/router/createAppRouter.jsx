import { createBrowserRouter } from "react-router-dom";
import loginRouter from "./user/auth/loginRouter";
import consultationRouter from "./user/consultation/consultationRouter";
import MainPage from "../pages/MainPage";
import ExtracurricularRoutes from "./admin/extracurricular/ExtracurricularRouter";
import { diagnosticRoutes } from "./user/diagnostic/diagnosticRouter";
import coreCompetencyRouter from "./user/coreCompetency/coreCompetencyRouter";

const createAppRouter = () => {
    return createBrowserRouter([
        ...loginRouter,
        ...consultationRouter,
        ...ExtracurricularRoutes,
        ...diagnosticRoutes,
        ...coreCompetencyRouter,
        {
            path: "/",
            element: <MainPage />
        }
    ]);
};

export default createAppRouter;