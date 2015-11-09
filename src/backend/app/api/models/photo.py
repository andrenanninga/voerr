from flask import json

from app import db
import datetime
import base64




class Photo(db.Model):
    __tablename__ = 'photo'

    id = db.Column('id', db.Integer, primary_key=True)
    name = db.Column('name', db.String(127))
    dish_id = db.Column('dish_id', db.Integer)
    user_id = db.Column('user_id', db.Integer)
    cook_id = db.Column('cook_id', db.Integer)
    date_created = db.Column('date_created', db.DateTime, default=datetime.datetime.now)
    date_updated = db.Column('date_updated', db.DateTime, onupdate=datetime.datetime.now)
    base64 = db.Column('base64', db.String(127))

    def __init__(self, name=None, dish_id=None, user_id=None, cook_id=None, base64=None):
        self.name = name
        self.dish_id = dish_id
        self.user_id = user_id
        self.cook_id = cook_id
        self.base64 = base64

    def __repr__(self):
        return '<Photo %r>' % (self.name)

    def getExclude():
        return []

    @staticmethod
    def post_single_preprocessor(data=None, **kw):
        # Convert base64 to image
        image = open("image.png", "wb")
        image.write(base64.encodebytes(data['base64'].encode()))
        image.close()

        del data['base64']

        return data


