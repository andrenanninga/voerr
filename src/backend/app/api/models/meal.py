from sqlalchemy.orm import validates
from flask.ext.login import current_user

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

    def __init__(self, price=None, available_from=None, available_until=None, dinner_time=None, portions=None, portions_claimed=None, location=None, notes=None, is_takeout=None, dish_id=None):
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
        if not NumberValidator.is_double(price):
            raise Error(name='price', message='Not a valid price(int, float)')
        return price

    @validates('available_from')
    def validate_available_from(self, key, available_from):
        if available_from < datetime.datetime.utcnow():
            raise Error(name='available_from', message='The date is in the past')
        return available_from

    @validates('portions')
    def validate_portions(self, key, portions):
        if not NumberValidator.is_int(portions):
            raise Error(name='portions', message='Not a valid number for portions')
        if portions < 1:
            raise Error(name='portions', message='The number portions cannot be 0.')
        return portions

    @validates('portions_claimed', 'portions')
    def validate_portions_claimed(self, key, portions_claimed):
        print(portions_claimed)
        print(self.portions)
        if portions_claimed > self.portions:
            raise Error(name='portions_claimed', message='The number of portions_claimed is higher than the portions.')
        return portions_claimed

    @validates('is_takeout')
    def validate_is_takeout(self, key, is_takeout):
        print(type(is_takeout))
        if not bool(is_takeout):
            raise Error(name='is_takeout', message='Not a boolean for is_takeout.')
        return is_takeout


