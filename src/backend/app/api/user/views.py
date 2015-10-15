from flask import request, jsonify, Blueprint

mod = Blueprint('user', __name__, url_prefix='/api/user')

@mod.route('/')
def index():
    return 'hello'