from flask import jsonify, request

def get_users():
    # Logic lấy danh sách user
    users = [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]
    return jsonify(users)

def create_user():
    # Logic tạo user mới
    data = request.json
    return jsonify({"message": "User created", "data": data}), 201
