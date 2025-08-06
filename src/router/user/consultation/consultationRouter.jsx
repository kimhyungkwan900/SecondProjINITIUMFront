import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>
const ApplyConsultMainPage = lazy(() => import("../../../pages/user/consultation/applyConsultMainPage"))
const ConsultListPage = lazy(() => import("../../../pages/user/consultation/ConsultListPage"))
const ApplyProfessorConsultPage = lazy(() => import("../../../pages/user/consultation/ApplyProfessorConsultPage"))

const consultationRouter = [
    {
        path: "/consult",
        element:<Suspense fallback={Loading}><ApplyConsultMainPage /></Suspense>,
    },
    {
        path: "/consult/list",
        element:<Suspense fallback={Loading}><ConsultListPage /></Suspense>,
    },
    {
        path: "/consult/apply/professor",
        element:<Suspense fallback={Loading}><ApplyProfessorConsultPage /></Suspense>,
    },
];
export default consultationRouter;