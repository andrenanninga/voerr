from app import app
from flask import Flask, render_template

@app.route('/')
@app.route('/index')
def main():
    return render_template('index.html')