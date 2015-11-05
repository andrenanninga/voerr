from flask import Blueprint, jsonify, make_response
from app import db

from app.api.errors.errors import Error
from app.api.models.allergy import Allergy

mod = Blueprint('search', __name__, url_prefix='/api/v1/search')


@mod.route('/dishes', methods=['GET'])
def search():

    print(1)
    try:
        from app.api.models.dish import Dish
        dish = db.session.query(Allergy).filter(Allergy.id.notin_([1])).all()
        if dish is None:
            raise Error(name='Could not search', message='Failed')

        return make_response(dish)

    except Error as e:
        return make_response(jsonify({e.name: e.message}), 400)
