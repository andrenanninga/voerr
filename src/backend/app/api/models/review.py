from app import db
from flask import Response, json

from sqlalchemy.orm import validates
from app.api.errors.errors import Error
from app.api.validators.number import NumberValidator
from app.api.models.user import User
from app.api.models.dish import Dish

import datetime


# from app.api.validators.models import dish_exists

class Review(db.Model):
    __tablename__ = 'review'

    id = db.Column('id', db.Integer, primary_key=True)
    content = db.Column('content', db.String(255))
    rating = db.Column('rating', db.Integer)
    user_id = db.Column('user_id', db.Integer)
    dish_id = db.Column('dish_id', db.Integer)
    data_created = db.Column('date_created', db.DateTime, default=datetime.datetime.now)
    data_updated = db.Column('date_updated', db.DateTime, onupdate=datetime.datetime.now)

    def __init__(self, content=None, rating=None, user_id=None, dish_id=None):
        self.content = content
        self.rating = rating
        self.user_id = user_id
        self.dish_id = dish_id

    def __repr__(self):
        return '<Review %r>' % self.name

    @validates('rating')
    def validate_rating(self, key, rating):
        if not NumberValidator.between(1, 5, rating):
            print("ok")
            raise Error(name='rating', message='Number must be between 1 and 5')
        return rating

    @validates('user_id')
    def validate_user_id(self, key, user_id):
        if not NumberValidator.is_int(user_id):
            raise Error(name='user_id', message='Not a valid user id')

        if User.query.get(user_id) is None:
            raise Error(name='user_id', message='Could not find user with user id %r' % user_id)

        return user_id

    @validates('dish_id')
    def validate_user_id(self, key, dish_id):
        if not NumberValidator.is_int(dish_id):
            raise Error(name='dish_id', message='Not a valid dish id')

        if Dish.query.get(dish_id) is None:
            raise Error(name='dish_id', message='Could not find dish with dish id %r' % dish_id)

        return dish_id

    # @validates('user_id', 'dish_id')
    # def validate_content(self, key, field):
    #     raise Error(name='tyfus', message=self)
    #     if db.session.query(Review).filter(Review.user_id == self.user_id, Review.dish_id == self.dish_id):
    #         raise Error(name='review', message='User id %r has already written a review for dish id %r' % (self.user_id, self.dish_id))
    #
    #     return field

    def getExclude():
        return [
        ]
