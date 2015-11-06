from flask import Blueprint, jsonify, make_response, request
from app import db
from flask.ext.restless.helpers import to_dict

from app.api.errors.errors import Error
from app.api.models.allergy import Allergy

mod = Blueprint('search', __name__, url_prefix='/api/v1/search')


@mod.route('/dishes', methods=['GET'])
def search():
    try:
        allergies = request.args.get('allergies')
        # api/v1/search/dishes?allergies=1,2,3,4 returns all dishes that have no allergies 1,2,3,4
        if allergies is not None:
            from app.api.models.dish_allergy import DishAllergy
            from app.api.models.dish import Dish

            if allergies is not None:
                exclude_ids = allergies.split(',')
                dish_ids = DishAllergy.dish_id_exclude_allergies(exclude_ids)
                dishes = Dish.query.filter(~Dish.id.in_(dish_ids))

        term = request.args.get('term')
        # api/v1/search/dishes?term=zalm finds "zalmfilet", "bereid met zalm", "zeezalm"
        if term is not None:
            dishes = dishes.filter(Dish.name.like('%' + term + '%'))

        dishes = dishes.all()
        json = {"objects": []}
        for dish in dishes:
            # json["objects"].append(to_dict(dish, deep={"allergies": {"id": {"id"}}}, include_relations={"allergies": ["id"]}))
            json["objects"].append(to_dict(dish))

        json["num_results"] = len(dishes)
        return make_response(jsonify(json))

    except Error as e:
        return make_response(jsonify({e.name: e.message}), 400)
