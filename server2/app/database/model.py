import pandas as pd
import os

class DbModel():
    def get_df(self, RIC):
        # folder_path = '../data2/Vietnam'
        # path= f'../data2/Vietnam/AAA.txt'
        # print(path)
        # df= pd.read_csv(path, sep='\t')
        
        
        df= pd.read_csv('./app/data2/Vietnam/AAA.txt',sep='\t')

        df.columns= ['Date', 'Open', 'Low', 'High', 'Close','Volume']
        columns_to_check = [ 'Date', 'Open', 'Low', 'High', 'Close', 'Volume']
        # Ensure Date column is a datetime object
        
        df['Date'] = pd.to_datetime(df['Date'])

        # Set Date as the index
        df.index = df['Date']
        # df.set_index('Date', inplace=True)

        # Create a complete date range from min to max date 
        date_range = pd.date_range(start=df.index.min(), end=df.index.max(), freq='D')

        df = df.reindex(date_range)

        # Fill missing values using interpolation or other methods
        df.interpolate(method='linear', inplace=True)
        df['Date']=  df['Date'].astype(str)
        df['Date']=  df['Date'].str.replace(' 00:00:00','')  

        
        null_values =df[columns_to_check].isnull().sum()
        df= df.dropna()
        return df
    def get_data_info(self, RIC):
        data_info_list= pd.read_excel('../../data2/Vietnam/Vietnam.xlsx')
        data_info = data_info_list[data_info_list['RIC']==RIC+'.HM'] 
        if data_info.empty:
            data_info = data_info_list[data_info_list['Symbol']=='VT:'+ RIC.split('.')[0]]
        return data_info
        
         