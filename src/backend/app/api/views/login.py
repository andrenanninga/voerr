from pprint import pprint
from flask import request, Blueprint, jsonify, make_response, session, redirect
from flask.ext.login import current_user, login_user, logout_user
from flask.ext.restless.helpers import to_dict
from app.api.errors.errors import Error
import json

from app.api.models.user import User
from app.api.validators.hash import HashValidator

mod = Blueprint('login', __name__, url_prefix='/api/v1/login')


@mod.route('', methods=['POST'])
def login():
    try:
        if current_user.is_authenticated:
            user = User.query.filter(User.id == current_user.id).first()
            return make_response(jsonify(to_dict(user, exclude=User.getExclude())))

        form_data = json.loads(request.get_data().decode('utf-8'))

        if ('email' in form_data) and ('password' in form_data):
            user = User.query.filter(User.email == form_data['email'], User.password == HashValidator.hash(form_data['password'])).first()
            if user is None:
                raise Error(name='Failed login', message='Unknown email/password combination')

            login_user(user)

            return make_response(jsonify(to_dict(user, exclude=User.getExclude())))

        else:
            raise Error(name='Failed login', message='Could not log in, email or password not given')
    except Error as e:
        return make_response(jsonify({e.name: e.message}), 400)


@mod.route('/logout', methods=['POST'])
def logout():
    try:
        if not current_user.is_authenticated:
            raise Error(name='Could not log out', message='Not logged in to log out')

        logout_user()
        return make_response("", 204)
    except Error as e:
        return make_response(jsonify({e.name: e.message}), 400)


@mod.route('/current_user', methods=['GET'])
def current():
    if current_user.is_authenticated:
        user = User.query.filter(User.id == current_user.id).first()
        return make_response(jsonify(to_dict(user, exclude=User.getExclude())))
    else:
        return make_response(jsonify([]))