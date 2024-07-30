import { create, StateCreator } from 'zustand';
import { CreateProductDto, ProductI } from '../../interfaces';
import { ProductService } from '../../services/product.service';
import {
  persist,
  devtools,
  createJSONStorage,
  StateStorage,
} from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface ProductState {
  products: ProductI[];
  productsLoaded: boolean;
  productToEdit: ProductI | undefined;

  getAllProducts: () => Promise<void>;
  createProduct: (product: CreateProductDto) => Promise<void>;
  updateProduct: (product: Partial<ProductI>) => void;
  getProductById: (id: number) => ProductI | undefined;
  setProductToEdit: (product: ProductI | undefined) => void;
}

const storeApi: StateCreator<ProductState, [['zustand/immer', never]]> = (
  set,
  get
) => ({
  products: [],
  productsLoaded: false,
  productToEdit: undefined,

  getProductById: (id: number) => {
    const { products } = get();
    return products.find((product) => product.id === id);
  },
  getAllProducts: async () => {
    try {
      const products = await ProductService.getAllProducts();
      console.log(products);

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

  updateProduct: async (product: Partial<ProductI>) => {
    const updatedProduct = await ProductService.updateProduct(product);

    set((state) => {
      const index = state.products.findIndex((p) => p.id === updatedProduct.id);
      state.products[index] = updatedProduct;
    });
  },
  setProductToEdit: (product: ProductI | undefined) => {
    set({ productToEdit: product });
  },
});

const sessionStorage: StateStorage = {
  getItem: (name) => {
    const item = localStorage.getItem(name);
    return item;
  },
  setItem: (name, value) => {
    localStorage.setItem(name, value);
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

export const useProductStore = create<ProductState>()(
  devtools(
    persist(immer(storeApi), {
      name: 'product-storage',
      storage: createJSONStorage(() => sessionStorage),
    })
  )
);
