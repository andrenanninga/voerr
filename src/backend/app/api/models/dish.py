from app import db
import datetime

class Dish(db.Model):
    __tablename__ = 'dish'

    id = db.Column('id', db.Integer, primary_key=True)
    name = db.Column('name', db.String(127))
    description = db.Column('description', db.String(255))
    cook_id = db.Column('cook_id', db.Integer)
    data_created = db.Column('date_created', db.DateTime, default=datetime.datetime.now)
    data_updated = db.Column('date_updated', db.DateTime, onupdate=datetime.datetime.now)

    def __init__(self, name=None, description=None, cook_id=None):
        self.name = name
        self.description = description
        self.cook_id = cook_id

    def __repr__(self):
        return '<Dish %r>' % (self.name)