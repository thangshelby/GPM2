## Mô Tả

Dự án này cung cấp các chức năng để:
- Tải và xử lý dữ liệu cổ phiếu.
- Tính toán các chỉ báo kỹ thuật như MA, RSI, MACD, Bollinger Bands, và MFI.
- Xây dựng một bot Telegram để nhận thông tin cổ phiếu theo chỉ báo.

## Cài Đặt

Để cài đặt và chạy dự án trên máy của bạn, bạn cần:

### 1. Cài đặt các môi trường cần thiết
Đảm bảo đã cài đặt Python phiên bản 3.8 hoặc mới hơn. Bạn có thể tải Python tại [python.org](https://www.python.org/).
Bên cạnh đó cũng cần cài đặt môi trường nodejs vào trong máy.Tải bản mới nhất

### 2.Cài đặt github để clone repository này vào máy của mình

### 3. Cài đặt các thư viện cần thiết cho server và bot telegram chạy bằng python

Sử dụng pip để cài đặt các thư viện cần thiết:

```bash
pip install pandas numpy python-telegram-bot,....

### 4. Cài đăt các thư viện cần thiết cho client chạy trong môi trường nodejs
npm install

### 5. Câu lệnh để khởi chạy server: Di chuyển terminal vào thư mục server sau đó chạy lệnh: python run.py
       Câu lệnh để khởi chạy bot: Di chuyển terminal vào thư mục bot sau đó chạy lệnh: python run.py
       Câu lệnh để khởi chạy client: Di chuyển terminal vào thư mục client sau đó chạy lệnh: npm run dev (thay đổi đường dẫn tới :http://localhost:5173/stock/lazy/<tên mã cổ phiếu>)
