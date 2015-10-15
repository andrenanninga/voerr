from app import db

class Cook(db.Model):
    __tablename__ = 'cook'

    id = db.Column('id', db.Integer, primary_key=True)
    description = db.Column('description', db.String(255))
    location = db.Column('location', db.String(255))
    coordinates = db.Column('coordinates', db.String(63))
    user_id = db.Column('user_id', db.Integer)
    data_created = db.Column('date_created', db.DateTime, default=datetime.datetime.now)
    data_updated = db.Column('date_updated', db.DateTime, onupdate=datetime.datetime.now)

    def __init__(self, description=None, location=None, coordinates=None, user_id=None):
        self.description = description
        self.location = location
        self.coordinates = coordinates
        self.user_id = user_id

    def __repr__(self):
        return '<Cook %r>' % (self.name)