import pandas as pd
import os
import yfinance as yf
class DbModel():
    def get_df(self, RIC='AAA'):
        df= pd.read_csv(f'./app/data/Vietnam/{RIC}.txt',sep='\t')
        df.dropna(inplace=True)
        
        df.columns =['Date', 'Open', 'Low', 'High', 'Close', 'Volume']
        df.loc[1:, "Open"] = df["Close"].shift(1)[1:]
        
        columns_to_check = [ 'Date', 'Open', 'Low', 'High', 'Close', 'Volume']
        # Ensure Date column is a datetime object
        
        df['Date'] = pd.to_datetime(df['Date'])
        df.index = df['Date']

        # # Set Date as the index
        df['Date'] = df.index
        df['Date']=  df['Date'].astype(str)
        df['Date']=  df['Date'].str.replace(' 00:00:00','')  
        
        
        
        # df_check = df.iloc[:,0:df.shape[1]-1]
        # df['Open_Less_Than_Low'] = df['Open'] < df['Low']
        # if df['Open_Less_Than_Low'].sum() > 0:
        #        # DF WITH YFINANCE
        #     df= yf.download(RIC+ '.VN', start="2010-01-01", end='2013-01-01')
        #     # print(df.head(10))
        #     df.columns= [ 'Close', 'High', 'Low','Open' ,'Volume']
        #     col=['Close', 'High', 'Low','Open' ,'Volume']
        #     # exchange_rate = 23000
        #     # df[col] = df[col].apply(lambda x: x * exchange_rate)
        #     df['Date']= df.index
        #     df['Date']=  df['Date'].astype(str)
        #     df['Date']=  df['Date'].str.replace(' 00:00:00','')  
            
        
        
     


        # null_values =df[columns_to_check].isnull().sum()
        df= df.dropna()
        return df
    def get_data_info(self, RIC):
        data_info_list= pd.read_excel('./app/data/Vietnam/Vietnam.xlsx')
        data_info = data_info_list[data_info_list['RIC']==RIC+'.HM'] 
        if data_info.empty:
            data_info = data_info_list[data_info_list['Symbol']=='VT:'+ RIC.split('.')[0]]
        return data_info
    def get_all_stock_rics(self):
        df= pd.read_excel('./app/data/Vietnam/Vietnam.xlsx')    
        
        # print(df.columns)
        response = df[['RIC','Name','Market','Exchange',"Sector"]]
        response = response.reset_index(drop=True)
        response.index += 1  # Tăng từ 1 thay vì 0

        return response.to_dict(orient='records')
        
         