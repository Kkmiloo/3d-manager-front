import type { IconType } from 'react-icons';
import {
  IoSpeedometerOutline,
  IoPawOutline,
  IoLogOutOutline,
  IoHeartOutline,
  IoListOutline,
  IoAccessibilityOutline,
  IoFlask,
} from 'react-icons/io5';

interface MenuItem {
  title: string;
  subTitle: string;
  href: string;
  Icon: IconType;
}

import './SideMenu.css';
import { SideMenuItem } from './SideMenuItem';

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    subTitle: 'Visualizar data',
    href: '.',
    Icon: IoSpeedometerOutline,
  },
  {
    title: 'Productos',
    subTitle: '3d',
    href: './products',
    Icon: IoPawOutline,
  },
  {
    title: 'Material',
    subTitle: 'filamentos',
    href: './material',
    Icon: IoFlask,
  },
  {
    title: 'Cotizador',
    subTitle: 'impresiones',
    href: './quoter',
    Icon: IoAccessibilityOutline,
  },
  {
    title: 'Impresiones',
    subTitle: 'Registro de impresiones',
    href: './printing',
    Icon: IoListOutline,
  },
  {
    title: 'Acumulado',
    subTitle: 'acumulado algo',
    href: './accumulated',
    Icon: IoHeartOutline,
  },
];

export const SideMenu = () => {
  return (
    <>
      <div
        id='menu'
        className='bg-gray-800 min-h-screen  text-slate-300 hidden lg:block fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 '
      >
        <div id='logo' className='my-4 px-6'>
          {/* Title */}
          <h1 className='text-lg md:text-2xl font-bold text-white '>Farú</h1>
          <p className='text-slate-500 text-sm'>
            Dashboard de administración de productos 3D
          </p>
        </div>

        {/*  Profile */}
        <div id='profile' className='px-6 py-10'>
          <p className='text-slate-500'>Bienvenido,</p>
          <a href='#' className='inline-flex space-x-2 items-center'>
            <span>
              <img
                className='rounded-full w-8 h-8'
                src='https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80'
                alt=''
              />
            </span>
            <span className='text-sm md:text-base font-bold'>{}</span>
          </a>
        </div>

        {/* Menu Items */}
        <nav id='nav' className='w-full px-6'>
          {menuItems.map((item) => (
            <SideMenuItem key={item.href} {...item} />
          ))}

          {/* Logout */}
          <a className='mt-10'>
            <div>
              <IoLogOutOutline />
            </div>
            <div className='flex flex-col'>
              <span className='text-lg text-slate-300 font-bold leading-5'>
                Logout
              </span>
              <span className='text-sm text-slate-500 hidden md:block'>
                Cerrar sesión
              </span>
            </div>
          </a>
        </nav>

        {/* Mobile Menu collapsible */}
      </div>

      <div className='lg:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-gray-800 text-white flex justify-around items-center'>
        {menuItems.map((item) => (
          <a key={item.href} href={item.href}>
            <div className='flex flex-col items-center'>
              <item.Icon />
              {item.title}
            </div>
          </a>
        ))}
      </div>
    </>
  );
};
