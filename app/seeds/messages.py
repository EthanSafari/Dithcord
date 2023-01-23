from app.models import db, Message, MessageImage, environment, SCHEMA


def seed_messages():
    message1 = Message(
        body='Hello there', channel_id=1, author_id=2
    )
    message2 = Message(
        body='Hey bud', channel_id=1, author_id=3
    )
    message3 = Message(
        body='Howth it going', channel_id=1, author_id=2
    )
    message4 = Message(
        body='Not tho bad and yourself?', channel_id=1, author_id=3
    )
    message5 = Message(
        body='Pretty good', channel_id=1, author_id=2,
    )
    message6 = Message(
        body='Did you thee that thing about the thing?', channel_id=2, author_id=4,
    )
    message7 = Message(
        body='Yeah man thatth crazy', channel_id=2, author_id=1,
    )
    message8 = Message(
        body='Hola', channel_id=3, author_id=5,
    )
    message9 = Message(
        body='What\'th up?', channel_id=3, author_id=1,
    )
    message10 = Message(
        body='Nothing much', channel_id=3, author_id=5,
    )
    message11 = Message(
        body='What', channel_id=3, author_id=1,
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
    image1 = MessageImage(
        image_url='/static/images/message_images/assault-dog.jpeg', message_id=3
    )
    image2 = MessageImage(
        image_url='/static/images/message_images/beef-cat.jpg', message_id=5
    )
    image3 = MessageImage(
        image_url='/static/images/message_images/footzo.png', message_id=7
    )
    image4 = MessageImage(
        image_url='/static/images/message_images/hampster.jpg', message_id=9
    )
    image5 = MessageImage(
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
