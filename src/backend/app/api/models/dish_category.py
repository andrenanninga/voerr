from app import db
import datetime
from flask.ext.login import current_user
from flask.ext.restless import ProcessingException
from app.api.models.cook import Cook
from app.api.models.category import Category

class DishCategory(db.Model):
    __tablename__ = 'dish_category'
    __table_args__ = {"useexisting": True}

    dish_id = db.Column('dish_id', db.Integer, primary_key=True)
    category_id = db.Column('category_id', db.Integer, primary_key=True)

    def __init__(self, dish_id=None, category_id=None):
        self.dish_id = dish_id
        self.category_id = category_id

    def __repr__(self):
        return '<DishCategory dish_id: %r, category_id: %r>' % (self.dish_id, self.category_id)

    @staticmethod
    def dish_id_include_categories(categories=None):
        if categories is not None:
            dish_categories = DishCategory.query.filter(DishCategory.category_id.in_(categories)).group_by(DishCategory.dish_id)
        else:
            dish_categories = DishCategory.query.group_by(DishCategory.dish_id).all()

        dish_ids = []
        for da in dish_categories:
            dish_ids.append(da.dish_id)

        return dish_ids
