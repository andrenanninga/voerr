from pprint import pprint
from flask import request, Blueprint, jsonify, make_response, session
from flask.ext.login import current_user, login_user, logout_user
from app.api.errors.errors import Error
import json

from app.api.models.user import User

mod = Blueprint('login', __name__, url_prefix='/api/v1/login')

@mod.route('', methods=['POST'])
def login():
    try:
        form_data = json.loads(request.get_data().decode('utf-8'))

        if ('email' in form_data) and ('password' in form_data):
            user = User.query.filter(User.email == form_data['email'], User.password == form_data['password']).first()
            if user is None:
                raise Error(name='Failed login', message='Unknown email/password combination')

            login_user(user)

            # session['hello'] = 'hoi'

            return make_response(current_user.email)

        else:
            raise Error(name='Failed login', message='Could not log in, email or password not given')
    except Error as e:
        return make_response(jsonify({e.name: e.message}), 400)

@mod.route('/logout', methods=['POST'])
def logout():
    logout_user()
    return make_response("", 204)
