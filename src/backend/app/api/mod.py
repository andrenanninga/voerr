from app import app
from flask import Response, request, jsonify, json, Blueprint, make_response
from app import db  

mod = Blueprint('api', __name__, url_prefix='/api')

@mod.route('/')
def index():
    return jsonify(message = "Welcome to the API")
#
# @mod.route('/<resource>/', methods=['GET'])
# def getObject(resource):
#     switcher = {
#         "meals": getMeals,
#         "users": getUsers
#     }
#     if resource not in switcher:
#         return make_response(jsonify({'error': 'Object not found'}), 404)
#     entities = switcher[resource]()
#
#     if(entities is None):
#         return make_response(jsonify({'error': 'Object not found'}), 404)
#
#     response = []
#     for e in entities:
#         response.append(e.serialize())
#
#     return Response(json.dumps(response), mimetype='application/json')
#
# @mod.route('/<resource>/<id>/', methods=['GET'])
# def getEntity(resource,id):
#     switcher = {
#         "meals": getMeal,
#         "users": getUser
#     }
#     if resource not in switcher:
#         return make_response(jsonify({'error': 'Object not found'}), 404)
#     entity = switcher[resource](id)
#
#     if(entity is None):
#         return make_response(jsonify({'error': 'Object not found'}), 404)
#
#     return Response(json.dumps(entity.serialize()), mimetype='application/json')
#
#
#
# def getMeals():
#     from app.api.models.meal import Meal
#     return getModels(Meal)
#
# def getUsers():
#     from app.api.models.user import User
#     return getModels(User)
#
# def getMeal(id):
#     from app.api.models.meal import Meal
#     return getModel(Meal,id)
#
# def getUser(id):
#     from app.api.models.user import User
#     return getModel(User,id)
#
# def getModels(model):
#     models = []
#     for m in model.query.all():
#         models.append(m)
#
#     return models
#
# def getModel(model, id):
#     return db.session.query(model).get(id)
