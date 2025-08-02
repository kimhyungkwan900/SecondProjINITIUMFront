import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const SidebarLayout = () => {
  return (
    <div className="flex">
      <aside className="w-64"> <Sidebar/></aside>
      <main className="flex-1"> <Outlet/> </main>
    </div>
  );
};

export default SidebarLayout;