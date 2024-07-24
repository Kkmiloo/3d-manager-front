import { create, StateCreator } from 'zustand';
import { CreateProductDto, ProductI } from '../../interfaces';
import { ProductService } from '../../services/product.service';
import { persist, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface ProductState {
  products: ProductI[];
  productsLoaded: boolean;
  getAllProducts: () => Promise<void>;
  createProduct: (product: CreateProductDto) => Promise<void>;
}

const storeApi: StateCreator<ProductState, [['zustand/immer', never]]> = (
  set
) => ({
  products: [],
  productsLoaded: false,
  getAllProducts: async () => {
    try {
      const products = await ProductService.getAllProducts();
      set({ products, productsLoaded: true });
    } catch (error) {
      console.log(error);
    }
  },

  createProduct: async (product: CreateProductDto) => {
    try {
      const newProduct = await ProductService.createProduct(product);

      set((state) => {
        state.products.push(newProduct);
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
});

export const useProductStore = create<ProductState>()(
  devtools(persist(immer(storeApi), { name: 'product-storage' }))
);
