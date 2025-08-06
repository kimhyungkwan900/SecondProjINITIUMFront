import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>
const ApplyConsultMainPage = lazy(() => import("../../../pages/user/consultation/applyConsultMainPage"))
const ConsultListPage = lazy(() => import("../../../pages/user/consultation/ConsultListPage"))

const consultationRouter = [
    {
        path: "/consult",
        element:<Suspense fallback={Loading}><ApplyConsultMainPage /></Suspense>,
    },
    {
        path: "/consult/list",
        element:<Suspense fallback={Loading}><ConsultListPage /></Suspense>,
    }
];
export default consultationRouter;