from flask import Blueprint,request
from app.controllers.stock import get_stock_data,get_stock_prices,get_indicator
import yfinance as yf
stock_bp = Blueprint('stock_bp', __name__)



@stock_bp.route('/stock_prices', methods=['GET'])
def fetch_stock_prices():
    ticker= request.args.get('ticker')
    return get_stock_prices(ticker)

