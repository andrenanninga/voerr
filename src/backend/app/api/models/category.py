from app import db
from flask.ext.restless import ProcessingException

class Category(db.Model):
    __tablename__ = 'category'

    id = db.Column('id', db.Integer, primary_key=True)
    name = db.Column('name', db.String(63))
    parent_id = db.Column('parent_id', db.Integer)

    def __init__(self, name=None, parent_id=None):
        self.name = name
        self.parent_id = parent_id

    def __repr__(self):
        return '<Category %r>' % (self.name)

    def getExclude():
        return []

    @staticmethod
    def post_single_preprocessor(data=None, **kw):
        # todo stuff

        return data

    @staticmethod
    def get_categories_by_list(list_of_ids):
        CategoryArray = db.session.query(Category).filter(Category.id.in_(list_of_ids)).all()

        if len(list_of_ids) != len(CategoryArray):
            raise ProcessingException(
                description='Invalid category_id in array',
                code=400
            )
        return CategoryArray