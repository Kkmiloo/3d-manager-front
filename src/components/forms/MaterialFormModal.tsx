import { ErrorMessage, Form, Formik } from 'formik';
import { CreateMaterialDto } from '../../interfaces';
import { Button, Label, Modal, TextInput } from 'flowbite-react';

import { materialSchema } from '../../validation';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateMaterialDto) => void;
  initialValues?: CreateMaterialDto;
  formType?: 'create' | 'edit';
}
export const MaterialFormModal = ({
  onClose,
  onSubmit,
  open,
  formType = 'create',
  initialValues = {
    name: '',
    type: '',
  },
}: Props) => {
  const title = formType == 'create' ? 'Create Material' : 'Edit Material';

  return (
    <Modal show={open} size='md' popup onClose={onClose}>
      <Modal.Header className='px-6 items-center'>{title}</Modal.Header>
      <Modal.Body className='pt-2'>
        <Formik
          initialValues={initialValues}
          validationSchema={materialSchema}
          onSubmit={onSubmit}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form>
              <div className='space-y-2'>
                <>
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
                </>
                <div>
                  <div className='mb-2 block'>
                    <Label htmlFor='type' value='Type' />
                  </div>
                  <TextInput
                    id='type'
                    name='type'
                    onChange={handleChange}
                    value={values.type}
                    placeholder=''
                    color={errors.type && touched.type ? 'failure' : ''}
                    helperText={
                      <ErrorMessage
                        name='name'
                        className='text-red-500 pl-1'
                        component='span'
                      />
                    }
                  />
                </div>
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
