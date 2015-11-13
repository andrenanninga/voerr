from flask import Blueprint, jsonify, make_response, request
from sqlalchemy import or_, cast, Date, asc
from sqlalchemy.orm import contains_eager
from app import db
from flask.ext.restless.helpers import to_dict
from datetime import date

from app.api.errors.errors import Error
from app.api.models.dish_allergy import DishAllergy
from app.api.models.dish_category import DishCategory
from app.api.models.cook import Cook
from app.api.models.dish import Dish
from app.api.models.meal import Meal

mod = Blueprint('search', __name__, url_prefix='/api/v1/search')


@mod.route('/dishes', methods=['GET'])
def search():
    try:
        dishes = Dish.query

        # get only dishes that have meals for the current day
        dishes = dishes.join(Dish.meals)
        dishes = dishes.filter(Meal.available_from.like('%' + str(date.today()) + '%'))
        dishes = dishes.options(contains_eager('meals'))
        dishes = dishes.order_by(asc(Dish.id))

        # api/v1/search/dishes?allergies=1,2,3,4 returns all dishes that have no allergies 1,2,3,4
        allergies = request.args.get('allergies')
        if allergies is not None:

            if allergies is not None:
                exclude_ids = allergies.split(',')
                dish_ids = DishAllergy.dish_id_exclude_allergies(exclude_ids)
                dishes = dishes.filter(~Dish.id.in_(dish_ids))

        # api/v1/search/dishes?categories=1,2,3,4 returns all dishes that belong to EITHER (so it's an OR) categories 1,2,3,4
        categories = request.args.get('categories')
        if categories is not None:

            if categories is not None:
                include_ids = categories.split(',')
                dish_ids = DishCategory.dish_id_include_categories(include_ids)
                dishes = dishes.filter(Dish.id.in_(dish_ids))

        # api/v1/search/dishes?term=zalm finds "zalmfilet", "bereid met zalm", "zeezalm"
        term = request.args.get('term')
        if term is not None:
            dishes = dishes.filter(or_(Dish.name.like('%' + term + '%'), Dish.description.like('%' + term + '%')))

        # api/v1/search/dishes?location=gro finds "groningen", "grootegast"
        location = request.args.get('location')
        if location is not None:
            dishes = dishes.join(Dish.cook).filter(Cook.location.like('%' + location + '%'))

        dishes = dishes.limit(100).all()
        json = {"objects": []}
        for dish in dishes:
            # json["objects"].append(to_dict(dish, deep={"allergies": {"id": {"id"}}}, include_relations={"allergies": ["id"]}))
            json["objects"].append(to_dict(dish, deep={'allergies': [], 'cook': [], 'categories': [], 'meals': [], 'reviews': []}, exclude_relations={'categories': ['parent_id']}))

        json["num_results"] = len(dishes)
        return make_response(jsonify(json))

    except Error as e:
        return make_response(jsonify({e.name: e.message}), 400)
