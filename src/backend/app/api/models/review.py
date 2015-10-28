from app import db
import datetime

class Review(db.Model):
    __tablename__ = 'review'

    id = db.Column('id', db.Integer, primary_key=True)
    content = db.Column('content', db.String(255))
    rating = db.Column('rating', db.Integer)
    user_id = db.Column('user_id', db.Integer)
    dish_id = db.Column('dish_id', db.Integer)
    data_created = db.Column('date_created', db.DateTime, default=datetime.datetime.now)
    data_updated = db.Column('date_updated', db.DateTime, onupdate=datetime.datetime.now)

    def __init__(self, content=None, rating=None, user_id=None, dish_id=None):
        self.content = content
        self.rating = rating
        self.user_id = user_id
        self.dish_id = dish_id

    def __repr__(self):
        return '<Review %r>' % (self.name)

    def serialize(self, related = True):
        userDict = {
            'id' : self.id,
            'content' : self.content,
            'rating' : self.rating,
            'user_id': self.user_id,
            'dish_id': self.dish_id
        }

        # if(related):
        #     userDict['cook'] = self.cook.serialize()

        return userDict