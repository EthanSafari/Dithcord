from app.models import db, message, message_image


def seed_messages():
    message1 = message(
        body='Hello there', channel_id=1, author_id=2
    )
    message2 = message(
        body='Hey bud', channel_id=1, author_id=3
    )
    message3 = message(
        body='Hows it going', channel_id=1, author_id=2
    )
    message4 = message(
        body='Not so bad and yourself', channel_id=1, author_id=3
    )
    message5 = message(
        body='Pretty good', channel_id=1, author_id=2,
    )
    message6 = message(
        body='Did you see that thing about the thing?', channel_id=2, author_id=4,
    )
    message7 = message(
        body='Yeah man thats crazy', channel_id=2, author_id=1,
    )
    message8 = message(
        body='Hola', channel_id=3, author_id=5,
    )
    message9 = message(
        body='Como esta', channel_id=3, author_id=1,
    )
    message10 = message(
        body='mucho bueno', channel_id=3, author_id=5,
    )
    message11 = message(
        body='tu es loco', channel_id=3, author_id=1,
    )
    
    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)
    db.session.add(message5)
    db.session.add(message6)
    db.session.add(message7)
    db.session.add(message8)
    db.session.add(message9)
    db.session.add(message10)
    db.session.add(message11)
    db.session.commit()
    
def seed_message_images():
    image1 = message_image(
        image_url='/static/images/message_images/assault-dog.jpeg', message_id=3
    )
    image2 = message_image(
        image_url='/static/images/message_images/beef-cat.jpg', message_id=5
    )
    image3 = message_image(
        image_url='/static/images/message_images/footzo.png', message_id=7
    )
    image4 = message_image(
        image_url='/static/images/message_images/hampster.jpg', message_id=9
    )
    image5 = message_image(
        image_url='/static/images/message_images/rogan-tyson.jpg', message_id=11
    )
    
    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.commit()
    
def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM messages")
        
    db.session.commit()
    
def undo_message_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.message_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM message_images")
        
    db.session.commit()