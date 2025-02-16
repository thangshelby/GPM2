from flask import Blueprint,request
from app.controllers.stock import get_stock_prices,get_stock_info,get_all_stock_rics
import yfinance as yf
stock_bp = Blueprint('stock_bp', __name__)



@stock_bp.route('/stock_prices', methods=['GET'])
def fetch_stock_prices():
    ticker= request.args.get('ticker')
    return get_stock_prices(ticker)

@stock_bp.route('/all_stock_rics', methods=['GET'])
def fetch_all_stock_rics():
    return get_all_stock_rics()

@stock_bp.route('/stock_info', methods=['GET'])
def fetch_stock_info():
    ticker= request.args.get('ticker')
    return get_stock_info(ticker)


