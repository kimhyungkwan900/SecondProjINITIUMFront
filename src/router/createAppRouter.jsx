import { createBrowserRouter } from "react-router-dom";
import loginRouter from "./user/auth/loginRouter";
import MainPage from "../pages/MainPage";

const createAppRouter = () => {
    return createBrowserRouter([
        ...loginRouter,
        {
            path: "/",
            element: <MainPage />
        }
    ]);
};

export default createAppRouter;