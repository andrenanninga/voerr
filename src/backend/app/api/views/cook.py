from flask import Response, json, Blueprint

from app.api.models.cook import Cook

mod = Blueprint('cook', __name__, url_prefix='/api/cook')

@mod.route('/<id>', methods=['GET'])
def getCook(id):
    cook = Cook.query.get(id)
    return Response(json.dumps(cook.serialize()), mimetype='application/json')
