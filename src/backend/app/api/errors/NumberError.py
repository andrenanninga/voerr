class NumberError(Exception):
    def __init__(self, name, min, max):
        self.errors = dict(rating=('Number must be between 1 and 5'))