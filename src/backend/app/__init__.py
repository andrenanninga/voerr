from pprint import pprint
import flask
import flask.ext.sqlalchemy
import flask.ext.restless
from flask import Flask, session
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.restless import ProcessingException
gfrom app.api.errors.errors import Error

app = Flask(__name__, static_url_path='/static', static_folder='../../frontend/build')
app.config.from_object('config')

db = SQLAlchemy(app)


# Create the Flask-Restless API manager.
manager = flask.ext.restless.APIManager(app, flask_sqlalchemy_db=db)

from app.api.models.user import User
from app.api.models.review import Review
from app.api.models.dish import Dish

manager.create_api(User,
                   url_prefix='/api/v1',
                   collection_name='users',
                   methods=['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
                   exclude_columns=User.getExclude(),
                   validation_exceptions=[Error]
                   )


def check_auth(instance_id=None, **kw):
    pprint(session)
    if session.get('user'):
        if session['user']['is-logged-in']:
            pass
        else:
            raise ProcessingException(description='Not Authorized 1', code=401)
    else:
        raise ProcessingException(description='Not Authorized 2', code=401)


def post_review_preprocessor(data=None, **kw):
    """Accepts a single argument, `data`, which is the dictionary of
    fields to set on the new instance of the model.

    """
    pass

manager.create_api(Review,
                   url_prefix='/api/v1',
                   collection_name='reviews',
                   methods=['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
                   exclude_columns=Review.getExclude(),
                   validation_exceptions=[Error],
                   preprocessors={
                       'POST': [check_auth, post_review_preprocessor]
                   })

manager.create_api(Dish,
                   url_prefix='/api/v1',
                   collection_name='dishes',
                   methods=['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
                   exclude_columns=Dish.getExclude(),
                   validation_exceptions=[Error])

# from app.api.models.allergy import Allergy
# manager.create_api(Allergy, methods=['GET', 'POST', 'DELETE'])

# from app.api.models.category import Category
# manager.create_api(Category, methods=['GET', 'POST', 'DELETE'])

# from app.api.models.cook import Cook
# manager.create_api(Cook, methods=['GET', 'POST', 'DELETE'])

# from app.api.models.dish import Dish
# manager.create_api(Dish, methods=['GET', 'POST', 'DELETE'])

from app import main

from app.api.mod import mod as apiModule
app.register_blueprint(apiModule)

from app.api.views.user import mod as userModule
app.register_blueprint(userModule)

from app.api.views.allergy import mod as allergyModule
app.register_blueprint(allergyModule)

from app.api.views.category import mod as categoryModule
app.register_blueprint(categoryModule)

from app.api.views.cook import mod as cookModule
app.register_blueprint(cookModule)

from app.api.views.dish import mod as dishModule
app.register_blueprint(dishModule)

from app.api.views.meal import mod as mealModule
app.register_blueprint(mealModule)

from app.api.views.order import mod as orderModule
app.register_blueprint(orderModule)

from app.api.views.photo import mod as photoModule
app.register_blueprint(photoModule)

from app.api.views.review import mod as reviewModule
app.register_blueprint(reviewModule)

from app.api.views.login import mod as loginModule
app.register_blueprint(loginModule)


