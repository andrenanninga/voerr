from flask import Response, json, Blueprint

from app.api.models.category import Category

mod = Blueprint('category', __name__, url_prefix='/api/category')

@mod.route('/<id>', methods=['GET'])
def getCategory(id):
    try:
        category = Category.query.get(id)
        return Response(json.dumps(category.serialize()), mimetype='application/json')
    except Exception as e:
        return json.dumps({'error': str(e)})
