from flask import Blueprint
from app.controllers.stock import get_stock_data, get_stock_prices
import yfinance as yf
stock_bp = Blueprint('stock_bp', __name__)

@stock_bp.route('/', methods=['GET'])
def fetch_users():
    return get_users()


@stock_bp.route('/stock_prices', methods=['GET'])
def fetch_stock_prices():
    data= yf.Ticker('AAA')
    history = data.history(start="2022-12-01", end="2022-12-02")

    return get_stock_prices('AAA')

@stock_bp.route('/', methods=['POST'])
def add_user():
    return create_user()

