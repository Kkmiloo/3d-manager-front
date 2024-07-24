import { backendApi } from '../api/backend.api';
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
}
