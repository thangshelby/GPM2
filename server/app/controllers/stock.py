import yfinance as yf
import pandas as pd
import pandas_ta as ta

from app.database.model import DbModel  
model = DbModel()
def get_stock_info(ticker='aaa'):
    ticker= ticker.upper()
    response = model.get_data_info(ticker)

    return response.to_dict(orient='records')
def get_stock_prices(ticker='aaa',start_date='2020-01-01',end_date='2025-01-01'):
    model= DbModel()
    stock_prices= model.get_df(ticker,start_date,end_date)
    
    return stock_prices.to_dict(orient='records')

def get_all_stock_rics():
    model= DbModel()
    return model.get_all_stock_rics()