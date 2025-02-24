import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className='w-full h-auto p-10 App '>
      <div className='flex flex-col w-full h-full gap-20'>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
