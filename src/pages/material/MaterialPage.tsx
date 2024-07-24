import { useEffect } from 'react';

import { useMaterialStore } from '../../store';
import { CustomTable } from '../../components';

export const MaterialPage = () => {
  const materials = useMaterialStore((state) => state.materials);
  const getMaterials = useMaterialStore((state) => state.getMaterials);
  const materialsLoaded = useMaterialStore((state) => state.materialsLoaded);

  useEffect(() => {
    if (!materialsLoaded) {
      getMaterials();
    }
  }, [getMaterials, materialsLoaded]);

  return (
    <>
      <h1> Materiales</h1>

      <div className='mt-6 '>
        <CustomTable data={materials} columns={['id', 'name', 'type']} />
      </div>
    </>
  );
};
