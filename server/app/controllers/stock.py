import yfinance as yf
import pandas as pd

from app.database.model import DbModel  

def get_stock_data(ticker):
    stock = yf.Ticker(ticker)
    return stock.history(period='1d', interval='1m').to_json()
def get_stock_prices(ticker):
    
    # stock_prices= yf.download(ticker,start='2020-01-01',end='2021-01-01')[['Close','Open','High','Low','Volume']]
    # stock_prices.reset_index(inplace=True)
    # stock_prices= stock_prices.dropna()
    print('ticker:',ticker)
    model= DbModel()
    stock_prices= model.get_df(ticker)
    
    

    # stock_prices_index= stock_prices.index.strftime('%Y-%m-%d')
    # stock_prices.index= stock_prices_index
    # stock_prices.columns= ['Date','Close','Open','High','Low','Volume']
    
    # stock_prices['Date']= stock_prices['Date'].astype(str)
    # stock_prices['Date']= stock_prices['Date'].str.replace(' 00:00:00','')  
    
    # stock_prices.to_excel('stock_prices.xlsx',index=False)  
    return stock_prices.to_dict(orient='records')

    pass