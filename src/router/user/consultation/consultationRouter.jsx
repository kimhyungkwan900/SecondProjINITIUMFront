import { Suspense, lazy } from "react";
import RequireRole from "../../../component/common/Require/RequireRole";

const Loading = <div>Loading...</div>
const ApplyConsultMainPage = lazy(() => import("../../../pages/user/consultation/ApplyConsultMainPage"))
const ConsultListPage = lazy(() => import("../../../pages/user/consultation/ConsultListPage"))
const ApplyConsultPage = lazy(() => import("../../../pages/user/consultation/ApplyConsultPage"))
const CnslrConsultManageMainPage = lazy(()=> import("../../../pages/user/consultation/CnslrConsultManageMainPage"))
const CnslrConsultListPage = lazy(()=> import("../../../pages/user/consultation/CnslrConsultListPage"))
const CnslrConsultManagePage= lazy(()=> import("../../../pages/user/consultation/CnslrConsultManagePage"))

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
        element: <Suspense fallback={Loading}><ApplyConsultPage type={"A"}/></Suspense>,
    },
    {
        path: "/consult/apply/career",
        element: <Suspense fallback={Loading}><ApplyConsultPage type={"C"}/></Suspense>,
    },
    {
        path: "/consult/apply/psycho",
        element: <Suspense fallback={Loading}><ApplyConsultPage type={"P"}/></Suspense>,
    },
    {
        path: "/consult/apply/learning",
        element: <Suspense fallback={Loading}><ApplyConsultPage type={"L"}/></Suspense>,
    },
    // 상담사

    {
        path: "/cnslr",
        element: <RequireRole allow={["E"]} />,
        children: [
            {
                path: "consult",
                element: <Suspense fallback={Loading}><CnslrConsultManageMainPage /></Suspense>,
            },
            {
                path: "consult/list",
                element:<Suspense fallback={Loading}><CnslrConsultListPage /></Suspense>,
            },
            {
                path: "consult/manage/professor",
                element:<Suspense fallback={Loading}><CnslrConsultManagePage type={"A"}/></Suspense>,
            },
            {
                path: "consult/manage/career",
                element:<Suspense fallback={Loading}><CnslrConsultManagePage type={"C"}/></Suspense>,
            },
            {
                path: "consult/manage/psycho",
                element:<Suspense fallback={Loading}><CnslrConsultManagePage type={"P"}/></Suspense>,
            },
            {
                path: "consult/manage/learning",
                element:<Suspense fallback={Loading}><CnslrConsultManagePage type={"L"}/></Suspense>,
            },
        ]
    },
    
];
export default consultationRouter;