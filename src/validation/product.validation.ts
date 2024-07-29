import * as yup from 'yup';

export const productSchema = yup.object().shape({
  name: yup.string().required('Name is Required'),
});
