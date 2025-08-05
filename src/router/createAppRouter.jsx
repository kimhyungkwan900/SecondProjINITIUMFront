import { createBrowserRouter } from "react-router-dom";
import loginRouter from "./user/auth/loginRouter";
import consultationRouter from "./user/consultation/consultationRouter";
import MainPage from "../pages/MainPage";

const createAppRouter = () => {
    return createBrowserRouter([
        ...loginRouter,
        ...consultationRouter,
        {
            path: "/",
            element: <MainPage />
        }
    ]);
};

export default createAppRouter;