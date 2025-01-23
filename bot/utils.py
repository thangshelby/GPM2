from telegram import Update
import requests
from bs4 import BeautifulSoup
import os
import pandas as pd
import pandas_ta as ta
from datetime import datetime, timedelta, time
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes, MessageHandler, filters
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
import asyncio
import pytz
from config import folder_path, list_path

async def get_stock_data(stock_code):
    # Lấy danh sách file trong thư mục
    file_list = [f for f in os.listdir(folder_path) if f.endswith('.txt')]

    # Tìm file tương ứng với mã cổ phiếu
    file_name = next((f for f in file_list if f.split('.')[0] == stock_code.split('.')[0]), None)
    if not file_name:
        return None, None, None, f"Không tìm thấy file dữ liệu cho mã cổ phiếu {stock_code}."

    # Đọc dữ liệu từ file
    file_path = os.path.join(folder_path, file_name)
    df = pd.read_csv(file_path, sep='\t')
    df.columns = ['Date', 'Open', 'Low', 'High', 'Close', 'Volume']

    # Chuyển cột Date sang định dạng datetime
    df['Date'] = pd.to_datetime(df['Date'], format='%Y-%m-%d')

    # Tách dữ liệu thành df_1 và df_2
    cutoff_date = pd.Timestamp('2022-11-30')
    df_1 = df[df['Date'] <= cutoff_date].copy()
    df_2 = df[df['Date'] > cutoff_date].copy()

    # Đọc file thông tin công ty
    data_info_list = pd.read_excel(list_path)
    data_if = data_info_list[data_info_list['RIC'] == stock_code]
    if data_if.empty:
        data_if = data_info_list[data_info_list['Symbol'] == 'VT:' + stock_code.split('.')[0]]

    if data_if.empty:
        return None, None, None, f"Không tìm thấy thông tin công ty cho mã cổ phiếu {stock_code}."

    company_info = data_if.iloc[0].to_dict()
    return df_1, df_2, company_info, None

# NẠP DỮ LIỆU MÔ PHỎNG TỪNG NGÀY VÀ TÍNH TOÁN CÁC CHỈ SỐ CẦN THIẾT CHO VIỆC RA TÍN HIỆU
async def analyze_stock_data(df_1, df_2):
    # Lấy ngày thực tế từ hệ thống
    today = datetime.now().date()
    start_date = datetime(2025, 1, 19).date()  # Ngày bắt đầu mô phỏng

    # Tính số ngày trôi qua
    elapsed_days = (today - start_date).days

    if elapsed_days < 0 or elapsed_days >= len(df_2):
        return f"Không có dữ liệu mô phỏng cho ngày hiện tại."

    # Nạp dữ liệu từng ngày
    for i in range(elapsed_days + 1):
        current_row = df_2.iloc[i]

        # Cập nhật dữ liệu lịch sử
        df_1 = pd.concat([df_1, current_row.to_frame().T], ignore_index=True)

        # Tính các chỉ báo kỹ thuật
        #Tính MA
        df_1['MA10'] = df_1['Close'].rolling(window=10).mean()
        df_1['MA20'] = df_1['Close'].rolling(window=20).mean()
        df_1['MA50'] = df_1['Close'].rolling(window=50).mean()

        #Tính BB
        middle_bb = df_1['Close'].rolling(window=20).mean().iloc[-1]
        std_dev = df_1['Close'].rolling(window=20).std().iloc[-1]
        df_1['Middle_BB'] = middle_bb
        df_1['Upper_BB'] = middle_bb + 2 * std_dev
        df_1['Lower_BB'] = middle_bb - 2 * std_dev

        # Tính RSI
        df_1['RSI'] = ta.rsi(close=df_1['Close'], length=14)

        # Tính MACD
        df_1['MACD'] = df_1['Close'].ewm(span=12, adjust=False).mean() - df_1['Close'].ewm(span=26, adjust=False).mean()
        df_1['Signal'] = df_1['MACD'].ewm(span=9, adjust=False).mean()

        # Tính MFI
        # 1. Typical Price
        df_1['Typical_Price'] = (df_1['High'] + df_1['Low'] + df_1['Close']) / 3

        # 2. Raw Money Flow
        df_1['Raw_Money_Flow'] = df_1['Typical_Price'] * df_1['Volume']

        # 3. Money Flow Positive/Negative
        df_1['Positive_Flow'] = df_1['Raw_Money_Flow'].where(df_1['Typical_Price'] > df_1['Typical_Price'].shift(1), 0)
        df_1['Negative_Flow'] = df_1['Raw_Money_Flow'].where(df_1['Typical_Price'] < df_1['Typical_Price'].shift(1), 0)

        # 4. Rolling Sum for 14 periods
        df_1['Positive_Flow_Sum'] = df_1['Positive_Flow'].rolling(window=14).sum()
        df_1['Negative_Flow_Sum'] = df_1['Negative_Flow'].rolling(window=14).sum()

        # 5. Money Flow Ratio
        df_1['Money_Flow_Ratio'] = df_1['Positive_Flow_Sum'] / df_1['Negative_Flow_Sum']

        # 6. MFI Calculation
        df_1['MFI'] = 100 - (100 / (1 + df_1['Money_Flow_Ratio']))

        # Khối lượng
        df_1['Volume_avg'] = df_1['Volume'].rolling(window=20).mean()

        # Lấy dữ liệu ngày hiện tại
        last_index = df_1.last_valid_index()


    # Đưa ra tín hiệu giao dịch
    buy_criteria = [
        df_1.loc[last_index, 'MA10'] > df_1.loc[last_index, 'MA20'],
        df_1.loc[last_index, 'MA10'] > df_1.loc[last_index, 'MA50'],
        df_1.loc[last_index, 'RSI'] < 20,
        df_1.loc[last_index, 'MACD'] > df_1.loc[last_index, 'Signal'],
        df_1.loc[last_index, 'Close'] < df_1.loc[last_index, 'Lower_BB'],
        df_1.loc[last_index, 'MFI'] < 20,
        df_1.loc[last_index, 'Volume'] > df_1.loc[last_index, 'Volume_avg']
    ]

    sell_criteria = [
        df_1.loc[last_index, 'MA10'] < df_1.loc[last_index, 'MA20'],
        df_1.loc[last_index, 'MA10'] < df_1.loc[last_index, 'MA50'],
        df_1.loc[last_index, 'RSI'] > 80,
        df_1.loc[last_index, 'MACD'] < df_1.loc[last_index, 'Signal'],
        df_1.loc[last_index, 'Close'] > df_1.loc[last_index, 'Upper_BB'],
        df_1.loc[last_index, 'MFI'] > 80,
        df_1.loc[last_index, 'Volume'] < df_1.loc[last_index, 'Volume_avg']
    ]

    if sum(buy_criteria) >= 3 and sum(buy_criteria) != sum(sell_criteria):
        signal = "Mua"
    elif sum(sell_criteria) >= 3 and sum(buy_criteria) != sum(sell_criteria):
        signal = "Bán"
    else:
        signal = "Chưa có tín hiệu rõ ràng"

    return df_1, current_row, signal, None

