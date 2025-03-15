import panel as pn
import pandas as pd
import hvplot.pandas
import os
import glob
import re
from datetime import datetime
from datetime import datetime, timedelta
pn.extension()

folder_path=os.path.dirname(os.path.abspath(__file__))+'/data'
file_path=glob.glob(os.path.join(folder_path,"*.csv"))

# take day from file
def extract_date_from_filename(filename):
    match = re.search(r'(\d{8})\.csv$', filename) 
    if match:
        return datetime.strptime(match.group(1), "%Y%m%d").date()
    return None

file_path = glob.glob(os.path.join(folder_path, "*.csv"))
Date_list = [extract_date_from_filename(os.path.basename(f)) for f in file_path if extract_date_from_filename(os.path.basename(f))]

# list
Sector_list = [
    'Bất động sản L2', 'Ngân hàng L2', 'Tài nguyên Cơ bản L2',
    'Xây dựng và Vật liệu L2', 'Dầu khí L2', 'Du lịch và Giải trí L2',
    'Thực phẩm và đồ uống L2', 'Dịch vụ tài chính L2', 'Ô tô và phụ tùng L2',
    'Y tế L2', 'Truyền thông L2', 'Viễn thông L2',
    'Hàng & Dịch vụ Công nghiệp L2', 'Điện, nước & xăng dầu khí đốt L2',
    'Công nghệ Thông tin L2', 'Hàng cá nhân & Gia dụng L2', 'Bảo hiểm L2',
    'Hóa chất L2', 'Bán lẻ L2'
]

columns = ["Cá nhân Tổng GT Ròng", "Tổ chức trong nước Tổng GT Ròng", "Tự doanh Tổng GT Ròng", "Nước ngoài Tổng GT Ròng"]

#Widget chọn khoảng thời gian
date_picker = pn.widgets.DateRangePicker(
    name="Chọn khoảng thời gian", 
    value=(min(Date_list), max(Date_list)) if Date_list else (datetime(2024, 2, 15), datetime(2024, 2, 28))
)

#Widget chọn ngành
sector_picker = pn.widgets.Select(
    name="Chọn ngành", 
    options=Sector_list, 
    value="Hóa chất L2"
)

#Hàm tìm file theo ngày đã chọn
def get_files_in_range(date_range):
    start_date, end_date = date_range
    file_list = []
    dates = []

    current_date = start_date
    while current_date <= end_date:
        date_str = current_date.strftime("%Y%m%d")
        file_name = f"FiinTrade_Ngành-chuyên-sâu_Phân-Loại-Nhà-Đầu-Tư__1 NGÀY_{date_str}.csv"
        file_path = os.path.join(folder_path, file_name)
        
        if os.path.exists(file_path):
            file_list.append(file_path)
            dates.append(current_date)

        current_date += timedelta(days=1)
    
    return file_list, dates

# xử lý dữ liệu & vẽ biểu đồ
@pn.depends(date_picker.param.value, sector_picker.param.value)
def load_and_plot_data(date_range, sector):
    file_list, dates = get_files_in_range(date_range)
    
    if not file_list:
        return pn.pane.Markdown("### Không tìm thấy file nào trong khoảng thời gian đã chọn.")

    data_list = []
    # Đọc từng file và lọc ngành
    for file, date in zip(file_list, dates):
        df = pd.read_csv(file)
        df_filtered = df[df["Ngành"] == sector].copy() 
        df_filtered["date"] = date 

        if not df_filtered.empty:
            df_filtered.loc[:, "date"] = date 
            data_list.append(df_filtered)

    if not data_list:
        return pn.pane.Markdown(f"###  Không có dữ liệu cho ngành `{sector}` trong khoảng đã chọn.")

    # Ghép dữ liệu lại
    final_df = pd.concat(data_list, ignore_index=True)

    #Chỉ lấy các cột cần thiết
    final_df = final_df[["date"] + columns]

    # Vẽ biểu đồ
    plot = final_df.hvplot.line(
        x="date", 
        y=columns, 
        title=f"Tổng giá trị ròng theo ngành {sector}", 
        xlabel="Thời gian", 
        ylabel="Tổng GT Ròng", 
        width=900, 
        height=500
    )

    return pn.Column(
        f"###  Đã tải {len(file_list)} file:",
        "\n".join([f"- {os.path.basename(f)}" for f in file_list]),
        plot
    )

dashboard = pn.Column(
    "# Chọn khoảng thời gian & ngành",
    date_picker,
    sector_picker,
    load_and_plot_data
)

dashboard.servable()
dashboard.show()