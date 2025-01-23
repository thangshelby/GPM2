import pandas as pd
import os

class DbModel():
    def get_df(self, RIC='AAA'):
        df= pd.read_csv(f'./app/data/Vietnam/{RIC}.txt',sep='\t')

        df.columns= ['Date', 'Open', 'Low', 'High', 'Close','Volume']
        columns_to_check = [ 'Date', 'Open', 'Low', 'High', 'Close', 'Volume']
        # Ensure Date column is a datetime object
        
        df['Date'] = pd.to_datetime(df['Date'])

        # Set Date as the index
        df.index = df['Date']
        df['Date']=  df['Date'].astype(str)
        df['Date']=  df['Date'].str.replace(' 00:00:00','')  

        null_values =df[columns_to_check].isnull().sum()
        df= df.dropna()
        return df
    def get_data_info(self, RIC):
        data_info_list= pd.read_excel('./app/data/Vietnam/Vietnam.xlsx')
        data_info = data_info_list[data_info_list['RIC']==RIC+'.HM'] 
        if data_info.empty:
            data_info = data_info_list[data_info_list['Symbol']=='VT:'+ RIC.split('.')[0]]
        return data_info
        
         