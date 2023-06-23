#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

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

class TripById(Resource):
    def get(self, id):
        trip = Trip.query.filter_by(id=id).first()

        if trip:
            return trip.to_dict(), 200
        else:
            return {'error': '404: Trip not found'}, 404
        
api.add_resource(TripById, '/trips/<int:id>')

class Activities(Resource):
    def get(self):
        return [activity.to_dict() for activity in Activity.query.all()], 200
    
    def post(self):
        try:
            new_activity = Activity(
                name=request.form['name'],
                address=request.form['address'],
                date=request.form['date'],
                start_time=request.form['start_time'],
                end_time=request.form['end_time'],
                cost=request.form['cost'],
                notes=request.form['notes'],
                trip_id=request.form['trip_id'],
            )
        
            db.session.add(new_activity)
            db.session.commit()

            new_activity_dict = new_activity.to_dict()

            return new_activity_dict, 201
        except:
            return {'error': '400: Validation error'}, 400
    
api.add_resource(Activities, '/activities')

class ActivityById(Resource):
    def get(self, id):
        activity = Activity.query.filter_by(id=id).first()

        if activity:
            return activity.to_dict(), 200
        else:
            return {'error': '404: Activity not found'}, 404
        
    def delete(self, id):
        activity = Activity.query.filter_by(id=id).first()
        if activity:
            db.session.delete(activity)
            db.session.commit()

            response = make_response("", 204)

            return response

        return {'error': "Activity not found"}, 404
        
api.add_resource(ActivityById, '/activities/<int:id>')

class Categories(Resource):
    def get(self):
        return [cat.to_dict() for cat in Category.query.all()]
    
api.add_resource(Categories, '/categories')

class Signup(Resource):

    def post(self):

        password = request.json['password']
        
        user = User(
            email = request.json['email'],
            first_name = request.json['first_name'],
            last_name = request.json['last_name'],
        )
        
        user.password_hash = password

        try:

            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            return user.to_dict(), 201
        
        except IntegrityError:

            return {'error': '422 Unprocessable Entity'}, 422
        
class CheckSession(Resource):

    def get(self):

        if session.get('user_id'):

            user = User.query.filter(User.id == session['user_id']).first()

            return user.to_dict(), 200
        
        return {'error': '401 Unauthorized'}, 401
    
class Login(Resource):

    def post(self):

        email = request.json['email']
        password = request.json['password']

        user = User.query.filter(User.email == email).first()

        if user:
            if user.authenticate(password):

                session['user_id'] = user.id
                return user.to_dict(), 200
            
        return {'error': '401 Unauthorized'}, 401
    
class Logout(Resource):

    def delete(self):

        if session.get('user_id'):

            session['user_id'] = None

            return {}, 204
        
        return {'error': '401 Unauthorized'}, 401
    
api.add_resource(Signup, '/signup')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