def format_analysis_result(df_1, current_row, signal, company_info):
    company_name = company_info['Name']
    exchange = company_info['Exchange']
    symbol = company_info['Symbol'].split(':')[1]
    last_index = df_1.last_valid_index()

    stock_analysis = (
        f"MÃ CỔ PHIẾU: {symbol} - Khung ngày\n"
        f"Ngày mô phỏng: {current_row['Date'].strftime('%d-%m-%Y')}\n\n"
        f"{symbol} - {company_name} - Sàn {exchange}\n\n"
        f"🟢 Giá Mở: {current_row['Open']:.2f}, 📈 Giá cao: {current_row['High']:.2f}, 📉 Giá thấp: {current_row['Low']:.2f}\n"
        f"🔴 Giá Đóng cửa: {current_row['Close']:.2f}\n"
        f"📊 Khối lượng: {int(current_row['Volume']):,}\n\n"
        f"➡️ KHUYẾN NGHỊ: {signal}\n\n"
        "❗️ Lưu ý: Đọc thêm phân tích kỹ thuật và tình hình thị trường trước khi ra quyết định giao dịch.\n\n"
        "CHỈ BÁO KỸ THUẬT\n"
        f"MA10: {df_1.loc[last_index, 'MA10']:.2f}, MA20: {df_1.loc[last_index, 'MA20']:.2f}\n"
        f"MA50: {df_1.loc[last_index, 'MA50']:.2f}\n"
        f"RSI: {df_1.loc[last_index, 'RSI']:.2f}\n"
        f"MACD: {df_1.loc[last_index, 'MACD']:.2f}, Signal: {df_1.loc[last_index, 'Signal']:.2f}\n"
        f"MFI: {df_1.loc[last_index, 'MFI']:.2f}\n"
    )
    return stock_analysis

# HÀM CHÍNH ĐỂ PHÂN TÍCH CỔ PHIẾU 
async def analyze_stock(stock_code):
    # Lấy dữ liệu
    df_1, df_2, company_info, error = await get_stock_data(stock_code)
    if error:
        return error

    # Phân tích dữ liệu
    df_1, current_row, signal, error = await analyze_stock_data(df_1, df_2)
    if error:
        return error

    # Định dạng kết quả
    return format_analysis_result(df_1, current_row, signal, company_info)




