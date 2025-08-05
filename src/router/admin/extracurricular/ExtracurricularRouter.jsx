import ExtracurricularCategoryPage from '../../../pages/admin/Extracurricular/ExtracurricularCategoryPage';
import ExtracurricularProgramRequestPage from '../../../pages/admin/Extracurricular/ExtracurricularProgramReqeustPage';
import ExtracurricularProgramApplyPage from '../../../pages/admin/Extracurricular/ExtracurricularProgramApplyPage';
import ExtracurricularProgramAplicationPage from '../../../pages/admin/Extracurricular/ExtracurricularProgramAplicationPage';
import Admin from '../../../pages/admin/Extracurricular/Admin';
import SidebarLayout from '../../../layouts/admin/extracurricular/SidebarLayout';

const ExtracurricularRoutes = [
  {
    path: '/admin',
    element: <SidebarLayout />,
    children: [
      {
        path : 'extracurricular',
        element : <Admin/>
      },
      {
        path: 'extracurricular/category',
        element: <ExtracurricularCategoryPage />,
      },
      {
        path: 'extracurricular/program/aplication',
        element : <ExtracurricularProgramAplicationPage/>,
      },
      {
        path: 'extracurricular/program/request',
        element : <ExtracurricularProgramRequestPage/>,
      },
      {
        path: 'extracurricular/program/apply',
        element : <ExtracurricularProgramApplyPage/>,
      },
    ]
  }
];

export default ExtracurricularRoutes;