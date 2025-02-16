import pandas as pd

df= pd.read_csv(f'./data/Vietnam/AAA.txt',sep='\t')
df.dropna(inplace=True)
df.columns =['Date', 'Open', 'Low', 'High', 'Close', 'Volume']

df.loc[1:, "Open"] = df["Close"].shift(1)[1:]



print(df.tail(10))