# HÀM ĐỊNH DẠNG KẾT QUẢ PHÂN TÍCH TOP CỔ PHIẾU MUA/BÁN
def format_signal_results(buy_signals, sell_signals, current_date):
    result = f"PHÂN TÍCH TÍN HIỆU GIAO DỊCH - Ngày mô phỏng: {current_date.strftime('%d/%m/%Y')}\n\n"
    
    result += "🟢 TOP 5 CỔ PHIẾU CÓ TÍN HIỆU MUA:\n"
    for i, signal in enumerate(buy_signals, 1):
        result += (f"{i}. /{signal['symbol']} - {signal['company_name']}\n"
                  f"   Giá: {signal['close_price']:.2f} (+{signal['price_change']:.2f}%)\n"
                  f"   Khối lượng: {int(signal['volume']):,}\n")
    
    result += "\n🔴 TOP 5 CỔ PHIẾU CÓ TÍN HIỆU BÁN:\n"
    for i, signal in enumerate(sell_signals, 1):
        result += (f"{i}. /{signal['symbol']} - {signal['company_name']}\n"
                  f"   Giá: {signal['close_price']:.2f} ({signal['price_change']:.2f}%)\n"
                  f"   Khối lượng: {int(signal['volume']):,}\n")
    
    result += "\n❗️ Lưu ý: Đây chỉ là tín hiệu tham khảo. Vui lòng phân tích thêm các yếu tố khác trước khi đưa ra quyết định giao dịch."
    return result

# HÀM GỬI TÍN HIỆU 
async def send_daily_signal(context: ContextTypes.DEFAULT_TYPE) -> None:
    buy_signals, sell_signals, current_date = await get_top_signals()
    if buy_signals is None or sell_signals is None:
        await context.bot.send_message(
            chat_id=context.job.data["chat_id"],
            text="Có lỗi xảy ra trong quá trình phân tích."
        )
        return
        
    result = format_signal_results(buy_signals, sell_signals, current_date)
    await context.bot.send_message(
        chat_id=context.job.data["chat_id"],
        text=result
    )
# HÀM LỌC RA TOP 5 CỔ PHIẾU CÓ TÍN HIỆU MUA VÀ BÁN DỰA TRÊN % THAY ĐỔI GIÁ
async def get_top_signals():
    try:
        # Lọc danh sách file, loại bỏ danhsach.txt và NO1.txt
        file_list = [f for f in os.listdir(folder_path) 
                    if f.endswith('.txt') 
                    and f not in ['danhsach.txt', 'NO1.txt']]
        
        buy_signals = []
        sell_signals = []
        current_date = None

        for file_name in file_list:
            try:
                stock_code = file_name.split('.')[0]
                
                # Sử dụng hàm get_stock_data để lấy dữ liệu
                df_1, df_2, company_info, error = await get_stock_data(stock_code)
                if error:
                    continue

                # Loại bỏ các hàng có giá trị NaN
                # df_1 = df_1.dropna()
                # df_2 = df_2.dropna()
                
                # Kiểm tra nếu dataframe rỗng sau khi loại bỏ NaN
                if df_1.empty or df_2.empty:
                    print(f"Bỏ qua {file_name} do không có dữ liệu hợp lệ sau khi loại bỏ NaN")
                    continue

                # Sử dụng hàm analyze_stock_data để phân tích
                df_1_analyzed, current_row, signal, error = await analyze_stock_data(df_1, df_2)
                if error:
                    continue

                # Lưu ngày hiện tại
                if current_date is None:
                    current_date = current_row['Date']
                
                # Tính % thay đổi giá
                if len(df_2) > 1:
                    prev_close = df_2.iloc[df_2.index.get_loc(current_row.name) - 1]['Close']
                    price_change_pct = ((current_row['Close'] - prev_close) / prev_close) * 100
                else:
                    price_change_pct = 0

                # Thêm vào danh sách tương ứng nếu có tín hiệu
                if signal == "Mua":
                    buy_signals.append({
                        'symbol': stock_code,
                        'company_name': company_info['Name'],
                        'price_change': price_change_pct,
                        'close_price': current_row['Close'],
                        'volume': current_row['Volume']
                    })
                elif signal == "Bán":
                    sell_signals.append({
                        'symbol': stock_code,
                        'company_name': company_info['Name'],
                        'price_change': price_change_pct,
                        'close_price': current_row['Close'],
                        'volume': current_row['Volume']
                    })

            except Exception as e:
                print(f"Lỗi khi xử lý file {file_name}: {str(e)}")
                continue

        # Sắp xếp và lấy top 5
        buy_signals = sorted(buy_signals, key=lambda x: x['price_change'], reverse=True)[:5]
        sell_signals = sorted(sell_signals, key=lambda x: x['price_change'])[:5]

        return buy_signals, sell_signals, current_date

    except Exception as e:
        print(f"Lỗi trong quá trình phân tích: {str(e)}")
        return None, None, None
