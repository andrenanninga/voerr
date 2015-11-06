from flask import Blueprint, jsonify, make_response, request
from app import db
from flask.ext.restless.helpers import to_dict

from app.api.errors.errors import Error
from app.api.models.allergy import Allergy

mod = Blueprint('search', __name__, url_prefix='/api/v1/search')


@mod.route('/dishes', methods=['GET'])
def search():
    try:
        from app.api.models.dish_allergy import DishAllergy
        from app.api.models.dish import Dish

        allergies = request.args.get('allergies')

        if allergies is not None:
            exclude_ids = allergies.split(',')

            dish_ids = DishAllergy.dish_id_exclude_allergies(exclude_ids)

            dishes = Dish.query.filter(~Dish.id.in_(dish_ids)).all()
        else:
            dishes = Dish.query.all()

        json = {"objects": []}
        for dish in dishes:
            # json["objects"].append(to_dict(dish, deep={"allergies": {"id": {"id"}}}, include_relations={"allergies": ["id"]}))
            json["objects"].append(to_dict(dish))

        return make_response(jsonify(json))

    except Error as e:
        return make_response(jsonify({e.name: e.message}), 400)
