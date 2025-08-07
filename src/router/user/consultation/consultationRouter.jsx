import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>
const ApplyConsultMainPage = lazy(() => import("../../../pages/user/consultation/ApplyConsultMainPage"))
const ConsultListPage = lazy(() => import("../../../pages/user/consultation/ConsultListPage"))
const ApplyProfessorConsultPage = lazy(() => import("../../../pages/user/consultation/ApplyProfessorConsultPage"))
const ApplyRestConsultPage = lazy(() => import("../../../pages/user/consultation/ApplyRestConsultPage"))
const CnslrConsultManageMainPage = lazy(()=> import("../../../pages/user/consultation/CnslrConsultManageMainPage"))
const CnslrConsultListPage = lazy(()=> import("../../../pages/user/consultation/CnslrConsultListPage"))

const consultationRouter = [
    //학생
    {
        path: "/consult",
        element: <Suspense fallback={Loading}><ApplyConsultMainPage /></Suspense>,
    },
    {
        path: "/consult/list",
        element: <Suspense fallback={Loading}><ConsultListPage /></Suspense>,
    },
    {
        path: "/consult/apply/professor",
        element: <Suspense fallback={Loading}><ApplyProfessorConsultPage type={"a"}/></Suspense>,
    },
    {
        path: "/consult/apply/career",
        element: <Suspense fallback={Loading}><ApplyRestConsultPage type={"c"}/></Suspense>,
    },
    {
        path: "/consult/apply/psycho",
        element: <Suspense fallback={Loading}><ApplyRestConsultPage type={"p"}/></Suspense>,
    },
    {
        path: "/consult/apply/learning",
        element: <Suspense fallback={Loading}><ApplyRestConsultPage type={"l"}/></Suspense>,
    },
    // 상담사
    {
        path: "/cnslr/consult",
        element: <Suspense fallback={Loading}><CnslrConsultManageMainPage /></Suspense>,
    },
    {
        path: "/cnslr/consult/list",
        element:<Suspense fallback={Loading}><CnslrConsultListPage /></Suspense>,
    },
];
export default consultationRouter;