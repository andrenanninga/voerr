from flask import Blueprint

mod = Blueprint('api', __name__, url_prefix='/api')

@mod.route('/')
def index():
    return 'test'