from flask import Response, json, Blueprint

from app.api.models.order import Order

mod = Blueprint('order', __name__, url_prefix='/api/order')

@mod.route('/<id>', methods=['GET'])
def getOrder(id):
    order = Order.query.get(id)
    return Response(json.dumps(order.serialize()), mimetype='application/json')
