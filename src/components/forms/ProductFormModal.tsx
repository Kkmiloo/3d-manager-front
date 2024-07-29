import { ErrorMessage, Form, Formik } from 'formik';
import { CreateProductDto } from '../../interfaces';
import { Button, Label, Modal, TextInput } from 'flowbite-react';

import { productSchema } from '../../validation';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateProductDto) => void;
  initialValues?: CreateProductDto;
  type?: 'create' | 'edit';
}
export const ProductFormModal = ({
  onClose,
  onSubmit,
  open,
  type = 'create',
  initialValues = {
    name: '',
  },
}: Props) => {
  const title = type == 'create' ? 'Create Product' : 'Edit Product';

  return (
    <Modal show={open} size='md' popup onClose={onClose}>
      <Modal.Header className='px-6 items-center'>{title}</Modal.Header>
      <Modal.Body className='pt-2'>
        <Formik
          initialValues={initialValues}
          validationSchema={productSchema}
          onSubmit={onSubmit}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form>
              <div className='space-y-2'>
                <div>
                  <div className='mb-2 block'>
                    <Label htmlFor='name' value='Name' />
                  </div>
                  <TextInput
                    id='name'
                    name='name'
                    onChange={handleChange}
                    value={values.name}
                    placeholder=''
                    color={errors.name && touched.name ? 'failure' : ''}
                    helperText={
                      <ErrorMessage
                        name='name'
                        className='text-red-500 pl-1'
                        component='span'
                      />
                    }
                  />
                </div>
                {/* <div className='grid gap-4 sm:grid-cols-2'>
                  <div>
                    <div className='mb-2 block'>
                      <Label htmlFor='scaleZ' value='Scale Z' />
                    </div>
                    <TextInput
                      id='scaleZ'
                      name='scaleZ'
                      type='number'
                      onChange={handleChange}
                      value={values.scaleZ}
                      color={errors.scaleZ && touched.scaleZ ? 'failure' : ''}
                      helperText={
                        <ErrorMessage
                          name='scaleZ'
                          className='text-red-500 pl-1'
                          component='span'
                        />
                      }
                    />
                  </div>
                  <div>
                    <div className='mb-2 block'>
                      <Label htmlFor='fillPercentage' value='Fill Percentage' />
                    </div>
                    <TextInput
                      id='fillPercentage'
                      name='fillPercentage'
                      type='number'
                      onChange={handleChange}
                      value={values.fillPercentage}
                      color={
                        errors.fillPercentage && touched.fillPercentage
                          ? 'failure'
                          : ''
                      }
                      helperText={
                        <ErrorMessage
                          name='fillPercentage'
                          className='text-red-500 pl-1'
                          component='span'
                        />
                      }
                    />
                  </div>
                </div>
                <div>
                  <div className='mb-2 block'>
                    <Label htmlFor='materialId' value='Material' />
                  </div>
                  <Select
                    id='materialId'
                    name='materialId'
                    onChange={handleChange}
                    value={values.materialId}
                    color={
                      errors.materialId && touched.materialId ? 'failure' : ''
                    }
                    helperText={
                      <ErrorMessage
                        name='materialId'
                        className='text-red-500 pl-1'
                        component='span'
                      />
                    }
                  >
                    <option value=''>Select Material</option>
                    {materials.map((material) => (
                      <option key={material.id} value={material.id}>
                        {material.type} - {material.name}
                      </option>
                    ))}
                  </Select>
                </div> */}
              </div>
              <div className='w-full mt-5 flex justify-end'>
                <Button type='submit' className='uppercase'>
                  {type}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
