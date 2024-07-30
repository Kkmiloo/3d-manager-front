import { Link } from 'react-router-dom';
import { useProductStore } from '../../store';
import { HeaderCard } from '../../components';

export const QuoterCalculator = () => {
  const productToEdit = useProductStore((state) => state.productToEdit);

  return (
    <div>
      {!productToEdit ? (
        <div>
          <h1> Product Not Found</h1>
          <Link to='..' className='text-blue-700'>
            {' '}
            Go back
          </Link>
        </div>
      ) : (
        <div>
          <HeaderCard title={productToEdit.name} />
        </div>
      )}
    </div>
  );
};
