from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    trips = db.relationship("Trip", backref="user")
    
    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email:
            raise ValueError("Please enter valid email")
        return email
    
    @validates('first_name')
    def validate_first_name(self, key, first_name):
        if len(first_name) > 25 or len(first_name) < 1:
            raise ValueError("Please enter your first name")
        return first_name
    
    @validates('last_name')
    def validate_last_name(self, key, last_name):
        if len(last_name) > 25 or len(last_name) < 1:
            raise ValueError("Please enter your last name")
        return last_name

class Trip(db.Model, SerializerMixin):
    __tablename__ = 'trips'

    id = db.Column(db.Integer, primary_key = True)
    location = db.Column(db.String)
    name = db.Column(db.String)
    start_date = db.Column(db.String)
    end_date = db.Column(db.String)
    
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    days = db.relationship("Day", backref="trip")


class Activity(db.Model, SerializerMixin):
    __tablename__ = 'activities'

    id = db.Column(db.Integer, primary_key = True)
    name=db.Column(db.String)
    address = db.Column(db.String)
    start_time = db.Column(db.String)
    end_time = db.Column(db.String)
    cost = db.Column(db.Float)
    notes = db.Column(db.String)
    category = db.Column(db.String)
    
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    day_id = db.Column(db.Integer, db.ForeignKey('days.id'))

    # validate activity category is in category list

class Day(db.Model, SerializerMixin):
    __tablename__ = 'days'

    id = db.Column(db.Integer, primary_key = True)
    date = db.Column(db.Date)

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    trip_id = db.Column(db.Integer, db.ForeignKey('trips.id'))

    activities = db.relationship("Activity", backref="activity")
