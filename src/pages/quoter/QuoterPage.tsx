import { Button, TextInput } from 'flowbite-react';
import { CustomGrid, CustomTable } from '../../components';
import { useProductStore } from '../../store';
import { IoGridOutline, IoList, IoSearch } from 'react-icons/io5';
import { useState } from 'react';
import { ProductI } from '../../interfaces';

export const QuoterPage = () => {
  const products = useProductStore((store) => store.products);
  const [showGrid, setShowGrid] = useState(false);
  const [productToSearch, setProductsToSearch] = useState<ProductI[]>(products);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const product = products.filter((product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setProductsToSearch(product);
  };

  return (
    <>
      <div
        className='
      flex  justify-between gap-3 mb-6 md:flex-row flex-col'
      >
        <h1>Calculator</h1>
        <div className='flex justify-between'>
          <TextInput
            icon={IoSearch}
            className='mr-6'
            onChange={handleSearch}
            placeholder='Search'
          />
          <Button.Group>
            <Button
              color={'gray'}
              className={`${
                !showGrid ? 'bg-cyan-100 text-cyan-900 focus:ring-0' : ''
              } focus:ring-0`}
              onClick={() => setShowGrid(false)}
            >
              <IoList />
            </Button>
            <Button
              color={'gray'}
              className={`${
                showGrid ? 'bg-cyan-100 text-cyan-900 focus:ring-0' : ''
              } focus:ring-0 `}
              onClick={() => setShowGrid(true)}
            >
              <IoGridOutline />
            </Button>
          </Button.Group>
        </div>
      </div>

      {showGrid ? (
        <CustomGrid data={productToSearch} columns={['name']} />
      ) : (
        <CustomTable
          data={productToSearch}
          columns={[
            {
              key: 'id',
              label: 'ID',
            },
            {
              key: 'name',
              label: 'Name',
            },
          ]}
          redirectTo
        />
      )}
    </>
  );
};
