#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from datetime import date, timedelta, time, datetime

# Local imports
from app import app
from models import db, User, Trip, Activity, Category

def make_users():
    users = []
    for i in range(10):
        first_name = fake.first_name()
        last_name = fake.last_name()
        user = User(
            first_name = first_name,
            last_name = last_name,
            email=f'{first_name}.{last_name}@email.com',
            _password_hash = fake.iban()
        )
        users.append(user)

    racquel = User(
        first_name = 'Racquel',
        last_name = 'Glickman',
        email='racquel.glickman@gmail.com',
        _password_hash = '$2b$12$YObchz8v3lLS5On9ZE9XzOtIox9BxVZYLGMNgR3EKZXqLgP4hfHBO',
        # password is 123
    )
    users.append(racquel)

    return users

def make_trips():
    trips = []
    for i in range(10):
        user_id = rc([user.id for user in users])
        first_name = [user.first_name for user in users if user.id == user_id][0]
        # first_name = fake.first_name()
        location = fake.country()
        length = randint(3,14)
        start_date=fake.date_between(date(2021,1,1), date(2023,6,14))
        trip = Trip(
            location=location,
            name=f'{first_name}\'s Trip to {location} {start_date.year}',
            start_date=start_date,
            end_date=start_date + timedelta(days=length),
            user_id=user_id,
        )
        trips.append(trip)

    portugal_trip = Trip(
        location = 'Portugal',
        name = 'Portugal Trip 2022',
        start_date = date(2022,3,17),
        end_date = date(2022,3,24),
        user_id=11,
    )
    trips.append(portugal_trip)

    return trips

def make_categories():
    categories =[]
    for cat in ['flight', 'train', 'car', 'bus', 'tour', 'hike', 'water', 'explore', 'logistics']:
        category = Category(
            name = cat,
        )
        categories.append(category)

    return categories

def make_activities():
    activities = []
    for i in range(50):
        h = randint(8,20)
        length = randint(1,3)
        trip_id = rc([trip.id for trip in trips])
        start_date = datetime.strptime([trip.start_date for trip in trips if trip.id == trip_id][0], '%Y-%m-%d').date()
        end_date = datetime.strptime([trip.end_date for trip in trips if trip.id == trip_id][0], '%Y-%m-%d').date()
        activity = Activity(
            address = fake.address(),
            name = fake.company(),
            date = fake.date_between(start_date, end_date),
            start_time = time(h,0,0).isoformat(),
            end_time = time(h+length,0,0).isoformat(),
            cost = randint(5,200),
            notes = fake.paragraph(nb_sentences=2),
            category_id = rc([cat.id for cat in categories]),
            trip_id=trip_id,
        )
        activities.append(activity)

    return activities




if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        User.query.delete()
        Trip.query.delete()
        Activity.query.delete()
        Category.query.delete()

        print("Seeding users...")
        users = make_users()
        db.session.add_all(users)
        db.session.commit()

        print("Seeding trips...")
        trips = make_trips()
        db.session.add_all(trips)
        db.session.commit()

        print("Seeding categories...")
        categories = make_categories()        
        db.session.add_all(categories)
        db.session.commit()

        print("Seeding activities...")
        activities = make_activities()
        db.session.add_all(activities)
        db.session.commit()   

           
            

        # def make_days():
        #     days = []
        #     for trip in trips:
        #         # print(datetime.strptime(trip.start_date, '%Y-%m-%d').date())
        #         start = datetime.strptime(trip.start_date, '%Y-%m-%d').date()
        #         end = datetime.strptime(trip.end_date, '%Y-%m-%d').date()
        #         num_days = (end - start).days + 1
        #         # print(trip.location, start, end, num_days)
        #         for i in range(num_days):
        #             day = Day(
        #                 date=start,
        #                 trip_id=trip.id,
        #             )
        #             days.append(day)
        #             start = start + timedelta(days=1)

        #     return days
        
        # days = make_days()


        # print("Seeding days...")
        # db.session.add_all(days)
        # db.session.commit()

        print("Seeding done.")