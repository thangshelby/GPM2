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


def chatbot_command (company_name) -> None:
    genai.configure(api_key='AIzaSyDxXq-lyb665Xpc0CxyhsG8RengNnAtA5A')

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
    # user_input = update.message.text
    user_input_2= f"Hãy cho tôi biết địa chỉ, số điện thoại,email, link web của công ty {company_name}(Output như một object cho tôi)"
    user_input = f"Hãy cho tôi biết Business Summary của công ty f{company_name}"

    try:
        response = chat_session.send_message(user_input_2)
        model_response = response.text

        print(model_response)
        
        chat_session.history.append({"role": "user", "parts": [user_input]})
        chat_session.history.append({"role": "model", "parts": [model_response]})
        
        # await update.message.reply_text(model_response)
        # bot.reply_to(message, f"{model_response}")

    except Exception as e:
        print(f"Có lỗi xảy ra khi chatbot giao tiếp: {e}")


chatbot_command('Hoa phat Group')