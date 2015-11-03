from pprint import pprint
from app import app
from flask import Flask, render_template, request, session
import sys

@app.route('/', defaults={'path': '/'})

@app.route('/<path:path>')
def catch_all(path):
    print('GET %s' % path)
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    pprint(session)
    if request.method == 'POST':
        print(request.form)

    return render_template('login.html')
