from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__, static_url_path='/static', static_folder='../../frontend/build')
app.config.from_object('config')

db = SQLAlchemy(app)

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


