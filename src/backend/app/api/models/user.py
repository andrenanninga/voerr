import datetime
import flask

from flask.ext.login import current_user
from flask.ext.restless import ProcessingException

from sqlalchemy.orm import validates

from app import db, login_manager
from app.api.errors.errors import Error
from app.api.validators.number import NumberValidator


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column('id', db.Integer, primary_key=True)
    name = db.Column('name', db.String(127))
    email = db.Column('email', db.String(127), unique=True)
    password = db.Column('password', db.String(127))
    date_created = db.Column('date_created', db.DateTime, default=datetime.datetime.now)
    date_updated = db.Column('date_updated', db.DateTime, onupdate=datetime.datetime.now)
    cook = db.relationship('Cook', uselist=False, backref='user')

    def __init__(self, name=None, email=None, password=None):
        self.name = name
        self.email = email
        self.password = password

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.id)

    def __repr__(self):
        return '<User %r>' % (self.name)

    def getExclude():
        return ['password']

    def is_cook(self):
        return self.cook is not None

    @staticmethod
    def post_single_preprocessor(data=None, **kw):
        getUser = User.query.filter(User.email == data['email']).first()
        if getUser is not None:
            raise ProcessingException(
                description='Email address already exists: %r' % getUser.email,
                code=400
            )
        # todo password validator

        return data

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))
