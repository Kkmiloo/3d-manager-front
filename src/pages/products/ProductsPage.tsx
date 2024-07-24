import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';

import { CreateProductDto, ProductI } from '../../interfaces';
import { CustomTable, ProductForm } from '../../components';

import toast, { Toaster } from 'react-hot-toast';
import { useProductStore } from '../../store/product/product.store';
import { useMaterialStore } from '../../store';

interface ProductWithMaterialNameI extends ProductI {
  type: string;
}

export const ProductsPage = () => {
  const [openModal, setOpenModal] = useState(false);

  const createProduct = useProductStore((state) => state.createProduct);
  const getAllProducts = useProductStore((state) => state.getAllProducts);
  const products = useProductStore((state) => state.products);
  const productsLoaded = useProductStore((state) => state.productsLoaded);

  const materials = useMaterialStore((store) => store.materials);

  const [productsWithMaterialNames, setProductsWithMaterialNames] = useState<
    ProductWithMaterialNameI[]
  >([]);

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

  useEffect(() => {
    if (!productsLoaded) {
      getAllProducts();
    }
  }, [getAllProducts, productsLoaded]);

  useEffect(() => {
    const productsWithMaterialNames = products.map((product) => {
      const material = materials.find(
        (material) => material.id === product.materialId
      );
      return {
        ...product,
        type: material?.type || '',
      };
    });
    setProductsWithMaterialNames(productsWithMaterialNames);
  }, [products, materials]);
  return (
    <>
      <div className=' flex justify-between mb-6'>
        <Toaster position='top-center' reverseOrder={false} />
        <h1> Products</h1>
        <Button onClick={() => setOpenModal(true)}>Create Product</Button>
      </div>
      <ProductForm
        open={openModal}
        onSubmit={handleSubmit}
        onClose={() => setOpenModal(false)}
      />

      <CustomTable
        data={productsWithMaterialNames}
        columns={['name', 'fillPercentage', 'scaleZ', 'type']}
      />
    </>
  );
};
