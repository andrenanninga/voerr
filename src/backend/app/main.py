from app import app
from flask import Flask, render_template
import sys

@app.route('/', defaults={'path': '/'})

@app.route('/<path:path>')
def catch_all(path):
    print('GET %s' % path)
    return render_template('index.html')