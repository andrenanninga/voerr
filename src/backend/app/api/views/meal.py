from flask import Response, json, Blueprint

from app.api.models.meal import Meal

mod = Blueprint('meal', __name__, url_prefix='/api/meal')

@mod.route('/<id>', methods=['GET'])
def getMeal(id):
    try:
        meal = Meal.query.get(id)
        return Response(json.dumps(meal.serialize()), mimetype='application/json')
    except Exception as e:
        return json.dumps({'error': str(e)})