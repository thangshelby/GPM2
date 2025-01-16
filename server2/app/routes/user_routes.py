from flask import Blueprint
from app.controllers.user_controller import get_users, create_user

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/', methods=['GET'])
def fetch_users():
    return get_users()

@user_bp.route('/', methods=['POST'])
def add_user():
    return create_user()
