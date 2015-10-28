from flask import Response, json, Blueprint

from app.api.models.allergy import Allergy

mod = Blueprint('allergy', __name__, url_prefix='/api/allergy')

@mod.route('/<id>', methods=['GET'])
def getAllergy(id):
    allergy = Allergy.query.get(id)
    return Response(json.dumps(allergy.serialize()), mimetype='application/json')
