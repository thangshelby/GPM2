from vnstock import Vnstock
import pandas as pd
import numpy as np
from app.utils.business import get_stock_data, get_finance_data,calculate_stock_metrics,get_general_info_and_detail,get_summary
from app.utils.financial import get_report_info
from datetime import datetime
import json

def create_report_business(symbol,date):
    date=pd.to_datetime(date)

    res = calculate_stock_metrics(symbol, date)

        
    general_info,company_detail= get_general_info_and_detail(symbol)
    business_summary= get_summary(symbol,"Business")
    financial_summary= get_summary(symbol,"Financial")
    
    res['general_info']= general_info
    res['company_detail']= company_detail
    res['business_summary']= business_summary
    res['financial_summary']= financial_summary
    
    return res
    
def create_report_financial(symbol):
    res={}
    balance_sheet,income_statement, profitability_analysis,ai_analysis=get_report_info(symbol)
    res['balance_sheet']=balance_sheet
    res['income_statement']=income_statement
    res['profitability_analysis']=profitability_analysis
    res['ai_analysis']=ai_analysis
    

    return res



