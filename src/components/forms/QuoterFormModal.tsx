import { ErrorMessage, Form, Formik } from 'formik';
import { CreateQuoterDto } from '../../interfaces';
import { Button, Label, Modal, TextInput } from 'flowbite-react';

import { quoterSchema } from '../../validation';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateQuoterDto) => void;
  initialValues?: CreateQuoterDto;
  formType?: 'create' | 'edit';
}
export const QuoterFormModal = ({
  onClose,
  onSubmit,
  open,
  formType = 'create',
  initialValues = {
    scaleZ: 0,
    fillPercentage: 0,
    printConsume: 0,
    materialPrintCost: 0,
    energyCost: 0,
    printTime: 0,
    printEnergyCost: 0,
    costPerMachine: 0,
    overCost: 0,
    percentageOfProfit: 0,
    saleCost: 0,
    valueWithK: 0,
    netCost: 0,
    productId: 0,
    materialId: 0,
  },
}: Props) => {
  const title = formType == 'create' ? 'Create Material' : 'Edit Material';

  return (
    <Modal show={open} size='xl' popup onClose={onClose}>
      <Modal.Header className='px-6 items-center'>{title}</Modal.Header>
      <Modal.Body className='pt-2'>
        <Formik
          initialValues={initialValues}
          validationSchema={quoterSchema}
          onSubmit={onSubmit}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form>
              <div className='grid grid-cols-3'>
                {Object.entries(values).map(([key, value]) => (
                  <div key={key} className='mb-2 block'>
                    <Label htmlFor={key} value={key} />
                    <TextInput
                      id={key}
                      name={key}
                      onChange={handleChange}
                      value={value}
                      type='number'
                      placeholder=''
                      color={
                        errors[key as keyof typeof initialValues] &&
                        touched[key as keyof typeof initialValues]
                          ? 'failure'
                          : ''
                      }
                      helperText={
                        <ErrorMessage
                          name={key}
                          className='text-red-500 pl-1'
                          component='span'
                        />
                      }
                    />
                  </div>
                ))}
              </div>
              <div className='w-full mt-5 flex justify-end'>
                <Button type='submit' className='uppercase'>
                  {formType}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
