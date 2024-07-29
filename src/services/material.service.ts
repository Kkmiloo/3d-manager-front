import { backendApi } from '../api/backend.api';
import { CreateMaterialDto } from '../interfaces';
import { MaterialI as MaterialResponse } from '../interfaces/material.interface';

export class MaterialService {
  static getAllMaterial = async (): Promise<MaterialResponse[]> => {
    try {
      const { data } = await backendApi.get<MaterialResponse[]>('/material');

      return data;
    } catch (error) {
      console.log(error);
      throw new Error('Error al obtener los materiales');
    }
  };

  static createMaterial = async (
    material: CreateMaterialDto
  ): Promise<MaterialResponse> => {
    try {
      const { data } = await backendApi.post<MaterialResponse>(
        '/material',
        material
      );

      return data;
    } catch (error) {
      console.log(error);
      throw new Error('Error al crear el material');
    }
  };

  static updateMaterial = async (
    material: Partial<MaterialResponse>
  ): Promise<MaterialResponse> => {
    const { id, ...data } = material;

    try {
      const { data: updatedMaterial } =
        await backendApi.patch<MaterialResponse>(`/material/${id}`, data);

      return updatedMaterial;
    } catch (error) {
      console.log(error);
      throw new Error('Error al actualizar el material');
    }
  };
}
