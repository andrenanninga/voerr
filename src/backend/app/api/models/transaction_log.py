from app import db
from flask.ext.restless import ProcessingException

class TransactionLog(db.Model):
    __tablename__ = 'transaction_log'

    id = db.Column('id', db.Integer, primary_key=True)
    from_user = db.Column('from_user', db.Integer, db.ForeignKey('user.id'))
    to_user = db.Column('to_user', db.Integer, db.ForeignKey('user.id'))
    amount = db.Column('amount', db.Integer)
    description = db.Column('description', db.Text)
    order_id = db.Column('order_id', db.Integer, db.ForeignKey('order.id'))
    user_from = db.relationship('User', foreign_keys=from_user)
    user_to = db.relationship('User', foreign_keys=to_user)
    order = db.relationship('Order')

    def __init__(self, from_user=None, to_user=None, amount=None, description=None, order_id=None):
        self.from_user = from_user
        self.to_user = to_user
        self.amount = amount
        self.description = description
        self.order_id = order_id

    def __repr__(self):
        return '<TransactionLog: from %r, to %r, amount %r, description %r, order id %r>'\
               % (self.from_user, self.to_user, self.amount, self.description, self.order_id)

    def getExclude():
        return ['from_user', 'to_user', 'order_id']

    @staticmethod
    def post_single_preprocessor(data=None, **kw):
        # todo stuff

        return data
