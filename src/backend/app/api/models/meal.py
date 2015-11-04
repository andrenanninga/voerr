from app import db
import datetime

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