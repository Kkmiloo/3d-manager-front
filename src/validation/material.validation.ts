import * as yup from 'yup';

export const materialSchema = yup.object().shape({
  name: yup.string().required('Name is Required'),
  type: yup.string().required('Type is Required'),
});
