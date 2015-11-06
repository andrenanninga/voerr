from app import db
from flask.ext.restless import ProcessingException

class Allergy(db.Model):
    __tablename__ = 'allergy'

    id = db.Column('id', db.Integer, primary_key=True)
    name = db.Column('name', db.String(63))
    description = db.Column('description', db.String(255))

    def __init__(self, name=None, description=None):
        self.name = name
        self.description = description

    def __repr__(self):
        return '<Allergy %r>' % (self.name)

    def getExclude():
        return []

    @staticmethod
    def post_single_preprocessor(data=None, **kw):
        # todo stuff

        return data

    def serialize(self, related = True):
        allergyDict = {
            'id' : self.id,
            'name' : self.name,
            'description' : self.description
        }

        return allergyDict

    @staticmethod
    def get_allergies_by_list(list_of_ids):
        AllergyArray = db.session.query(Allergy).filter(Allergy.id.in_(list_of_ids)).all()

        if len(list_of_ids) != len(AllergyArray):
            raise ProcessingException(
                description='Invalid allergy_id in array',
                code=400
            )
        return AllergyArray
