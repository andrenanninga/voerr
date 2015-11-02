from flask import render_template, request, Blueprint, jsonify, make_response
from app.api.errors.errors import Error
import json

from app.api.models.user import User

mod = Blueprint('login', __name__, url_prefix='/api')


@mod.route('/login', methods=['POST'])
def login():

    try:
        j = json.loads(request.data.decode('utf-8'))

        if ('email' in j) and ('password' in j):
            e = j['email']
            p = j['password']

            result = User.query.filter(User.email == e, User.password == p).scalar()
            if result is None:
                raise Error(name='Failed login', message='Could not log in with %r and %r' % (e, p))
            else:
                return make_response('', 200)
        else:
            raise Error(name='Failed login', message='Could not log in, email or password not given')
    except (ValueError, KeyError, TypeError):
        return make_response('Could not log in', 400)
    except Error as e:
        return make_response(jsonify({e.name: e.message}), 400)

    return 'Done'


