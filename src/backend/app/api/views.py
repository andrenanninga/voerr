from flask import request, jsonify, Blueprint, make_response

mod = Blueprint('api', __name__, url_prefix='/api')

@mod.route('/')
def index():
	return jsonify(message = "Welcome to the API")

@mod.route('/<object>/', methods=['GET'])
def getObject(object):
	switcher = {
		"meals": getMeal(),
		"users": getUser()
	}
	return switcher.get(object, make_response(jsonify({'error': 'Object not found'}), 404))
	# return jsonify(object= object)

@mod.route('/<object>/<id>/', methods=['GET'])
def getEntity(object,id):
	switcher = {
		"meals": getMeals(id),
		"users": getUsers(id)
	}
	return switcher.get(object, make_response(jsonify({'error': 'Object not found'}), 404))


def getMeal():
	return jsonify(object = "meal")

def getUser():
	return jsonify(object = "user")

def getMeals(id):
	return jsonify(object = "meal", id = id)

def getUsers(id):
	return jsonify(object = "user", id = id)
