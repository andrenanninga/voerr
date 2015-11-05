from sqlalchemy.orm import validates

from app import db
import datetime

from app.api.errors.errors import Error
from app.api.validators.number import NumberValidator


class Meal(db.Model):
    __tablename__ = 'meal'

    id = db.Column('id', db.Integer, primary_key=True)
    price = db.Column('price', db.Integer)
    available_from = db.Column('available_from', db.DateTime)
    available_until = db.Column('available_until', db.DateTime)
    dinner_time = db.Column('dinner_time', db.DateTime)
    portions = db.Column('portions', db.Integer)
    portions_claimed = db.Column('portions_claimed', db.Integer)
    location = db.Column('location', db.String(255))
    notes = db.Column('notes', db.String(255))
    is_takeout = db.Column('is_takeout', db.Boolean)
    dish_id = db.Column('dish_id', db.Integer)
    data_created = db.Column('date_created', db.DateTime, default=datetime.datetime.now)
    data_updated = db.Column('date_updated', db.DateTime, onupdate=datetime.datetime.now)

    def __init__(self, price=None, available_from=None, available_until=None, dinner_time=None, portions=None, portals_claimed=None, location=None, notes=None, is_takeout=None, dish_id=None):
        self.price = price
        self.available_from = available_from
        self.available_until = available_until
        self.dinner_time = dinner_time
        self.portions = portions
        self.portions_claimed = portions_claimed
        self.location = location
        self.notes = notes
        self.is_takeout = is_takeout
        self.dish_id = dish_id 

    def __repr__(self):
        return '<Meal %r>' % (self.price)

    def getExclude():
        return []

    @staticmethod
    def post_single_preprocessor(data=None, **kw):
        # todo stuff

        return data

    def serialize(self, related = True):
        mealDict = {
            'price' : self.price,
            'available_from' : self.available_from,
            'available_until' : self.available_until,
            'dinner_time' : self.dinner_time,
            'portions' : self.portions,
            'portions_claimed' : self.portions_claimed,
            'location' : self.location,
            'notes' : self.notes,
            'is_takeout' : self.is_takeout,
            'dish_id' : self.dish_id
        }

        return mealDict

    @validates('price')
    def validate_price(self, key, price):
        if not NumberValidator.is_int(price):
            raise Error(name='price', message='Not a valid price')
        return price

    @validates('available_from')
    def validate_available_from(self, key, available_from):
        if available_from < datetime.now():
            raise Error(name='available_from', message='The date is in the past')

        return available_from
    #
    # @validates('rating')
    # def validate_rating(self, key, rating):
    #     if not NumberValidator.between(1, 5, rating):
    #         raise Error(name='rating', message='Number must be between 1 and 5')
    #     return rating
    #
    # @validates('content')
    # def validate_content(self, key, content):
    #     if len(content) < 10:
    #         raise Error(name='content', message='Review must be longer than or equal to 10 characters')
    #     return content
    #
    # @staticmethod
    # def post_single_preprocessor(data=None, **kw):
    #     getReview = Review.query.filter(Review.user_id == current_user.id, Review.dish_id == data['dish_id']).first()
    #     if getReview is not None:
    #         raise ProcessingException(
    #             description='A review was already found for this user and dish: Review with ID %r' % getReview.id,
    #             code=400
    #         )
    #
    #     data['user_id'] = current_user.id
    #     return data
    #
