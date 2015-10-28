from flask import Response, json, Blueprint

from app.api.models.review import Review

mod = Blueprint('review', __name__, url_prefix='/api/review')

@mod.route('/<id>', methods=['GET'])
def getReview(id):
    review = Review.query.get(id)
    return Response(json.dumps(review.serialize()), mimetype='application/json')
