from app import db

class User(db.Model):
    __tablename__ = 'gebruiker'

    id = db.Column('id', db.Integer, primary_key=True)
    name = db.Column('name', db.String(127))
    email = db.Column('email', db.String(127), unique=True)
    password = db.Column('password', db.String(127))
    data_created = db.Column('date_created', db.Datetime, default=datetime.datetime.now)
    data_updated = db.Column('date_updated', db.Datetime, onupdate=datetime.datetime.now)

    def __init__(self, name=None, email=None, password=None):
        self.name = name
        self.email = email
        self.phonenumber = phonenumber

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