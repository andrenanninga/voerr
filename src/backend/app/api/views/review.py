from flask import Response, json, Blueprint
from app.api.models.review import Review

mod = Blueprint('review', __name__, url_prefix='/api/review')

# @mod.route('/<id>', methods=['GET'])
# def getReview(id):
#     try:
#         review = Review.query.get(id)
#         return Response(json.dumps(review.serialize()), mimetype='application/json')

#     except Exception as e:
#         return json.dumps({'error': str(e)})


# @mod.route('/<id>', methods=['PUT'])
# def updateReview():

#     return

# @mod.route('/', methods=['POST'])
# def createReview():

#     return
