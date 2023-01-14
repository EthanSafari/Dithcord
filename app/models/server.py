from .db import db


server_users = db.Table(
    'server_users',
    db.Column('server_id', db.Integer, db.ForeignKey('server.id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
)

class Server(db.Model):
    __tablename__ = 'servers'
    id = db.Column(db.Integer, primary_key=True)
    private = db.Column(db.Boolean, default=False, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    server_image = db.Column(db.String(255), nullable=False, default='/static/images/dithcord_server_image.png')
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    owner = db.relationship('User', back_populates='server')
    channels = db.relationship('Channel', back_populates='server', cascade="all, delete")
    users = db.relationship(secondary=server_users, back_populates="servers")
