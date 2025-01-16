from telegram import Update
import openai
from telegram.ext import (
    Application,
    CommandHandler,
    MessageHandler,
    ContextTypes,
    filters
)
import openai
# Hàm xử lý lệnh /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Xin chào! Tôi là bot của Thắng Ngô. Muốn biết gì thì sủa vào đây.")

async def predict(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Đợi tí rồi báo cho.")

# Cấu hình OpenAI API

async def handle_message(update: Update,context: ContextTypes.DEFAULT_TYPE):
    openai.api_key = "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"
    user_message = update.message.text



# Gọi API với cú pháp mới
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Xin chào, bạn là ai?"}
        ]
    )
    bot_response = response["choices"][0]["message"]["content"]

    await update.message.reply_text(bot_response)
# Hàm xử lý tin nhắn từ người dùng
# async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
#     user_message = update.message.text
#     # Tùy chỉnh trả lời của bot tại đây
#     bot_response = f"Bạn vừa nói: {user_message}"
#     await update.message.reply_text(bot_response)

    
    
# Hàm chính
def main():
    # Thay TOKEN bằng token của bạn
    TOKEN = "7630930438:AAHYuF0iaRXEZ_EnUWU9Cd9MU9gjKJSUc8o"

    # Tạo ứng dụng bot
    app = Application.builder().token(TOKEN).build()
    
    # Xử lý lệnh /start
    app.add_handler(CommandHandler("start", start))

    # Xử lý lệnh /predict
    app.add_handler(CommandHandler("predict", predict))
 
    # Xử lý tin nhắn từ người dùng
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))


    # Chạy bot
    app.run_polling()

if __name__ == "__main__":
    main()
