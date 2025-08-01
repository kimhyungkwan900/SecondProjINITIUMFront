import { createBrowserRouter } from "react-router-dom";
import loginRouter from "./user/auth/loginRouter";

const createAppRouter = () => {
    return createBrowserRouter([
        ...loginRouter,
          ]);
};

export default createAppRouter;