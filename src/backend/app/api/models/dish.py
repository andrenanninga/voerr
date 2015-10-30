from app import db
import datetime

# dish_allergy = db.Table('dish_allergy',
#     db.Column('dish_id', db.Integer, db.ForeignKey('dish.id')),
#     db.Column('allergy_id', db.Integer, db.ForeignKey('allergy.id'))
# )

class Dish(db.Model):
    __tablename__ = 'dish'

    id = db.Column('id', db.Integer, primary_key=True)
    name = db.Column('name', db.String(127))
    description = db.Column('description', db.String(255))
    cook_id = db.Column('cook_id', db.Integer, db.ForeignKey('cook.id'))
    data_created = db.Column('date_created', db.DateTime, default=datetime.datetime.now)
    data_updated = db.Column('date_updated', db.DateTime, onupdate=datetime.datetime.now)
    # allergies = db.relationship('Allergy', secondary=dish_allergy)

    def __init__(self, name=None, description=None, cook_id=None):
        self.name = name
        self.description = description
        self.cook_id = cook_id

    def __repr__(self):
        return '<Dish %r>' % (self.name)

    def serialize(self, related = True):
        dishDict = {
            'id' : self.id,
            'name' : self.name,
            'description' : self.description
        }

        if(related):
            dishDict['allergies']  = []
            for allergy in self.allergies:
                dishDict['allergies'].append(allergy.serialize())

        return dishDict

    def getExclude():
        return [
        ]
