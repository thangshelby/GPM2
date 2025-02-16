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
from dotenv import load_dotenv
from commands import start_command,help_command,stock_command,signal_command,news_command,chatbot_command,info_command


load_dotenv()  


def main():
    app = ApplicationBuilder().token('7001217343:AAFKgBcomMcJrLlVi6DuSacRmsOZ4wNPN2A').build()
   
    app.add_handler(CommandHandler("start", start_command))
    app.add_handler(CommandHandler("help", help_command))
    app.add_handler(CommandHandler("tinhieu", signal_command))
    app.add_handler(CommandHandler("news", news_command))
    app.add_handler(CommandHandler("info", info_command))
   
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, chatbot_command))
    app.add_handler(MessageHandler(filters.COMMAND, stock_command))
   
   
    print("Bot đang chạy...")
    app.run_polling()


if __name__ == "__main__":
    main()