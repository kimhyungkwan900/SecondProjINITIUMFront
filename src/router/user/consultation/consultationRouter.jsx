import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>
const ApplyConsultMainPage = lazy(() => import("../../../pages/user/consultation/applyConsultMainPage"))

const consultationRouter = [
    {
        path:"/consult",
        element:<Suspense fallback={Loading}><ApplyConsultMainPage /></Suspense>,
    },
    {

    }
];
export default consultationRouter;