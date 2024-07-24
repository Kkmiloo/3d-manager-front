import { backendApi } from '../api/backend.api';
import { CreateProductDto, ProductI } from '../interfaces';

export class ProductService {
  static getAllProducts = async () => {
    try {
      const { data } = await backendApi.get<ProductI[]>('/product');

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  static createProduct = async (product: CreateProductDto) => {
    try {
      const { data } = await backendApi.post<ProductI>('/product', product);

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
