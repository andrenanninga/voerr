from flask import Response, json, Blueprint
from app.api.models.user import User

mod = Blueprint('user', __name__, url_prefix='/api/user')