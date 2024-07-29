import { create, StateCreator } from 'zustand';
import { CreateMaterialDto, MaterialI } from '../../interfaces';
import { MaterialService } from '../../services/material.service';
import { devtools, persist } from 'zustand/middleware';

export interface MaterialState {
  materials: MaterialI[];
  materialsLoaded: boolean;
  materialToEdit: MaterialI | undefined;

  getMaterials: () => void;

  addMaterial: (material: MaterialI) => void;

  createMaterial: (material: CreateMaterialDto) => void;

  setMaterialToEdit: (material: MaterialI | undefined) => void;

  updateMaterial: (material: Partial<MaterialI>) => void;
}

const storeApi: StateCreator<MaterialState> = (set) => ({
  materials: [],
  materialsLoaded: false,
  materialToEdit: {} as MaterialI,

  // Actions

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

  createMaterial: async (material: CreateMaterialDto) => {
    try {
      const data = await MaterialService.createMaterial(material);
      set((state) => ({ materials: [...state.materials, data] }));
    } catch (error) {
      console.log(error);
      throw new Error('Error al crear el material');
    }
  },

  setMaterialToEdit: (material: MaterialI | undefined) => {
    set({ materialToEdit: material });
  },
  updateMaterial: async (material: Partial<MaterialI>) => {
    try {
      const updatedMaterial = await MaterialService.updateMaterial(material);

      set((state) => ({
        materials: state.materials.map((m) =>
          m.id === updatedMaterial.id ? updatedMaterial : m
        ),
      }));
    } catch (error) {
      console.log(error);
      throw new Error('Error al editar el material');
    }
  },
});

export const useMaterialStore = create<MaterialState>()(
  devtools(persist(storeApi, { name: 'material-storage' }))
);
