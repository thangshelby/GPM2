import yfinance as yf
import pandas as pd
import pandas_ta as ta

from app.database.model import DbModel  

def get_stock_data(ticker='AAA'):
    stock = yf.Ticker(ticker)
    return stock.history(period='1d', interval='1m').to_json()
def get_stock_prices(ticker):
    model= DbModel()
    stock_prices= model.get_df(ticker)
    
    df= stock_prices.copy() 
    
    df['date']= pd.to_datetime(df['Date'])
    df.set_index('date', inplace=True)

    return stock_prices.to_dict(orient='records')

def get_indicator():
    ticker= 'AAPL'
    model= DbModel()
    
    stock_prices= model.get_df(ticker)
    
    df= stock_prices.copy() 
    
    df['date']= pd.to_datetime(df['Date'])
    df.set_index('date', inplace=True)
    
    df['SMA'] = ta.sma(df['Close'], length=3)
    df.drop(columns=['Open', 'High', 'Low', 'Close', 'Volume'], inplace=True)

    df= df.dropna()
    return df.to_dict(orient='records')
    