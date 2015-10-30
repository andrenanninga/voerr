class NumberValidator:
    def __init__(self):
        pass

    @staticmethod
    def between(min_val, max_val, value):
        if (type(value) is int) and (value >= min_val) and (value <= max_val):
            return True
        return False

    @staticmethod
    def is_int(value):
        if type(value) is int:
            return True
        return False
