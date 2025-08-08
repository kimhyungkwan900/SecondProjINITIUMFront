import { Outlet } from 'react-router-dom';
import DeprecatedSidebar from '../../../Deprecated/DeprecatedSidebar';

const SidebarLayout = () => {
  return (
    <div className="flex">
      <aside className="w-64"> <DeprecatedSidebar/></aside>
      <main className="flex-1"> <Outlet/> </main>
    </div>
  );
};

export default SidebarLayout;