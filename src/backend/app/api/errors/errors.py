class Error(Exception):
    def __init__(self, name, message):
        self.errors = {
            name: message
        }
