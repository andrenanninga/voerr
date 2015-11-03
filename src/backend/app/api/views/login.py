from pprint import pprint
from flask import request, Blueprint, jsonify, make_response, session
from app.api.errors.errors import Error
import json

from app.api.models.user import User

mod = Blueprint('login', __name__, url_prefix='/api')


@mod.route('/login', methods=['POST'])
def login():

    try:
        j = json.loads(request.get_data().decode('utf-8'))

        if ('email' in j) and ('password' in j):
            e = j['email']
            p = j['password']

            result = User.query.filter(User.email == e, User.password == p).scalar()
            if result is None:
                raise Error(name='Failed login', message='Could not log in with %r and %r' % (e, p))
            else:
                session['is-logged-in'] = True
                session['is-guest'] = False
                session['user'] = {
                    'id': result.id,
                    'name': result.name,
                    'email': result.email
                }
                pprint(session)

                return make_response(jsonify(session['user']))

        else:
            raise Error(name='Failed login', message='Could not log in, email or password not given')
    except Error as e:
        return make_response(jsonify({e.name: e.message}), 400)

    return 'Done'


