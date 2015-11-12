import datetime
from app import db
from flask.ext.restless import ProcessingException

class TransactionLog(db.Model):
    __tablename__ = 'transaction_log'

    id = db.Column('id', db.Integer, primary_key=True)
    user_id = db.Column('user_id', db.Integer, db.ForeignKey('user.id'))
    type = db.Column('type', db.String(15))
    amount = db.Column('amount', db.Integer)
    description = db.Column('description', db.Text)
    order_id = db.Column('order_id', db.ForeignKey('order.id'))
    order = db.relationship('Order')
    user = db.relationship('User')
    date_created = db.Column('date_created', db.DateTime, default=datetime.datetime.now)

    def __init__(self, user_id=None, type=None, amount=None, description=None, order_id=None):
        self.user_id = user_id
        self.type = type
        self.amount = amount
        self.description = description
        self.order_id = order_id

    def __repr__(self):
        return '<TransactionLog: user id %r, type: %r, amount %r, description %r, order id %r>'\
               % (self.user_id, self.type, self.amount, self.description, self.order_id)

    def getExclude():
        return ['order_id', 'user_id']

    @staticmethod
    def post_single_preprocessor(data=None, **kw):
        # todo stuff

        return data
