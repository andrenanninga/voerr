from wtforms.validators import DataRequired, length, Length, NumberRange
from app import db
from sqlalchemy.orm import validates
from app.api.errors.NumberError import NumberError

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
        return '<Review %r>' % (self.name)

    @validates('rating')
    def validate_rating(self, key, rating):
        if (not type(rating) is int) or (rating <= 1 or rating >= 5):
            exception = NumberError(name='Rating', min=1, max=5)
            raise exception

        return rating

    def getExclude():
        return [
        ]
