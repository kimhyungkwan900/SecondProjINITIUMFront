import { createBrowserRouter } from "react-router-dom";
import loginRouter from "./user/auth/loginRouter";
import MainPage from "../pages/MainPage";
import ExtracurricularRoutes from "./admin/extracurricular/ExtracurricularRouter";
const createAppRouter = () => {
    return createBrowserRouter([
        ...loginRouter,
        ...ExtracurricularRoutes,
        {
            path: "/",
            element: <MainPage />
        }
    ]);
};

export default createAppRouter;