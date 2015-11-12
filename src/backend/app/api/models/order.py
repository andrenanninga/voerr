import datetime
import flask

from app import db

from app.api.models.meal import Meal

from sqlalchemy.orm import validates
from flask.ext.login import current_user
from flask.ext.restless import ProcessingException
from app.api.validators.number import NumberValidator

from app.api.models.user import User


class Order(db.Model):
    __tablename__ = 'order'

    id = db.Column('id', db.Integer, primary_key=True)
    amount_meals = db.Column('amount_meals', db.Integer)
    start_time = db.Column('start_time', db.DateTime)
    is_takeout = db.Column('is_takeout', db.Boolean)
    total_amount = db.Column('total_amount', db.Integer)
    meal_id = db.Column('meal_id', db.Integer)
    user_id = db.Column('user_id', db.Integer)
    date_created = db.Column('date_created', db.DateTime, default=datetime.datetime.now)
    date_updated = db.Column('date_updated', db.DateTime, onupdate=datetime.datetime.now)

    def __init__(self, amount_meals=None, start_time=None, is_takeout=None, total_amount=None, meal_id=None, user_id=None):
        self.amount_meals = amount_meals
        self.start_time = start_time
        self.is_takeout = is_takeout
        self.total_amount = total_amount
        self.meal_id = meal_id
        self.user_id = user_id

    def __repr__(self):
        return '<Order %r>' % self.total_amount

    def getExclude():
        return []

    @validates('amount_meals')
    def validate_amount_meals(self, key, amount_meals):
        if not NumberValidator.is_int(amount_meals) or amount_meals < 1:
            from app.api.errors.errors import Error
            raise Error(name='amount_meals', message='Geen juiste waarde, aantal moet groter dan of gelijk zijn aan 1')
        return amount_meals

    @staticmethod
    def post_single_preprocessor(data=None, **kw):
        getMeal = Meal.query.get(data['meal_id'])
        if getMeal is None:
            raise ProcessingException(
                description='Meal does not exist',
                code=400
            )

        if current_user.credit < (data['amount_meals'] * getMeal.price):
            raise ProcessingException(
                description='Je hebt niet genoeg geld in je portemonnee!',
                code=400
            )

        if data['amount_meals'] > (getMeal.portions - getMeal.portions_claimed):
            raise ProcessingException(
                description='Er zijn niet genoeg maaltijden om aan je te reserveren',
                code=400
            )

        data['total_amount'] = getMeal.price * data['amount_meals']
        data['user_id'] = current_user.id

        return data

    @staticmethod
    def post_single_postprocessor(result=None, **kw):
        getMeal = Meal.query.get(result['meal_id'])
        getMeal.portions_claimed += result['amount_meals']

        getUser = User.query.get(current_user.id)
        getUser.credit -= result['total_amount']

        db.session.commit()

        return result
