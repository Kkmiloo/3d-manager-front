import { create, StateCreator } from 'zustand';
import { MaterialI } from '../../interfaces';
import { MaterialService } from '../../services/material.service';
import { devtools, persist } from 'zustand/middleware';

export interface MaterialState {
  materials: MaterialI[];

  materialsLoaded: boolean;
  getMaterials: () => void;

  addMaterial: (material: MaterialI) => void;
}

const storeApi: StateCreator<MaterialState> = (set) => ({
  materials: [],
  materialsLoaded: false,
  addMaterial: (material: MaterialI) => {
    set((state) => ({
      materials: [...state.materials, material],
    }));
  },

  getMaterials: async () => {
    try {
      const data = await MaterialService.getAllMaterial();

      set({ materials: data, materialsLoaded: true });
    } catch (error) {
      console.log(error);
      throw new Error('Error al conseguir los materiales');
    }
  },
});

export const useMaterialStore = create<MaterialState>()(
  devtools(persist(storeApi, { name: 'material-storage' }))
);
