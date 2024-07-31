import { Button } from 'flowbite-react';
import { useState } from 'react';

import { CreateProductDto } from '../../interfaces';
import { CustomTable, ProductFormModal } from '../../components';

import toast, { Toaster } from 'react-hot-toast';
import { useProductStore } from '../../store';
import { IoAddOutline, IoReloadOutline } from 'react-icons/io5';

export const ProductsPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const createProduct = useProductStore((state) => state.createProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);
  const setProductToEdit = useProductStore((state) => state.setProductToEdit);
  const getAllProducts = useProductStore((state) => state.getAllProducts);

  const products = useProductStore((state) => state.products);
  const productToEdit = useProductStore((state) => state.productToEdit);

  const handleSubmit = async (values: CreateProductDto) => {
    try {
      await createProduct(values);
      toast.success('Product created successfully');
      setOpenModal(false);
    } catch (error) {
      toast.error('Something went wrong');

      console.log(error);
    }
  };

  const handleRefresh = async () => {
    await getAllProducts();
  };

  const handleEdit = async (id: string) => {
    //find the product
    setOpenModalEdit(true);

    const editedProduct = products.find((product) => product.id === Number(id));

    setProductToEdit(editedProduct);
  };

  const handleSubmitEdit = async (editProduct: CreateProductDto) => {
    try {
      await updateProduct(editProduct);
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
        <h1> Products</h1>
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
      <ProductFormModal
        type='create'
        open={openModal}
        onSubmit={handleSubmit}
        onClose={() => setOpenModal(false)}
      />

      <CustomTable
        data={products}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Nombre' },
        ]}
        handleEdit={handleEdit}
      />

      <ProductFormModal
        type='edit'
        open={openModalEdit}
        onClose={() => setOpenModalEdit(false)}
        onSubmit={handleSubmitEdit}
        initialValues={productToEdit}
      />
    </>
  );
};
