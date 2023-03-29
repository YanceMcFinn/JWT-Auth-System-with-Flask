"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.

@api.route("/token", methods=["POST"])
def generate_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password, is_active = True).first()
    if user:
        access_token = create_access_token(identity=email)  # JWT_extended
        response_body = {"email": email,
                         "access_token": access_token}
        return response_body, 200
    else:
        response_body = {"message": "Bad username, password or user inactive"}
        return response_body, 401


@api.route("/users", methods=["GET"])
def get_users():
    all_users = User.query.all()
    all_users = list(map(lambda x: x.serialize(), all_users))
    return (jsonify(all_users), 200)

    
@api.route("/users/<int:id>", methods=["DELETE"])
def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return ("user cleared", 200)
    

@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "email": user.email }), 200

@api.route("/signup", methods=["POST"])
def add_user():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if data is None:
        return "The request body is empty", 400
    if 'email' not in data:
        return "You need to specify the email",400
    if 'password' not in data:
        return "You need to specify the password", 400

    user = User.query.filter_by(email = email).first()
    if not user:
        user = User()
        user.email = email,
        user.password = password
        user.is_active = True

        db.session.add(user)
        db.session.commit()
    else:
        return jsonify({"msg": "User already exists"}), 400

    return jsonify({"msg": "User registered successfully"}), 200
