import RequireAdmin from "../../component/admin/RequireAdmin";
import AdminLayout from "../../layouts/admin/AdminLayout";
import AdminMainPage from "../../pages/admin/adminMainPage";
import StudentListPage from "../../pages/admin/students/StudentListPage";


const adminMainRouter = [
  {
    path: "/admin",
    element: <RequireAdmin />,
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          { path: "", element: <AdminMainPage /> },
          { path: "students/student-list", element: <StudentListPage /> }
        ]
      }
    ]
  }
];

export default adminMainRouter;