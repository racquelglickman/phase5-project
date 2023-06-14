#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Trip, Activity

@app.route('/')
def home():
    return 'Planning a trip is fun!'

class Users(Resource):
    def get(self):
        return [user.to_dict() for user in User.query.all()], 200
    
    def post(self):
        try:
            new_user = User(
                email=request.form['email'],
                first_name=request.form['first_name'],
                last_name=request.form['first_name']
            )
        
            db.session.add(new_user)
            db.session.commit()

            new_user_dict = new_user.to_dict()

            return new_user_dict, 201
        except:
            return {'error': '400: Validation error'}, 400
    
api.add_resource(Users, '/users')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
