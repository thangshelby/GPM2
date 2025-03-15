import { create } from "zustand";
import { StockPriceType } from "../type";
import { FinancialDataType, BusinessDataType } from "../type";

interface useCompanyStore {
  company: string;
  setCompany: (newVal: string) => void;
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

interface usedRicStore {
  ric: string;
  setRic: (newVal: string) => void;
}
export const useRicStore = create<usedRicStore>((set) => ({
  ric: "",
  setRic: (newVal: string) => set({ ric: newVal }),
}));

interface dataUsedStore {
  dataUsed: number;
  setDataUsed: (newVal: number) => void;
}
export const usedDataStore = create<dataUsedStore>((set) => ({
  dataUsed: 0,
  setDataUsed: (newVal: number) => set({ dataUsed: newVal }),
}));

interface ClosePriceStore {
  closePrice: number;
  setClosePrice: (newVal: number) => void;
}

export const useClosePriceStore = create<ClosePriceStore>((set) => ({
  closePrice: 0,
  setClosePrice: (newVal: number) => set({ closePrice: newVal }),
}));

interface FinancialDataStore {
  financialData: FinancialDataType | null;
  setFinancialData: (newVal: FinancialDataType) => void;
}

export const useFinancialDataStore = create<FinancialDataStore>((set) => ({
  financialData: null,
  setFinancialData: (newVal: FinancialDataType) =>
    set({ financialData: newVal }),
}));

interface BusinessDataStore {
  businessData: BusinessDataType | null;
  setBusinessData: (newVal: BusinessDataType) => void;
}

export const useBusinessDataStore = create<BusinessDataStore>((set) => ({
  businessData: null,
  setBusinessData: (newVal: BusinessDataType) => set({ businessData: newVal }),
}));

interface CanCreatePdfStore {
  canCreatePdf: boolean;
  setCanCreatePdf: (newVal: boolean) => void;
}

export const useCanCreatePdfStore = create<CanCreatePdfStore>((set) => ({
  canCreatePdf: false,
  setCanCreatePdf: (newVal: boolean) => set({ canCreatePdf: newVal }),
}));
