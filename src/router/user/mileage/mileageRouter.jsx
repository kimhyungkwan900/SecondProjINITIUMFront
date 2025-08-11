import MyMileagePage from "../../../pages/user/mileage/MyMileagePage";
import ScholarshipApplyPage from "../../../pages/user/mileage/ScholarshipApplyPage"; 
import ScholarshipStatusPage from "../../../pages/user/mileage/ScholarshipStatusPage";

const mileageRouter = [
  {
    path: "/mypage/mileage",
    element: <MyMileagePage />
  },
  { path: "/mypage/mileage/apply",
    element: <ScholarshipApplyPage /> 
  },
  { path: "/mypage/mileage/status", 
    element: <ScholarshipStatusPage /> },
  
];

export default mileageRouter;
