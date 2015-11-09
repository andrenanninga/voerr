from flask import jsonify

from app import db
import datetime
from flask.ext.login import current_user
from flask.ext.restless import ProcessingException
from app.api.models.cook import Cook
from app.api.models.allergy import Allergy
from app.api.models.category import Category

dish_allergy = db.Table('dish_allergy',
                        db.Column('dish_id', db.Integer, db.ForeignKey('dish.id')),
                        db.Column('allergy_id', db.Integer, db.ForeignKey('allergy.id'))
                        )

dish_category = db.Table('dish_category',
                         db.Column('dish_id', db.Integer, db.ForeignKey('dish.id')),
                         db.Column('category_id', db.Integer, db.ForeignKey('category.id'))
                         )


class Dish(db.Model):
    __tablename__ = 'dish'

    id = db.Column('id', db.Integer, primary_key=True)
    name = db.Column('name', db.String(127))
    description = db.Column('description', db.String(255))
    cook_id = db.Column('cook_id', db.Integer, db.ForeignKey('cook.id'))
    date_created = db.Column('date_created', db.DateTime, default=datetime.datetime.now)
    date_updated = db.Column('date_updated', db.DateTime, onupdate=datetime.datetime.now)
    allergies = db.relationship('Allergy', secondary=dish_allergy)
    categories = db.relationship('Category', secondary=dish_category)

    def __init__(self, name=None, description=None, cook_id=None):
        self.name = name
        self.description = description
        self.cook_id = cook_id

    def __repr__(self):
        return '<Dish %r>' % self.id

    def getExclude():
        return []

    @staticmethod
    def post_single_preprocessor(data=None, **kw):
        data['cook_id'] = current_user.id
        from app.api.models.user import User
        getUser = User.query.get(current_user.id)

        if not getUser.is_cook():
            raise ProcessingException(
                description='User (%r) must be a cook' % getUser.email,
                code=400
            )

        if 'allergies' in data:
            data['allergies'] = Allergy.get_allergies_by_list(data['allergies'])
        else:
            data['allergies'] = []

        return data

    @staticmethod
    def patch_single_preprocessor(instance_id=None, data=None, **kw):

        dish = Dish.query.get(instance_id)

        if dish is None or dish.cook_id is not current_user.id:
            raise ProcessingException(
                description='Dish does not exist',
                code=400
            )

        if 'allergies' in data:
            data['allergies'] = Allergy.get_allergies_by_list(data['allergies'])

        return instance_id

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def serialize(self, related=True):
        dishDict = {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }

        if (related):
            dishDict['allergies'] = []
            for allergy in self.allergies:
                dishDict['allergies'].append(allergy.serialize())

        return dishDict
