generation_config = {
  "temperature": 0,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}
safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_NONE",
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE",
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE",
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE",
  },
]
help_message = (
        "📌 **HƯỚNG DẪN SỬ DỤNG**\n\n"
        "💡 **Các lệnh cơ bản:**\n"
        "1. **Xem phân tích cổ phiếu:**\n"
        "   - Gõ: `/[mã cổ phiếu]`\n"
        "   - Ví dụ: `/VCB`, `/ACB`, `/FPT`\n\n"
        "2. **Tín hiệu giao dịch:**\n"
        "   - Gõ: `/tinhieu`\n"
        "   - Xem top 5 cổ phiếu có tín hiệu **MUA/BÁN** dựa trên phân tích tự động.\n"
        "   - Bot tự động gửi tín hiệu hàng ngày vào lúc 15:00.\n\n"
        "3. **Thông tin cổ phiếu:**\n"
        "   - Gõ: `/info {mã cổ phiếu}`\n"
        "   - Ví dụ: `/info TCB`\n"
        "   - Nhận thông tin chi tiết về cổ phiếu.\n\n"
        "4. **Tin tức mới nhất:**\n"
        "   - Gõ: `/news`\n"
        "   - Xem top 5 tin tức thị trường mới nhất từ **VNExpress**.\n\n"
        "5. **Trợ lý chatbot:**\n"
        "   - Gõ trực tiếp: {nội dung}\n"
        "   - Chatbot AI sẽ trả lời câu hỏi hoặc tư vấn tài chính theo nội dung bạn nhập.\n\n"
        "💬 **Khởi động & hướng dẫn:**\n"
        "   - `/start`: Bắt đầu sử dụng bot.\n"
        "   - `/help`: Xem hướng dẫn.\n\n"
        "🔍 **Các chỉ báo phân tích:**\n"
        "   - Đường trung bình động (**MA**) với các khoảng thời gian 10, 20, 50 ngày.\n"
        "   - Chỉ số sức mạnh tương đối (**RSI**).\n"
        "   - MACD, Bollinger Bands, và MFI.\n"
        "   - Phân tích khối lượng giao dịch.\n\n"
        "📅 **Lưu ý:**\n"
        "   - Bot hiện đang chạy dữ liệu mô phỏng từ ngày **01/12/2022**."
    )
folder_path = 'E:\github\python\GPM1\GPM1_G2\Vietnam'
list_path = 'E:\github\python\GPM1\GPM1_G2\Vietnam\Vietnam.xlsx'