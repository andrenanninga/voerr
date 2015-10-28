from flask import Response, json, Blueprint

from app.api.models.photo import Photo

mod = Blueprint('photo', __name__, url_prefix='/api/photo')

@mod.route('/<id>', methods=['GET'])
def getPhoto(id):
    photo = Photo.query.get(id)
    return Response(json.dumps(photo.serialize()), mimetype='application/json')
