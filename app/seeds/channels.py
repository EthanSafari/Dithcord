from ..models.channel import Channel
from app import db, app


with app.app_context():
    db.drop_all()
    db.create_all()
    
    channel1 = Channel(
        private=False
        name='General'
        server_id=1
    )
    
    channel2 = Channel(
        private=True
        name='Private Chat'
        server_id=1
    )
    
    channel3 = Channel(
        private=False
        name=''
        server_id=2
    )
    
    channel4 = Channel(
        private=True
        name=''
        server_id=2
    )
    
    channel5 = Channel(
        private=True
        name=''
        server_id=3
    )
    channel6 = Channel(
        private=False
        name=''
        server_id=3
    )
    
    all_channels = [ channel1, channel2, channel3, channel4, channel5, channel6 ]
    add_channels = [db.session.add(channel) for channel in all_channels]
    db.session.commit()
    print('Seeded Channels')
    
