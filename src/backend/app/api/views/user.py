from flask import Response, request, jsonify, json, Blueprint, make_response
from app import app, db

mod = Blueprint('user', __name__, url_prefix='/user')

@mod.route('/getUser',  methods=['GET'])
def getUser():
