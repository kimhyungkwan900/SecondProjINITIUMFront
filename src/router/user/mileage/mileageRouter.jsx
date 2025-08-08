import { createBrowserRouter } from "react-router-dom";
import MyMileagePage from "@/pages/mileage/MyMileagePage";

export const router = createBrowserRouter([
  
  { path: "/mileage/me", element: <MyMileagePage /> },
]);