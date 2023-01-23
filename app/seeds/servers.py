from app.models import db, Server, environment, SCHEMA, User


def seed_servers():

    server1 = Server(
        name = 'Mike Tyson Mysteries',
        server_image = 'https://m.media-amazon.com/images/M/MV5BODc2MjAzOTY5Nl5BMl5BanBnXkFtZTgwOTcxNDM5MzE@._V1_.jpg',
        owner_id = 1,
        private = False
    )

    server2 = Server(
        name = 'Boxing',
        server_image = 'https://www.soniceditions.com/library/tyson-SFLF_o_tn.jpg',
        owner_id = 2,
        private = False
    )

    server3 = Server(
        name = 'Tyson\'s Tigers',
        server_image = 'https://theadultswimsquad.files.wordpress.com/2016/05/the-bards-curse-bisexual-license-plate.png',
        owner_id = 3,
        private = False
    )

    server4 = Server(
        name = 'Face Tattoos',
        server_image = 'https://sportshub.cbsistatic.com/i/2021/09/14/fcca73e3-3537-4b6e-823b-0eabc425a66d/mike-tyson-mysteries-pigeon.jpg',
        owner_id = 4,
        private = False
    )

    all_servers = [ server1, server2, server3, server4 ]
    all_users = User.query.filter(User.id <= 5).all()
    for i in range(len(all_users)):
        for j in range(len(all_servers)):
            all_users[i].servers.append(all_servers[j])

    for server in all_servers:
        db.session.add(server)
    db.session.commit()

    print("Servers Seeded")


def undo_server():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM servers")

    db.session.commit()
