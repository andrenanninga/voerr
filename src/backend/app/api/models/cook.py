from app import db
from sqlalchemy.ext.hybrid import hybrid_property
from app.api.models.user import User
from app.api.models.photo import Photo

import datetime

class Cook(db.Model):
    __tablename__ = 'cook'

    id = db.Column('id', db.Integer, primary_key=True)
    description = db.Column('description', db.String(255))
    location = db.Column('location', db.String(255))
    # coordinates = db.Column('coordinates', db.String(63))
    user_id = db.Column('user_id', db.Integer, db.ForeignKey('user.id'))
    date_created = db.Column('date_created', db.DateTime, default=datetime.datetime.now)
    date_updated = db.Column('date_updated', db.DateTime, onupdate=datetime.datetime.now)
    dishes = db.relationship('Dish', backref='cook')

    def __init__(self, description=None, location=None, coordinates=None, user_id=None):
        self.description = description
        self.location = location
        # self.coordinates = coordinates
        self.user_id = user_id

    def __repr__(self):
        return '<Cook %r>' % (self.description)

    def getExclude():
        return []

    @hybrid_property
    def name(self):
        return self.user.name

    @hybrid_property
    def avatar(self):
        return self.user.avatar

    @hybrid_property
    def photos(self):
        get_photo = Photo.query.filter(Photo.cook_id == self.id).all()
        photos_dict = []
        if get_photo is not None:
            for p in get_photo:
                photos_dict.append(p.name)

        return photos_dict

    @staticmethod
    def post_single_preprocessor(data=None, **kw):
        # todo stuff

        return data

    def serialize(self, related = True):
        cookDict = {
            'id' : self.id,
            'description' : self.description,
            'location' : self.location,
            # 'coordinates' : self.coordinates
        }

        if(related):
            cookDict['dishes']  = []
            for dish in self.dishes:
                cookDict['dishes'].append(dish.serialize())

        return cookDict