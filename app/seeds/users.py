from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='demo', last_name='tester',buying_power='1000000', email='demo@aa.io', password='password')
    marnie = User(
        first_name='Marnie', last_name='Aldous',buying_power='20', email='marnie@aa.io', password='password')
    bobbie = User(
        first_name='Bobbie', last_name='Woods',buying_power='3000000', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
