import { create, StateCreator } from 'zustand';
import { CreateQuoterDto, QuoterI } from '../../interfaces';
import { QuoterService } from '../../services/quoter.service';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface QuoterState {
  quotes: QuoterI[];
  productQuotes: QuoterI[];
  getQuotes: () => Promise<void>;
  getQuotesByProductId: (productId: number) => Promise<void>;
  createQuote: (quote: CreateQuoterDto) => Promise<void>;
}

const storeApi: StateCreator<QuoterState, [['zustand/immer', never]]> = (
  set,
  get
) => ({
  quotes: [],
  productQuotes: [],
  // Actions
  // Methods
  getQuotes: async () => {
    const data = await QuoterService.getAllQuotes();
    set({ quotes: data });
  },

  getQuotesByProductId: async (productId: number) => {
    const data = await QuoterService.getQuoteByProductId(productId);
    set({ productQuotes: data });
  },
  createQuote: async (quote: CreateQuoterDto) => {
    const data = await QuoterService.createQuote(quote);
    get().getQuotesByProductId(quote.productId);
    set((state) => {
      [...state.quotes, data];
    });
  },
});

export const useQuoter = create(
  persist(immer(storeApi), { name: 'quotes-store' })
);
