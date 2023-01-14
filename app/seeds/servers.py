from app.models import db, Server, environment, SCHEMA


def seed_servers():
    
    server1 = Server(
        name = 'Mike Tyson Mysteries',
        server_image = '/static/images/dithcord_server_image.png',
        owner_id = 1,
    )
    
    server2 = Server(
        name = 'Boxing',
        server_image = '',
        owner_id = 2,
    )
    
    server3 = Server(
        name = 'Tyson\'s Tigers',
        server_image = '',
        owner_id = 3,
    )
    
    server4 = Server(
        name = 'Face Tattoos',
        server_image = '',
        owner_id = 4,
    )
    

    
