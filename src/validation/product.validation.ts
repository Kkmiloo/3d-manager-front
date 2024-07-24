import * as yup from 'yup';

export const productSchema = yup.object().shape({
  name: yup.string().required('Name is Required'),
  fillPercentage: yup
    .number()
    .required()
    .min(0)
    .max(100, 'Number should be between 0-100'),
  scaleZ: yup.number().required('Scale is required'),
  materialId: yup
    .string()
    .required('Material is required')
    .uuid('Should be a valid material'),
});
