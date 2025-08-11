import MyMileagePage from "../../../pages/user/mileage/MyMileagePage";
import ScholarshipApplyPage from "../../../pages/user/mileage/ScholarshipApplyPage"; 
import ScholarshipStatusPage from "../../../pages/user/mileage/ScholarshipStatusPage";

const mileageRouter = [
  {
    path: "/mileage",
    element: <MyMileagePage />
  },
  { path: "/mileage/apply",
    element: <ScholarshipApplyPage /> 
  },
  { path: "/mileage/status", 
    element: <ScholarshipStatusPage /> },
  
];

export default mileageRouter;
