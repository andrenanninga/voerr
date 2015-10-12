from app import app
from flask import Flask, render_template
import sys

@app.route('/')
@app.route('/index')
def main():
    print('index')
    return render_template('index.html')