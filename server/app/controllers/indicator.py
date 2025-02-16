import yfinance as yf
import pandas as pd
import pandas_ta as ta
from app.database.model import DbModel  

model = DbModel()
def get_SMA(ticker='AAA',window=9):
    
    stock_prices= model.get_df(ticker)
    
    df= stock_prices.copy() 
    
 
    df['date']= pd.to_datetime(df['Date'])
    df.set_index('date', inplace=True)
    
    df['SMA'] = ta.sma(df['Close'], length=window)
    # df.drop(columns=['Open', 'High', 'Low', 'Close', 'Volume'], inplace=True)

    df= df.dropna()
    return df.to_dict(orient='records')
def get_EMA():
    ticker= 'AAPL'
    
    
    stock_prices= model.get_df(ticker)
    
    df= stock_prices.copy() 
    
    df['date']= pd.to_datetime(df['Date'])
    df.set_index('date', inplace=True)
    
    df['EMA'] = ta.ema(df['Close'], length=3)
    df.drop(columns=['Open', 'High', 'Low', 'Close', 'Volume'], inplace=True)

    df= df.dropna()
    return df.to_dict(orient='records')

def get_RSI(ticker='AAA',window=14):
    
    
    stock_prices= model.get_df(ticker)
    
    df= stock_prices.copy() 
    
    df['date']= pd.to_datetime(df['Date'])
    df.set_index('date', inplace=True)
    
    df['RSI'] = ta.rsi(df['Close'], length=window)
    # df.drop(columns=['Open', 'High', 'Low', 'Close', 'Volume'], inplace=True)

    df= df.dropna()
    return df.to_dict(orient='records')

def get_MACD(ticker='AAA',window=9,fast= 12, slow=26):
    
  
    stock_prices= model.get_df(ticker)
    
    df= stock_prices.copy() 
    
   
    df['date']= pd.to_datetime(df['Date'])
    df.set_index('date', inplace=True)
    
    
    macd = ta.macd(df["Close"],fast=fast, slow=slow, signal_length=window, offset=0)
    macd.columns = ['MACD', 'MACD_hist', 'MACD_signal']  # Đổi tên cột
    
    df['MACD'] = macd['MACD']  # Đường MACD
    df['MACD_signal'] = macd['MACD_signal']  # Đường MACD Signal
    df['MACD_hist'] = macd['MACD_hist']  # Đường MACD Histogram
    
    df.drop(columns=['Open', 'High', 'Low', 'Close', 'Volume'], inplace=True)

    df= df.dropna()
    return df.to_dict(orient='records')

def get_BB(ticker='AAA',window=20):
    
    
    stock_prices= model.get_df(ticker)
    
    df= stock_prices.copy() 
    
    df['date']= pd.to_datetime(df['Date'])
    df.set_index('date', inplace=True)

    bbands = ta.bbands(df['Close'], length=window)
    bbands.columns = ['BBL_3', 'BBM_3', 'BBU_3','BBB','BBP']  # Đổi tên cột

    df['BB_lower'] = bbands['BBL_3']  # Đường Bollinger Bands dưới
    df['BB_middle'] = bbands['BBM_3']  # Đường giữa
    df['BB_upper'] = bbands['BBU_3']  # Đường Bollinger Bands trên
    
    df.drop(columns=['Open', 'High', 'Low', 'Close', 'Volume'], inplace=True)

    
    df= df.dropna()
    return df.to_dict(orient='records')

def get_MFI(ticker='AAA',window=14):
    
    
    stock_prices= model.get_df(ticker)
    
    df= stock_prices.copy() 
    
    df['date']= pd.to_datetime(df['Date'])
    df.set_index('date', inplace=True)
    
    df['MFI'] = ta.mfi(df['High'], df['Low'], df['Close'], df['Volume'], length=window)
    df.drop(columns=['Open', 'High', 'Low', 'Close', 'Volume'], inplace=True)

    df= df.dropna()
    return df.to_dict(orient='records')