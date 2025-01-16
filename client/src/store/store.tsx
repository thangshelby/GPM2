import { create } from 'zustand'
import { StockPriceType } from '../type'

interface StockPriceStore {
  stockPrice: StockPriceType | null
  setStockPrice: (newVal: StockPriceType) => void
}

export const useStockPriceStore = create<StockPriceStore>((set) => ({
  stockPrice: null,
  setStockPrice: (newVal: StockPriceType) => set({ stockPrice: newVal }),
}))



