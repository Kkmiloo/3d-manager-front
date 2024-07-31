import { backendApi } from '../api/backend.api';
import { CreateQuoterDto, QuoterI } from '../interfaces';

export class QuoterService {
  static getAllQuotes = async () => {
    try {
      const { data } = await backendApi.get<QuoterI[]>('/quoter');

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  static getQuoteByProductId = async (productId: number) => {
    try {
      const { data } = await backendApi.get<QuoterI[]>(
        `/quoter/by-product/${productId}`
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  static createQuote = async (quoter: CreateQuoterDto) => {
    try {
      const { data } = await backendApi.post<QuoterI>('/quoter', quoter);
      console.log({ create: data });

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  static updateQuote = async (quoter: Partial<QuoterI>) => {
    const { id, ...data } = quoter;

    console.log({ id, data });

    try {
      const { data: updatedQuoter } = await backendApi.patch<QuoterI>(
        `/quoter/${id}`,
        data
      );

      return updatedQuoter;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
