import datetime
import flask

from flask.ext.login import current_user
from flask.ext.restless import ProcessingException
from sqlalchemy.ext.hybrid import hybrid_property

from sqlalchemy.orm import validates

from app import db
from app.api.errors.errors import Error
from app.api.validators.number import NumberValidator
from app.api.models.user import User
from app.api.models.dish import Dish

class Review(db.Model):
    __tablename__ = 'review'

    id = db.Column('id', db.Integer, primary_key=True)
    user_id = db.Column('user_id', db.Integer, db.ForeignKey('user.id'))
    dish_id = db.Column('dish_id', db.Integer, db.ForeignKey('dish.id'))
    content = db.Column('content', db.String(255))
    rating = db.Column('rating', db.Integer)
    date_created = db.Column('date_created', db.DateTime, default=datetime.datetime.now)
    date_updated = db.Column('date_updated', db.DateTime, onupdate=datetime.datetime.now)
    user = db.relationship('User', backref='reviews')
    dish = db.relationship('Dish', backref='reviews')

    def __init__(self, content=None, rating=None, user_id=None, dish_id=None):
        self.content = content
        self.rating = rating
        self.user_id = user_id
        self.dish_id = dish_id

    def __repr__(self):
        return '<Review %r>' % self.name

    def getExclude():
        return []

    @validates('user_id')
    def validate_user_id(self, key, user_id):
        if not NumberValidator.is_int(user_id):
            raise Error(name='user_id', message='Not a valid user id')
        if User.query.get(user_id) is None:
            raise Error(name='user_id', message='Could not find user with user id %r' % user_id)

        return user_id

    @validates('dish_id')
    def validate_dish_id(self, key, dish_id):
        if not NumberValidator.is_int(dish_id):
            raise Error(name='dish_id', message='Not a valid dish id')
        if Dish.query.get(dish_id) is None:
            raise Error(name='dish_id', message='Could not find dish with dish id %r' % dish_id)

        return dish_id

    @validates('rating')
    def validate_rating(self, key, rating):
        if not NumberValidator.between(1, 5, rating):
            raise Error(name='rating', message='Number must be between 1 and 5')
        return rating

    @validates('content')
    def validate_content(self, key, content):
        if len(content) < 10:
            raise Error(name='content', message='Beoordeling  must be longer than or equal to 10 characters')
        return content

    @staticmethod
    def post_single_preprocessor(data=None, **kw):
        getReview = Review.query.filter(Review.user_id == current_user.id, Review.dish_id == data['dish_id']).first()
        if getReview is not None:
            raise ProcessingException(
                description='Er is al een review gevonden voor deze gebruiker: Review met ID %r' % getReview.id,
                code=400
            )

        data['user_id'] = current_user.id
        return data
