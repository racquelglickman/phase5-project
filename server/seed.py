#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from datetime import date

# Local imports
from app import app
from models import db, User, Trip, Activity, Day

def make_users():
    users = []
    for i in range(10):
        first_name = fake.first_name()
        last_name = fake.last_name()
        user = User(
            first_name = first_name,
            last_name = last_name,
            email=f'{first_name}.{last_name}@email.com',
        )
        users.append(user)

    return users

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        print("Seeding users...")
        users = make_users()
        db.session.add_all(users)
        db.session.commit()

        # print("Seeding trips...")
        # db.session.add_all(trips)
        # db.session.commit()

        # print("Seeding days...")
        # db.session.add_all(days)
        # db.session.commit()

        # print("Seeding activities...")
        # db.session.add_all(activities)
        # db.session.commit()

        print("Seeding done.")