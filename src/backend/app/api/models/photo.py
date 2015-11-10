import os, random, datetime, base64, string
from app import app, db
from flask import json

from sqlalchemy.orm import validates

from app.api.errors.errors import Error

foreign_ids = {}

class Photo(db.Model):
    __tablename__ = 'photo'

    id = db.Column('id', db.Integer, primary_key=True)
    name = db.Column('name', db.String(127))
    dish_id = db.Column('dish_id', db.Integer)
    user_id = db.Column('user_id', db.Integer)
    cook_id = db.Column('cook_id', db.Integer)
    date_created = db.Column('date_created', db.DateTime, default=datetime.datetime.now)
    date_updated = db.Column('date_updated', db.DateTime, onupdate=datetime.datetime.now)

    def __init__(self, name=None, dish_id=None, user_id=None, cook_id=None):
        self.name = name
        self.dish_id = dish_id
        self.user_id = user_id
        self.cook_id = cook_id

    def __repr__(self):
        return '<Photo %r>' % (self.name)

    def getExclude():
        return []

    @validates('user_id', 'cook_id', 'dish_id')
    def validate_relation_id(self, key, value):
        # save current key/value in foreign_ids
        foreign_ids[key] = value

        # when all foreign keys are assembled we can do our checks
        if len(foreign_ids) is 3:
            # filter foreign_ids to only those with a set value
            filtered_ids = {k: v for k, v in foreign_ids.items() if v != None }

            # raise an error if there is not atleast 1 foreign key
            if len(filtered_ids) <= 0:
                raise Error(name='foreign_id', 
                            message='You need to set one of user_id, cook_id or dish_id')

    @staticmethod
    def post_single_preprocessor(data):

        # create image directory if it doesn't exists
        if not os.path.exists(app.config['IMAGES_DIR']):
            os.makedirs(app.config['IMAGES_DIR'])

        # create a random prefix to the photo to prevent collisions
        rand = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(6))
        data['name'] = rand + '_' + data['name']

        # save base64 image to disk
        image = open(app.config['IMAGES_DIR'] + '/' + data['name'], 'wb')
        image.write(base64.b64decode(data['base64'].encode('ascii')))
        image.close()

        # remove base64 data before saving to db
        del data['base64']

        return data


