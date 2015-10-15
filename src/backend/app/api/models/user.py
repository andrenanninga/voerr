from app import db
# from app.api.models.cook import Cook
import datetime, Cook

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column('id', db.Integer, primary_key=True)
    name = db.Column('name', db.String(127))
    email = db.Column('email', db.String(127), unique=True)
    password = db.Column('password', db.String(127))
    data_created = db.Column('date_created', db.DateTime, default=datetime.datetime.now)
    data_updated = db.Column('date_updated', db.DateTime, onupdate=datetime.datetime.now)
    cook = db.relationship('Cook', uselist=False, backref='user')

    def __init__(self, name=None, email=None, password=None):
        self.name = name
        self.email = email
        self.password = password

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.id)

    def __repr__(self):
        return '<User %r>' % (self.name)

    def serialize(self, related = True):
        userDict = {
            'id' : self.id,
            'name' : self.name,
            'email' : self.email
        }

        if(related):
            userDict['cook'] = self.cook.serialize()

        return userDict