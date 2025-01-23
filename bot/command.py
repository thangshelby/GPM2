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
from openai import OpenAI
import google.generativeai as genai
from dotenv import load_dotenv
from config import generation_config, safety_settings,help_message
load_dotenv()

from utils import get_stock_data,analyze_stock ,format_signal_results,send_daily_signal,get_top_signals

async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    welcome_message = (
        "Xin chào! Tôi là bot phân tích cổ phiếu. 📊\n\n"
        "Cách sử dụng:\n"
        "- Gõ /[mã cổ phiếu] để xem phân tích (VD: /VCB, /ACB)\n"
        "- Gõ /help để xem hướng dẫn\n"
        "- Gõ /tinhieu để xem top 5 cổ phiếu có tín hiệu MUA/BÁN dựa trên % thay đổi giá đóng cửa và chatbot tự động cập nhật tín hiệu hằng ngày"
    )
    await update.message.reply_text(welcome_message)
    
    
async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(help_message)


async def stock_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    stock_code = update.message.text[1:].upper()
    result =  await analyze_stock(stock_code)
    await update.message.reply_text(result)


async def signal_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    chat_id = update.effective_chat.id
    now = datetime.now(pytz.timezone('Asia/Ho_Chi_Minh'))
    current_time = now.time()

    await update.message.reply_text("Đang phân tích tín hiệu giao dịch...")

    try:
        buy_signals, sell_signals, current_date = await get_top_signals()
        if buy_signals is None or sell_signals is None:
            await update.message.reply_text("Có lỗi xảy ra trong quá trình phân tích.")
            return
        
        result = format_signal_results(buy_signals, sell_signals, current_date)
        await update.message.reply_text(result)
    except Exception as e:
        await update.message.reply_text(f"Lỗi phân tích tín hiệu: {e}")
        return

    # Thiết lập thời gian
    target_time = time(hour=15, minute=00)
    tz = pytz.timezone('Asia/Ho_Chi_Minh')
    target_datetime = datetime.combine(now.date(), target_time, tzinfo=tz)

    # Kiểm tra nếu thời gian hiện tại đã qua 15:00, lên lịch cho ngày hôm sau
    if current_time >= target_time:
        target_datetime += timedelta(days=1)

    # Xóa job cũ nếu có
    current_jobs = context.job_queue.get_jobs_by_name(f'signal_job_{chat_id}')
    if current_jobs:
        for job in current_jobs:
            job.schedule_removal()

    # Tạo job mới
    context.job_queue.run_once(
        send_daily_signal,
        when=target_datetime,
        data={'chat_id': chat_id},
        name=f'signal_job_{chat_id}'
    )
    await update.message.reply_text(
        f"Đã thiết lập gửi tín hiệu tự động vào lúc 15:00 ngày {target_datetime.strftime('%d/%m/%Y')}!"
    )

async def news_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:

    list_news = []
    r = requests.get('https://vnexpress.net/kinh-doanh/chung-khoan')
    
    soup = BeautifulSoup(r.text, 'html.parser')
    mydivs = soup.find_all("h2", {"class": "title-news"})
    for new in mydivs:
        newdic = {}
        newdic["title"] = new.a.get("title")
        newdic["link"] = new.a.get("href")
        list_news.append(newdic)
        
    response = ""
    for idx, item in enumerate(list_news[0:5], start=1):
        response += f"{idx}. {item['title']}\n{item['link']}\n\n"
    await update.message.reply_text(f'Top tin tức mới nhất hôm nay:\n {response}')
    
    


async def chatbot_command (update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
   
    genai.configure(api_key=os.getenv("GENAI_API_KEY"))

    # Cấu hình model

    model = genai.GenerativeModel(
    model_name="gemini-2.0-flash-exp",
    safety_settings=safety_settings,
    generation_config=generation_config,
    system_instruction="Chatbot này sẽ hoạt động như một broker chứng khoán chuyên nghiệp, hỗ trợ người dùng trong việc mua bán cổ phiếu và cung cấp tư vấn đầu tư. Nó sẽ phân tích dữ liệu thị trường để đưa ra các khuyến nghị mua hoặc bán cổ phiếu, dựa trên xu hướng hiện tại và lịch sử giao dịch. Ngoài ra, chatbot còn cung cấp thông tin thị trường được cập nhật liên tục, bao gồm các chỉ số chứng khoán, tin tức về thị trường, và báo cáo phân tích tài chính của các công ty, giúp người dùng có được cái nhìn sâu sắc và đầy đủ về tình hình tài chính và kinh tế mà họ quan tâm.",
    )

    chat_session = model.start_chat(
        history=[]
    )
    user_input = update.message.text

    try:
        response = chat_session.send_message(user_input)
        model_response = response.text

        
        chat_session.history.append({"role": "user", "parts": [user_input]})
        chat_session.history.append({"role": "model", "parts": [model_response]})
        
        await update.message.reply_text(model_response)
        # bot.reply_to(message, f"{model_response}")

    except Exception as e:
        await update.message.reply_text(f"Có lỗi xảy ra khi chatbot giao tiếp: {e}")



async def info_command(update: Update, context: ContextTypes.DEFAULT_TYPE):

    try:
        # Giả định message.text là "/info TCB"
        ticker= update.message.text.split(' ')[1].upper()

        # Đọc DataFrame từ file Excel
        file_path = 'E:\github\python\GPM1\GPM1_G2\Vietnam\Vietnam.xlsx'  # Chỉ định đường dẫn file
        df = pd.read_excel(file_path)  # Đọc file

        # Kiểm tra xem cột 'Symbol' có tồn tại trong DataFrame không
        if 'Symbol' not in df.columns:
            raise ValueError("Cột 'Symbol' không tồn tại trong file Excel.")

        # In ra các mã cổ phiếu có trong DataFrame để kiểm tra
        print("Các mã cổ phiếu có trong DataFrame:", df['Symbol'].unique())

        # Tìm thông tin cổ phiếu bằng cách lọc DataFrame
        stock_info = df[df['Symbol'] == 'VT:'+ticker]
        if stock_info.empty:
            print(f"Không tìm thấy mã cổ phiếu {ticker} trong dữ liệu.")
            raise ValueError("Không tìm thấy mã cổ phiếu này trong dữ liệu.")
        
        # In ra thông tin chi tiết của mã cổ phiếu để kiểm tra
        print(f"Thông tin chi tiết của mã cổ phiếu {ticker}:", stock_info)

        # Chuẩn bị câu trả lời
        response = (f"Symbol: {stock_info.iloc[0]['Symbol']}\n"
                    f"Start Date: {stock_info.iloc[0]['Start Date']}\n"
                    f"Hist.: {stock_info.iloc[0]['Hist.']}\n"
                    f"Exchange: {stock_info.iloc[0]['Exchange']}\n"
                    f"Market: {stock_info.iloc[0]['Market']}\n"
                    f"Currency: {stock_info.iloc[0]['Currency']}\n"
                    f"Sector: {stock_info.iloc[0]['Sector']}\n"
                    f"Full Name: {stock_info.iloc[0]['Full Name']}\n"
                    f"Activity: {stock_info.iloc[0]['Activity']}")
        
        await update.message.reply_text(response)

    except ValueError as e:
        await update.message.reply_text(str(e))
    except IndexError:
        await update.message.reply_text( "Vui lòng cung cấp mã cổ phiếu theo cấu trúc: /info {ticker}.")
    except Exception as e:
        await update.message.reply_text( f"Đã có lỗi xảy ra: {str(e)}")