from app import db
import datetime
from flask.ext.login import current_user
from flask.ext.restless import ProcessingException
from app.api.models.cook import Cook
from app.api.models.allergy import Allergy


class DishAllergy(db.Model):
    __tablename__ = 'dish_allergy'
    __table_args__ = {"useexisting": True}

    dish_id = db.Column('dish_id', db.Integer, primary_key=True)
    allergy_id = db.Column('allergy_id', db.Integer, primary_key=True)

    def __init__(self, dish_id=None, allergy_id=None):
        self.dish_id = dish_id
        self.allergy_id = allergy_id

    def __repr__(self):
        return '<DishAllergy dish_id: %r, allergy_id: %r>' % (self.dish_id, self.allergy_id)

    @staticmethod
    def dish_id_exclude_allergies(allergies=None):
        if allergies is not None:
            dish_allergies = DishAllergy.query.filter(DishAllergy.allergy_id.in_(allergies)).group_by(DishAllergy.dish_id)
        else:
            dish_allergies = DishAllergy.query.group_by(DishAllergy.dish_id).all()

        dish_ids = []
        for da in dish_allergies:
            dish_ids.append(da.dish_id)

        return dish_ids
