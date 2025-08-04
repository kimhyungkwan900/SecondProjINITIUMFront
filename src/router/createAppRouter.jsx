import { createBrowserRouter } from "react-router-dom";
import loginRouter from "./user/auth/loginRouter";
import MainPage from "../pages/MainPage";
import ExtracurricularRoutes from "./admin/extracurricular/ExtracurricularRouter";
import { diagnosticRoutes } from "./user/diagnostic/diagnosticRouter";

const createAppRouter = () => {
    return createBrowserRouter([
        ...loginRouter,
        ...ExtracurricularRoutes,
        ...diagnosticRoutes,
        {
            path: "/",
            element: <MainPage />
        }
    ]);
};

export default createAppRouter;