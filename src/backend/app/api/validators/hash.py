import hashlib


class HashValidator:
    def __init__(self):
        pass

    @staticmethod
    def hash(password):
        salt = "bladibla"
        salt = salt.encode('utf-8')
        password = password.encode('utf-8')
        return hashlib.sha224(password+salt).hexdigest()

