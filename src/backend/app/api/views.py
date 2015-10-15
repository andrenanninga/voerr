from flask import request, jsonify, Blueprint
from app.api.models.user import User

mod = Blueprint('api', __name__, url_prefix='/api')

@mod.route('/')
def index():
    user = User.query.first()
    print(user.cook.dishes[0].allergies)
    return jsonify(test1='test',test2='test2')