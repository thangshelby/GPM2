export interface StockPriceType {
  Date: string;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume: number;
  // SMA: number | null;
}
export interface StockInfomationType {
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
export interface BusinessDataType {
  analyst_outlook: {
      buy: number;
      hold: number;
      sell: number;
      suggest:string
  };
  company_detail: {
    short_name: string;
    website: string;
  };
  date: string; // ISO Date format (YYYY-MM-DD)
  general_info: {
    exchange: string;
    industry: string;
    noe: number;
    stock_rate: number;
  };
  percentage_change: {
    "1_day": number;
    "5_day": number;
    month_to_date: number;
    "3_months": number;
    "6_months": number;
    year_to_date: number;
  };
  business_summary: string;
  financial_summary: string;
  ratio: {
    dividend_yield: number | null; // NaN in JSON is represented as null in TypeScript
    pe_ttm: number | null;
  };
  share_detail: {    
    "52_wk_high_high": number | 10;
    "52_wk_high_low": number;
    "5_day_avg_volume": number;
    "10_day_avg_volume": number;
    beta_value: number;
    Currency: "VND";
    shares_outstanding: number | null;
  };
  symbol: string;
}

export interface FinancialDataType {
  ai_analysis: AIAnalysis;
  balance_sheet: BalanceSheet;
  income_statement: IncomeStatement;
  profitability_analysis: ProfitabilityAnalysis;
}
interface AIAnalysis{
  'balance_sheet':string,
  'income_statement':string,
  'profitability_analysis':string
}
interface BalanceSheet {
  "Equity": number[];
  "Total Current Assets": number[];
  "Total liabilities and equity": number[];
  "Property/Plant/Equipment,Total - Net": number[];
  "Total Assets": number[];
  "Total Current Liabilities": number[];
  "Total Long-Term Debt": number[];
  "Total Liabilities": number[];
  [key: string]: number[];
}

interface IncomeStatement {
  "Net Income After Taxes": number[];
  "Net Income Before Extra.\nItems": number[];
  "Net Income Before Taxes": number[];
  "Operating Income": number[];
  "EPS": number[];
  "Minority Interest": number[];
  "Profit attributable to parent company shareholders": number[];
  Revenue: number[];
  "Total Operating Expense": number[];
  [key: string]: number[];
}

interface ProfitabilityAnalysis {
  ROE: number[];
  ROA: number[];
  "Income After Tax Margin (%)": number[];
  "Long Term Debt/Equity, %": number[];
  "Revenue/Tot Assets": number[];
  "Total Debt/Equity, %": number[];
  "Total Debt/Equity": number[];
 
  [key: string]: number[];
}
