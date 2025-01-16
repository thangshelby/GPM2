from flask import Flask
from flask_cors import CORS
def create_app():
    app = Flask(__name__)
    CORS(app)


    from app.routes import user_routes,stock_routes 

    # Register routes
    app.register_blueprint(stock_routes.stock_bp, url_prefix='/stocks')
    app.register_blueprint(user_routes.user_bp, url_prefix='/users')
    # app.register_blueprint(product_routes.product_bp, url_prefix='/products')

    return app
