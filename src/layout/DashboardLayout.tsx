import { Outlet } from 'react-router-dom';
import { SideMenu } from '../components';
import { useEffect } from 'react';
import { useProductStore } from '../store/product/product.store';
import { useMaterialStore } from '../store';

export const DashboardLayout = () => {
  const getAllProducts = useProductStore((state) => state.getAllProducts);
  const productsLoaded = useProductStore((state) => state.productsLoaded);

  const getMaterials = useMaterialStore((state) => state.getMaterials);
  const materialsLoaded = useMaterialStore((state) => state.materialsLoaded);
  useEffect(() => {
    if (!productsLoaded) {
      getAllProducts();
    }
  }, [getAllProducts, productsLoaded]);

  useEffect(() => {
    if (!materialsLoaded) {
      getMaterials();
    }
  }, [getMaterials, materialsLoaded]);
  return (
    <div className='bg-slate-200 h-screen antialiased text-slate-900 selection:bg-blue-900 selection:text-white'>
      <div className='h-screen'>
        <SideMenu />

        <div className='lg:ml-64 lg:pl-7 lg:flex lg:flex-col lg:w-75% mx-4 px-4 pt-10'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
