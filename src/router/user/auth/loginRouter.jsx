import LoginPage from "../../../pages/user/login/UserLoginPage";
import HomePage from "../../../pages/user/diagnostic/HomePage";

const loginRouter = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <HomePage />
  }
];

export default loginRouter;