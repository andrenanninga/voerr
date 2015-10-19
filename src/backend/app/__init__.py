from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__, static_url_path='/static', static_folder='../../frontend/build')
app.config.from_object('config')

db = SQLAlchemy(app)

from app import main

from app.api.views import mod as apiModule
app.register_blueprint(apiModule)

# from app.api.views.user import mod as userModule
# app.register_blueprint(userModule)
