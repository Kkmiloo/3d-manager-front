import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useProductStore } from '../store';
import { useEffect } from 'react';
import { Breadcrumb } from 'flowbite-react';

export const QuoterLayout = () => {
  const { id } = useParams();

  const getProductById = useProductStore((store) => store.getProductById);
  const productToEdit = useProductStore((store) => store.productToEdit);
  const setProductToEdit = useProductStore((store) => store.setProductToEdit);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const product = getProductById(+id);
      setProductToEdit(product);
    } else {
      setProductToEdit(undefined);
    }
  }, [id, getProductById, setProductToEdit]);

  return (
    <div>
      {
        <Breadcrumb className='pr-5 py-3 '>
          <Breadcrumb.Item
            href='#'
            onClick={(e) => {
              e.preventDefault();
              setProductToEdit(undefined);
              navigate('../quoter');
            }}
          >
            Products
          </Breadcrumb.Item>
          {productToEdit && (
            <Breadcrumb.Item>{productToEdit.name}</Breadcrumb.Item>
          )}
        </Breadcrumb>
      }

      <Outlet />
    </div>
  );
};
