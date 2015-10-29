from wtforms import ValidationError
from app.api.models.dish import Dish

def dish_exists(form, field):
    if not Dish.query.get(field.data):
        raise ValidationError('Dish does not exist.')
