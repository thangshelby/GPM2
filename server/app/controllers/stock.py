import yfinance as yf
import pandas as pd
import pandas_ta as ta

from app.database.model import DbModel  
model = DbModel()
def get_stock_info(ticker='AAA'):
    # stock = yf.Ticker(ticker)
    ticker= ticker.upper()
    response = model.get_data_info(ticker)

    return response.to_dict(orient='records')
def get_stock_prices(ticker):
    model= DbModel()
    stock_prices= model.get_df(ticker)
    
    df= stock_prices.copy() 
    
    # df['date']= pd.to_datetime(df['Date'])
    # df.set_index('date', inplace=True)

    return stock_prices.to_dict(orient='records')

def get_all_stock_rics():
    model= DbModel()
    return model.get_all_stock_rics()