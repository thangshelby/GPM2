from flask import Flask
from flask_cors import CORS
def create_app():
    app = Flask(__name__)
    CORS(app)

    from app.routes import stock, indicator

    # Register routes
    app.register_blueprint(stock.stock_bp, url_prefix='/stocks')
    app.register_blueprint(indicator.indicator_bp, url_prefix='/indicators')
    
    return app
