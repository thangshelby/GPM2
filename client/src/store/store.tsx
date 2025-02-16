import { create } from "zustand";
import { StockPriceType } from "../type";


interface useCompanyStore{
  company:string;
  setCompany:(newVal:string)=>void;
}
export const useCompanyStore = create<useCompanyStore>((set) => ({
  company: "",
  setCompany: (newVal: string) => set({ company: newVal }),
}));

interface StockPriceStore {
  stockPrice: StockPriceType | null;
  setStockPrice: (newVal: StockPriceType) => void;
}

export const useStockPriceStore = create<StockPriceStore>((set) => ({
  stockPrice: null,
  setStockPrice: (newVal: StockPriceType) => set({ stockPrice: newVal }),
}));

interface VisibleIndicatorsStore {
  visibleIndicators: string[];
  setVisibleIndicators: (newVal: string[]) => void;
}
export const useVisibleIndicatorsStore = create<VisibleIndicatorsStore>(
  (set) => ({
    visibleIndicators: [],
    setVisibleIndicators: (newVal: string[]) =>
      set({ visibleIndicators: newVal }),
  }),
);

interface HeightChartStore {
  height: number;
  setHeight: (newVal: number) => void;
}
export const useHeightChartStore = create<HeightChartStore>((set) => ({
  height: 500,
  setHeight: (newVal: number) => set({ height: newVal }),
}));


interface xOriginStore {
  xOrigin: number;
  setXOrigin: (newVal: number) => void;
}
export const usexOriginStore = create<xOriginStore>((set) => ({
  xOrigin: 0,
  setXOrigin: (newVal: number) => set({ xOrigin: newVal }),
}));

interface usedRicStore{
  ric:string;
  setRic:(newVal:string)=>void;
}
export const useRicStore = create<usedRicStore>((set) => ({
  ric: "",
  setRic: (newVal: string) => set({ ric: newVal }),
}));


interface dataUsedStore {
  dataUsed: number;
  setDataUsed: (newVal:number) => void;
}
export const usedDataStore = create<dataUsedStore>((set) => ({
  dataUsed: 0,
  setDataUsed: (newVal:number) => set({ dataUsed: newVal }),
}));
