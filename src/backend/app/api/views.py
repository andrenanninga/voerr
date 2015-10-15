from flask import Response, request, jsonify, json, Blueprint, make_response

mod = Blueprint('api', __name__, url_prefix='/api')

@mod.route('/')
def index():
	return jsonify(message = "Welcome to the API")

@mod.route('/<object>/', methods=['GET'])
def getObject(object):
	switcher = {
		"meals": getMeals(),
		"users": getUsers()
	}
	return switcher.get(object, make_response(jsonify({'error': 'Object not found'}), 404))
	# return jsonify(object= object)

@mod.route('/<object>/<id>/', methods=['GET'])
def getEntity(object,id):
	switcher = {
		"meals": getMeal(id),
		"users": getUser(id)
	}
	return switcher.get(object, make_response(jsonify({'error': 'Object not found'}), 404))


def getMeals():
	return jsonify(object = "meal")

def getUsers():
	from app.api.models.user import User
	users = []
	for user in User.query.all():
		users.append(user.serialize())

	return Response(json.dumps(users), mimetype='application/json')

def getMeal(id):
	return jsonify(object = "meal", id = id)

def getUser(id):
	return jsonify(object = "user", id = id)
