import { backendApi } from '../api/backend.api';
import { CreateProductDto, ProductI } from '../interfaces';

export class ProductService {
  static getAllProducts = async () => {
    try {
      const { data } = await backendApi.get<ProductI[]>('/product');

      console.log({ get: data });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  static createProduct = async (product: CreateProductDto) => {
    try {
      const { data } = await backendApi.post<ProductI>('/product', product);
      console.log({ create: data });

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  static updateProduct = async (product: Partial<ProductI>) => {
    const { id, ...data } = product;

    console.log({ id, data });

    try {
      const { data: updatedProduct } = await backendApi.patch<ProductI>(
        `/product/${id}`,
        data
      );

      return updatedProduct;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
