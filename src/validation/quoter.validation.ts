import * as Yup from 'yup';

export const quoterSchema = Yup.object().shape({
  scaleZ: Yup.number().required('Algo'),
  fillPercentage: Yup.number().required('Requerido'),
  printConsume: Yup.number().required('Requerido'),
  materialPrintCost: Yup.number().required('Requerido'),
  energyCost: Yup.number().required('Requerido'),
  printTime: Yup.number().required('Requerido'),
  printEnergyCost: Yup.number().required('Requerido'),
  costPerMachine: Yup.number().required('Requerido'),
  overCost: Yup.number().required('Requerido'),
  percentageOfProfit: Yup.number().required('Requerido'),
  saleCost: Yup.number().required('Requerido'),
  valueWithK: Yup.number().required('Requerido'),
  netCost: Yup.number().required('Requerido'),
  productId: Yup.number().required('Requerido'),
  materialId: Yup.number().required('Requerido'),
});
