import { RouterProvider } from "react-router-dom";
import createAppRouter from "./router/createAppRouter";

const TestApp = () => {
  return (
    <RouterProvider router={createAppRouter()} />
  );
};

export default TestApp;