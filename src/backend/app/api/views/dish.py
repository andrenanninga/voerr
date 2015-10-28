from flask import Response, json, Blueprint

from app.api.models.dish import Dish

mod = Blueprint('dish', __name__, url_prefix='/api/dish')

@mod.route('/<id>', methods=['GET'])
def getDish(id):
    dish = Dish.query.get(id)
    return Response(json.dumps(dish.serialize()), mimetype='application/json')
