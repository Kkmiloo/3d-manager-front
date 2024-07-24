import { Outlet } from 'react-router-dom';
import { SideMenu } from '../components';

export const DashboardLayout = () => {
  return (
    <div className='bg-slate-200 w-screen h-screen antialiased text-slate-900 selection:bg-blue-900 selection:text-white'>
      <div className='flex flex-row relative w-screen h-screen'>
        <SideMenu />

        <div className='w-full p-7'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
