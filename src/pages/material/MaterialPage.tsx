import { useState } from 'react';

import { useMaterialStore } from '../../store';
import { CustomTable } from '../../components';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from 'flowbite-react';
import { MaterialFormModal } from '../../components/forms/MaterialFormModal';
import { CreateMaterialDto } from '../../interfaces';
import { IoAddOutline, IoReloadOutline } from 'react-icons/io5';

export const MaterialPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const materials = useMaterialStore((state) => state.materials);
  const materialToEdit = useMaterialStore((state) => state.materialToEdit);

  const createMaterial = useMaterialStore((state) => state.createMaterial);
  const updateMaterial = useMaterialStore((state) => state.updateMaterial);
  const getMaterials = useMaterialStore((state) => state.getMaterials);

  const setMaterialToEdit = useMaterialStore(
    (state) => state.setMaterialToEdit
  );

  const handleSubmit = async (values: CreateMaterialDto) => {
    try {
      await createMaterial(values);
      toast.success('Product created successfully');
      setOpenModal(false);
    } catch (error) {
      toast.error('Something went wrong');

      console.log(error);
    }
  };

  const handleEdit = async (id: string) => {
    //find the product
    setOpenModalEdit(true);

    const editedMaterial = materials.find((material) => material.id === id);

    setMaterialToEdit(editedMaterial);
  };

  const handleRefresh = async () => {
    await getMaterials();
  };

  const handleSubmitEdit = async (editMaterial: CreateMaterialDto) => {
    try {
      await updateMaterial(editMaterial);
      toast.success('Product created successfully');
      setOpenModalEdit(false);
    } catch (error) {
      toast.error('Something went wrong');

      console.log(error);
    }
  };

  return (
    <>
      <div className=' flex justify-between mb-6'>
        <Toaster position='top-center' reverseOrder={false} />
        <h1> Material </h1>
        <div className='flex gap-2'>
          <Button size={'sm'} onClick={() => setOpenModal(true)}>
            <IoAddOutline className='mr-1 h-5 w-5' />
            Create Product
          </Button>
          <Button color={'dark'} size={'sm'} onClick={handleRefresh}>
            <IoReloadOutline className='mr-1 h-5 w-5' />
            Refresh
          </Button>
        </div>
      </div>

      <MaterialFormModal
        formType='create'
        open={openModal}
        onSubmit={handleSubmit}
        onClose={() => setOpenModal(false)}
      />
      <div className='mt-6 '>
        <CustomTable
          data={materials}
          columns={['id', 'name', 'type']}
          handleEdit={handleEdit}
        />
      </div>

      <MaterialFormModal
        formType='edit'
        open={openModalEdit}
        initialValues={materialToEdit}
        onSubmit={handleSubmitEdit}
        onClose={() => setOpenModalEdit(false)}
      />
    </>
  );
};
