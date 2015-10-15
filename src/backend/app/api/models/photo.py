from app import db
import datetime

class Photo(db.Model):
    __tablename__ = 'photo'

    id = db.Column('id', db.Integer, primary_key=True)
    name = db.Column('name', db.String(127))
    dish_id = db.Column('dish_id', db.Integer)
    user_id = db.Column('user_id', db.Integer)
    cook_id = db.Column('cook_id', db.Integer)
    data_created = db.Column('date_created', db.DateTime, default=datetime.datetime.now)
    data_updated = db.Column('date_updated', db.DateTime, onupdate=datetime.datetime.now)

    def __init__(self, name=None, dish_id=None, user_id=None, cook_id=None):
        self.name = name
        self.dish_id = dish_id
        self.user_id = user_id
        self.cook_id = cook_id

    def __repr__(self):
        return '<Photo %r>' % (self.name)