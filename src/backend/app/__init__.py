from pprint import pprint
import flask
import flask.ext.sqlalchemy
import flask.ext.restless
from flask import Flask, session, request
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.restless import ProcessingException
from flask.ext.login import LoginManager, current_user
from app.api.errors.errors import Error

app = Flask(__name__, static_url_path='/static', static_folder='../../../build')
app.config.from_object('config')

db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)

# Create the Flask-Restless API manager.
api_manager = flask.ext.restless.APIManager(app, flask_sqlalchemy_db=db)


def check_auth(instance_id=None, **kw):
    if not current_user.is_authenticated:
        raise ProcessingException(description='Je moet ingelogd om dit te doen', code=401)


from app.api.models.allergy import Allergy
from app.api.models.category import Category
from app.api.models.cook import Cook
from app.api.models.dish import Dish
from app.api.models.meal import Meal
from app.api.models.order import Order
from app.api.models.photo import Photo
from app.api.models.review import Review
from app.api.models.transaction_log import TransactionLog
from app.api.models.user import User

api_manager.create_api(Allergy,
                       url_prefix='/api/v1',
                       collection_name='allergies',
                       methods=['GET'],
                       exclude_columns=Allergy.getExclude(),
                       validation_exceptions=[Error, ProcessingException]
                       )

api_manager.create_api(Category,
                       url_prefix='/api/v1',
                       collection_name='categories',
                       methods=['GET'],
                       exclude_columns=Category.getExclude(),
                       validation_exceptions=[Error, ProcessingException]
                       )

api_manager.create_api(Cook,
                       url_prefix='/api/v1',
                       collection_name='cooks',
                       methods=['GET'],
                       exclude_columns=Cook.getExclude(),
                       validation_exceptions=[Error, ProcessingException]
                       )

api_manager.create_api(Dish,
                       url_prefix='/api/v1',
                       collection_name='dishes',
                       methods=['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
                       exclude_columns=Dish.getExclude(),
                       validation_exceptions=[Error, ProcessingException],
                       preprocessors={
                           'POST': [check_auth, Dish.post_single_preprocessor],
                           'PATCH_SINGLE': [check_auth, Dish.patch_single_preprocessor]
                       })

api_manager.create_api(Meal,
                       url_prefix='/api/v1',
                       collection_name='meals',
                       methods=['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
                       exclude_columns=Meal.getExclude(),
                       validation_exceptions=[Error, ProcessingException],
                       preprocessors={
                           'POST': [check_auth, Meal.post_single_preprocessor]
                       })

api_manager.create_api(Order,
                       url_prefix='/api/v1',
                       collection_name='orders',
                       methods=['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
                       exclude_columns=Order.getExclude(),
                       validation_exceptions=[Error, ProcessingException],
                       preprocessors={
                           'POST': [check_auth, Order.post_single_preprocessor]
                       },
                       postprocessors={
                           'POST': [Order.post_single_postprocessor]
                       })

api_manager.create_api(Photo,
                       url_prefix='/api/v1',
                       collection_name='photos',
                       methods=['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
                       exclude_columns=Photo.getExclude(),
                       validation_exceptions=[Error, ProcessingException],
                       preprocessors={
                           'POST': [Photo.post_single_preprocessor]
                       },
                       postprocessors={
                           'GET_SINGLE': [Photo.pre_single_postprocessor],
                           'GET_MANY': [Photo.pre_many_postprocessor]
                       })

api_manager.create_api(Review,
                       url_prefix='/api/v1',
                       collection_name='reviews',
                       methods=['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
                       exclude_columns=Review.getExclude(),
                       validation_exceptions=[Error, ProcessingException],
                       preprocessors={
                           'POST': [check_auth, Review.post_single_preprocessor]
                       })

api_manager.create_api(TransactionLog,
                       url_prefix='/api/v1',
                       collection_name='transactionlogs',
                       methods=['GET'],
                       exclude_columns=TransactionLog.getExclude(),
                       validation_exceptions=[Error, ProcessingException]
                       )

api_manager.create_api(User,
                       url_prefix='/api/v1',
                       collection_name='users',
                       methods=['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
                       exclude_columns=User.getExclude(),
                       validation_exceptions=[Error, ProcessingException],
                       preprocessors={
                           'GET_SINGLE': [User.get_single_preprocessor],
                           'POST': [User.post_single_preprocessor],
                           'PATCH_SINGLE': [User.patch_single_preprocessor]
                       })

from app import main
from app.api.views.login import mod as loginModule
from app.api.views.search import mod as searchModule

app.register_blueprint(loginModule)
app.register_blueprint(searchModule)
