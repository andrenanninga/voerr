from app import db

class Login(db.Model):
    __tablename__ = 'user'

    id = db.Column('id', db.Integer, primary_key=True)
    name = db.Column('name', db.String(63))
    description = db.Column('description', db.String(255))

    def __init__(self, name=None, description=None):
        self.name = name
        self.description = description

    def __repr__(self):
        return '<Allergy %r>' % (self.name)

    def serialize(self, related = True):
        allergyDict = {
            'id' : self.id,
            'name' : self.name,
            'description' : self.description
        }

        return allergyDict
