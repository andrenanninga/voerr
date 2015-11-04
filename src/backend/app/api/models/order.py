from app import db
import datetime

class Order(db.Model):
    __tablename__ = 'order'

    id = db.Column('id', db.Integer, primary_key=True)
    amount_meals = db.Column('amount_meals', db.Integer)
    start_time= db.Column('start_time', db.DateTime)
    is_takeout = db.Column('is_takeout', db.Boolean)
    total_amount = db.Column('total_amount', db.Integer)
    meal_id = db.Column('meal_id', db.Integer)
    user_id = db.Column('user_id', db.Integer)
    data_created = db.Column('date_created', db.DateTime, default=datetime.datetime.now)
    data_updated = db.Column('date_updated', db.DateTime, onupdate=datetime.datetime.now)

    def __init__(self, amount_meals=None, start_time=None, is_takeout=None, total_amount=None, meal_id=None, user_id=None):
        self.amount_meals = amount_meals
        self.start_time = start_time
        self.is_takeout = is_takeout
        self.total_amount = total_amount
        self.meal_id = meal_id
        self.user_id = user_id

    def __repr__(self):
        return '<Order %r>' % (self.total_amount)

    def getExclude():
        return []

    @staticmethod
    def post_single_preprocessor(data=None, **kw):
        # todo stuff

        return data