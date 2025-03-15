import pandas as pd
import matplotlib.pyplot as plt

def plot_total_assets_and_equity_from_excel(filepath, bank_code):
    df = pd.read_excel(filepath)

    bank_data = df[df['Mã'] == bank_code.upper()].sort_values(by='Năm')
    years = bank_data['Năm'].tolist()
    total_assets = bank_data['Total Assets'].tolist()
    equity = bank_data['Equity'].tolist()
    
    res={}
    res['years']=years
    res['total_assets']=total_assets
    res['equity']=equity
    return res

    fig, ax1 = plt.subplots(figsize=(10, 6))

    color_assets = 'tab:blue'
    ax1.set_xlabel('Year')
    ax1.set_ylabel('Total Assets (Tỷ VND)', color=color_assets)
    ax1.plot(years, total_assets, linestyle='-', color=color_assets, label='Total Assets')
    ax1.tick_params(axis='y', labelcolor=color_assets)

    ax2 = ax1.twinx()
    color_equity = 'tab:green'
    ax2.set_ylabel('Equity (Tỷ VND)', color=color_equity)
    ax2.plot(years, equity, linestyle='--', color=color_equity, label='Equity')
    ax2.tick_params(axis='y', labelcolor=color_equity)

    plt.title(f'Total Assets and Equity Over Time - {bank_code.upper()}')
    fig.tight_layout()
    plt.grid(True, linestyle='--', alpha=0.7)
    plt.xticks(years)
    plt.show()

def plot_stacked_bar_liabilities_equity(filepath, bank_code):
    df = pd.read_excel(filepath)

    bank_data = df[df['Mã'] == bank_code.upper()].sort_values(by='Năm')
    years = bank_data['Năm'].tolist()
    liabilities = bank_data['Total Liabilities'].tolist()
    equity = bank_data['Equity'].tolist()

    plt.figure(figsize=(10, 6))

    plt.bar(years, liabilities, label='Total Liabilities', color='tab:orange')
    plt.bar(years, equity, bottom=liabilities, label='Equity', color='tab:green')

    plt.title(f'Total Liabilities and Equity (Stacked) - {bank_code.upper()}')
    plt.xlabel('Year')
    plt.ylabel('Value (Tỷ VND)')

    plt.legend()
    plt.grid(True, linestyle='--', alpha=0.7)
    plt.xticks(years)
    plt.tight_layout()

    plt.show()
    
def plot_roe_comparison_from_excel(filepath, bank_code):
    df = pd.read_excel(filepath)

    df_2024 = df[df['Năm'] == 2024]
    top_banks = df_2024.nlargest(6, 'Total Assets')

    if bank_code.upper() in top_banks['Mã'].values:
        top_banks = top_banks[top_banks['Mã'] != bank_code.upper()].head(5)
    else:
        top_banks = top_banks.head(5)

    bank_code_data = df_2024[df_2024['Mã'] == bank_code.upper()]

    banks = [bank_code.upper()] + top_banks['Mã'].tolist()
    roe_values = [float(bank_code_data['ROE'])] + top_banks['ROE'].tolist()
    assets_values = [float(bank_code_data['Total Assets'])] + top_banks['Total Assets'].tolist()

    colors = ['tab:blue' if bank == bank_code.upper() else 'tab:gray' for bank in banks]

    labels = [f'{bank}\n({assets:,.0f} Tỷ)' for bank, assets in zip(banks, assets_values)]

    plt.figure(figsize=(12, 7))
    plt.bar(labels, roe_values, color=colors)

    plt.title(f'ROE Comparison for Year 2024 - {bank_code.upper()} vs Top 5 Banks')
    plt.xlabel('Bank (Total Assets)')
    plt.ylabel('ROE (%)')

    plt.grid(axis='y', linestyle='--', alpha=0.7)
    plt.tight_layout()

    plt.show()

def plot_debt_equity_ratio(filepath, bank_code):
    df = pd.read_excel(filepath)

    bank_data = df[df['Mã'] == bank_code.upper()].sort_values(by='Năm')
    years = bank_data['Năm'].tolist()
    debt_equity_ratio = bank_data['Total Debt/Equity'].tolist()

    plt.figure(figsize=(10, 6))

    plt.plot(years, debt_equity_ratio, marker='o', linestyle='-', color='tab:red')

    plt.title(f'Total Debt/Equity (%) Over Time - {bank_code.upper()}')
    plt.xlabel('Year')
    plt.ylabel('Debt/Equity (%)')

    plt.grid(True, linestyle='--', alpha=0.7)
    plt.xticks(years)
    plt.tight_layout()

    plt.show()

# Sử dụng mẫu:
file_path = "C:/Users/HUU KIEN/OneDrive/Máy tính/Học tập/HK8/Gói 1/BTN_3/data_financial_bank.xlsx"
bank_code = "ACB"


plot_total_assets_and_equity_from_excel(file_path, bank_code)
plot_stacked_bar_liabilities_equity(file_path, bank_code)
plot_roe_comparison_from_excel(file_path, bank_code)
plot_debt_equity_ratio(file_path, bank_code)

