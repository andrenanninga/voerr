from django.contrib.sites import requests
from flask import Response, json, Blueprint
from app.api.models.user import User

mod = Blueprint('user', __name__, url_prefix='/api/user')

@mod.route('/<id>', methods=['GET'])
def getUser(id):
    try:
        user = User.query.get(id)

        return Response(json.dumps(user.serialize()), mimetype='application/json')

    except Exception as e:
        return json.dumps({'error': str(e)})


@mod.route('/<id>/email', methods=['GET'])
def getUserEmail(id):
    try:
        user = User.query.get(id)
        response = {
            'email': user.email
        }

        return Response(json.dumps(response), mimetype='application/json')

    except Exception as e:
        return json.dumps({'error': str(e)})


