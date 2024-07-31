import { Link } from 'react-router-dom';
import { useProductStore } from '../../store';
import { CustomTable, HeaderCard, QuoterFormModal } from '../../components';
import { useQuoter } from '../../store/quoter/quoter.store';
import { useEffect, useState } from 'react';
import { CreateQuoterDto, QuoterI } from '../../interfaces';
import { Button } from 'flowbite-react';
import toast, { Toaster } from 'react-hot-toast';

interface Columns {
  key: keyof QuoterI;
  label: string;
}

export const QuoterCalculator = () => {
  const productToEdit = useProductStore((state) => state.productToEdit);
  const getQuotesByProductId = useQuoter((state) => state.getQuotesByProductId);
  const createQuote = useQuoter((state) => state.createQuote);

  const productQuotes = useQuoter((state) => state.productQuotes);

  const [showModal, setShowModal] = useState(false);

  const columns: Columns[] = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'scaleZ',
      label: 'Escala Eje Z(mm)',
    },
    {
      key: 'fillPercentage',
      label: 'Porcentaje de relleno (%)',
    },
    {
      key: 'printConsume',
      label: 'Consumo de impresión (gr)',
    },
    {
      key: 'materialPrintCost',
      label: 'Costo de impresión ($)',
    },
    {
      key: 'energyCost',
      label: 'Costo de energía (KWh)',
    },
    {
      key: 'printTime',
      label: 'Tiempo de impresión (Min)',
    },
    {
      key: 'printEnergyCost',
      label: 'Costo de energía de impresión ($)',
    },
    {
      key: 'costPerMachine',
      label: 'Costo Energía impresión ($)',
    },
    {
      key: 'overCost',
      label: 'Sobre costo por fallo ($)',
    },
    { key: 'saleCost', label: 'Costo de venta ($)' },
    { key: 'valueWithK', label: 'Valor con K ($)' },
    { key: 'netCost', label: 'Costo neto ($)' },
  ];

  const handleCreateQuote = async (quote: CreateQuoterDto) => {
    console.log(quote);

    try {
      await createQuote(quote);
      setShowModal(false);
      toast.success('Cotización creada correctamente');
    } catch (error) {
      toast.error('Error al crear la cotización');
      console.log(error);
    }
  };

  useEffect(() => {
    if (productToEdit) {
      getQuotesByProductId(productToEdit.id);
    }
  }, [productToEdit, getQuotesByProductId]);

  return (
    <div>
      <Toaster />
      {!productToEdit ? (
        <div>
          <h1> Product Not Found</h1>
          <Link to='..' className='text-blue-700'>
            Go back
          </Link>
        </div>
      ) : (
        <div className='flex flex-col'>
          <div className='mb-6'>
            <HeaderCard title={productToEdit.name} />
          </div>
          <div className='mb-6 flex justify-end'>
            <Button size={'sm'} onClick={() => setShowModal(true)}>
              {' '}
              Create
            </Button>
            <QuoterFormModal
              formType='create'
              open={showModal}
              onClose={() => setShowModal(false)}
              onSubmit={handleCreateQuote}
            />
          </div>
          <CustomTable data={productQuotes} columns={columns} />
        </div>
      )}
    </div>
  );
};
