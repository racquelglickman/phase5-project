#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Trip, Activity, Category

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

class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()

        if user:
            return user.to_dict(), 200
        else:
            return {'error': '404: User not found'}, 404
        
api.add_resource(UserById, '/users/<int:id>')

class Trips(Resource):
    def get(self):
        return [trip.to_dict() for trip in Trip.query.all()], 200
    
    def post(self):
        try:
            new_trip = Trip(
                location=request.form['location'],
                name=request.form['name'],
                start_date=request.form['start_date'],
                end_date=request.form['end_date'],
                user_id=request.form['user_id']
            )
        
            db.session.add(new_trip)
            db.session.commit()

            new_trip_dict = new_trip.to_dict()

            return new_trip_dict, 201
        except:
            return {'error': '400: Validation error'}, 400
    
api.add_resource(Trips, '/trips')

class Activities(Resource):
    def get(self):
        return [activity.to_dict() for activity in Activity.query.all()], 200
    
    def post(self):
        try:
            new_activity = Activity(
                location=request.form['location'],
                name=request.form['name'],
                start_date=request.form['start_date'],
                end_date=request.form['end_date'],
                user_id=request.form['user_id']
            )
        
            db.session.add(new_activity)
            db.session.commit()

            new_activity_dict = new_activity.to_dict()

            return new_activity_dict, 201
        except:
            return {'error': '400: Validation error'}, 400
    
api.add_resource(Activities, '/activities')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
