from flask import request, jsonify, Blueprint

mod = Blueprint('api', __name__, url_prefix='/api')

@mod.route('/')
def index():
    return jsonify(test1='test',test2='test2')