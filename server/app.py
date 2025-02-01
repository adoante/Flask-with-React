# app.py
from flask import Flask, jsonify, request
from flask_cors import CORS

from flask_migrate import Migrate
from models import db, Profile

import json

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'

CORS(app)

migrate = Migrate(app, db)

db.init_app(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(port=5000, debug=True)
    
@app.route('/api/test')
def data():
    data = {'message': 'Hello from the backend!'}
    return jsonify(data)

@app.route('/api/post', methods=['POST'])
def post_data():
    try:
        first_name = request.form.get("first_name")
        last_name = request.form.get("last_name")
        age = request.form.get("age")
        
        if first_name != '' and last_name != '' and age is not None:
            p = Profile(first_name=first_name, last_name=last_name, age=age)
        
        db.session.add(p)
        db.session.commit()

        msg = {'message': 'posted data'}
    except:
        msg =  {'message': 'unable to post data'}
    
    print(msg)
    return jsonify(msg)
    
@app.route('/api/get_all', methods=['GET'])
def get_data():
    profiles = Profile.query.all()

    users = []

    for profile in profiles:
        user = {
            'name': profile.first_name + " " + profile.last_name,
            'age' : profile.age,
            'id': profile.id
        }

        users.append(user)

    return jsonify({'Profiles': users})

@app.route('/api/get_user', methods=['POST'])
def get_user():

    user_id = request.form.get("userId")

    print("************ user id:" + str(user_id) + " ************")

    data = Profile.query.get(user_id)

    user = {
                'name': data.first_name + " " + data.last_name,
                'age' : data.age,
                'id': data.id
            }

    return jsonify(user)

@app.route('/api/delete/<int:id>')
def erase(id):
    try:

        data = Profile.query.get(id)

        user = {
                'name': data.first_name + " " + data.last_name,
                'age' : data.age,
                'id': data.id
            }

        db.session.delete(data)
        db.session.commit()

        msg = {'deleted:': user}
    except:
        msg = {'message': 'no user found'}

    return jsonify(msg)