export interface StockPriceType {
  Date: string;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume: number;
  // SMA: number | null;
}
export interface  StockInfomationType {
  Activity: string;
  Category: string;
  Currency: string;
  Exchange: string;
  "Full Name": string;
  "Hist .": number;
  Market: string;
  Name: string;
  RIC: string;
  Sector: string;
  "Start Date": string;
  Symbol: string;
}