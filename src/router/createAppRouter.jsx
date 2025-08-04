import { createBrowserRouter } from "react-router-dom";
import loginRouter from "./user/auth/loginRouter";
import MainPage from "../pages/MainPage";
import coreCompetencyRouter from "./user/coreCompetency/coreCompetencyRouter";

const createAppRouter = () => {
    return createBrowserRouter([
        ...loginRouter,
        ...coreCompetencyRouter,
        {
            path: "/",
            element: <MainPage />
        }
    ]);
};

export default createAppRouter;