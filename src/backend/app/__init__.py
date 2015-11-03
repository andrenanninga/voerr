from pprint import pprint
import flask
import flask.ext.sqlalchemy
import flask.ext.restless
from flask import Flask, session
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.restless import ProcessingException
from flask.ext.login import LoginManager, current_user
from app.api.errors.errors import Error

app = Flask(__name__, static_url_path='/static', static_folder='../../frontend/build')
app.config.from_object('config')

db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)

# Create the Flask-Restless API manager.
api_manager = flask.ext.restless.APIManager(app, flask_sqlalchemy_db=db)

def check_auth(instance_id=None, **kw):
    if not current_user.is_authenticated:
        raise ProcessingException(description='Not Authorized 2', code=401)


def post_review_preprocessor(data=None, **kw):
    """Accepts a single argument, `data`, which is the dictionary of
    fields to set on the new instance of the model.

    """
    pass

from app.api.models.user import User
api_manager.create_api(User,
                   url_prefix='/api/v1',
                   collection_name='users',
                   methods=['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
                   exclude_columns=User.getExclude(),
                   validation_exceptions=[Error]
                   )

from app.api.models.review import Review
api_manager.create_api(Review,
                   url_prefix='/api/v1',
                   collection_name='reviews',
                   methods=['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
                   exclude_columns=Review.getExclude(),
                   validation_exceptions=[Error],
                   preprocessors={
                       'POST': [check_auth, post_review_preprocessor]
                   })

from app.api.models.dish import Dish
api_manager.create_api(Dish,
                   url_prefix='/api/v1',
                   collection_name='dishes',
                   methods=['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
                   exclude_columns=Dish.getExclude(),
                   validation_exceptions=[Error])

from app import main

from app.api.views.login import mod as loginModule
app.register_blueprint(loginModule)


