from app import app
from flask import Response, request, jsonify, json, Blueprint, make_response
from app import db  

mod = Blueprint('api', __name__, url_prefix='/api/v1')

@mod.route('/')
def index():
    return jsonify(message = "Welcome to the API")
