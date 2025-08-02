import ExtracurricularCategoryPage from '../../../pages/admin/Extracurricular/ExtracurricularCategoryPage';
import Admin from '../../../pages/admin/Extracurricular/Admin';
import SidebarLayout from '../../../layouts/admin/extracurricular/SidebarLayout';

const ExtracurricularRoutes = [
  {
    path: '/admin',
    element: <SidebarLayout />,
    children: [
      {
        path : '',
        element : <Admin/>
      },
      {
        path: 'extracurricular/category',
        element: <ExtracurricularCategoryPage />,
      },
    ]
  }
];

export default ExtracurricularRoutes;