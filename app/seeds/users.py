from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    dogg = User(
        username='Dogg', email='demo@aa.io', password='password', profile_img='https://th.bing.com/th/id/OIP.dG60VtWKcsGTTVayhWLdDQAAAA?pid=ImgDet&rs=1')
    marquess = User(
        username='Marquess', email='marnie@aa.io', password='password', profile_img='https://www.indiewire.com/wp-content/uploads/2016/06/mtm_3a5_494_jasonbsucks_still01.jpg')
    yung_Hee = User(
        username='Yung Hee', email='bobbie@aa.io', password='password', profile_img= 'https://th.bing.com/th/id/OIP.1tNZLd_KzdBuvz3eHaYsygHaEK?pid=ImgDet&rs=1')
    tyson = User(
        username='Iron Mike', email='mike@tyson.com', password='password', profile_img ='https://th.bing.com/th/id/R.d2ad9ccdcfb1d4c0d3e3b4ede417821d?rik=QVLgnfjq1bpj4A&pid=ImgRaw&r=0'
    )
    pidgeon = User(
        username='Pidgeon', email='tysonpidgeon@tyson.com', password='password', profile_img ='https://i.ytimg.com/vi/n1Hu2SScGj8/maxresdefault.jpg'
    )
    demo_user_1 = User(
        username='DemoUser1', email='demo1@aa.io', password='password1', profile_img='https://th.bing.com/th/id/OIP.LVqQLfgbYt7WWYEgOPBlMQAAAA?w=138&h=169&c=7&r=0&o=5&pid=1.7')
    demo_user_2 = User(
        username='DemoUser2', email='demo2@aa.io', password='password2',  profile_img='https://th.bing.com/th/id/OIP.nGeihD1R_Un6qL5t4fdeyAHaEK?pid=ImgDet&rs=1')

    db.session.add(dogg)
    db.session.add(marquess)
    db.session.add(yung_Hee)
    db.session.add(tyson)
    db.session.add(pidgeon)
    db.session.add(demo_user_1)
    db.session.add(demo_user_2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
