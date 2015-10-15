from app import db

class Category(db.Model):
    __tablename__ = 'category'

    id = db.Column('id', db.Integer, primary_key=True)
    name = db.Column('name', db.String(63))
    parent_id = db.Column('parent_id', db.Integer

    def __init__(self, name=None, parent_id=None):
        self.name = name
        self.parent_id = parent_id

    def __repr__(self):
        return '<Category %r>' % (self.name)