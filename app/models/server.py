from .db import db, environment, SCHEMA, add_prefix_for_prod


server_users = db.Table(
    'server_users',
    db.Model.metadata,
    db.Column('server_id', db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id')), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True))

if environment == 'production':
    server_users.schema = SCHEMA
class Server(db.Model):
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    private = db.Column(db.Boolean, default=False, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    server_image = db.Column(db.String(1000), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    owner = db.relationship('User', back_populates='server')
    channels = db.relationship('Channel', back_populates='server', cascade="all, delete")
    users = db.relationship('User', secondary=server_users, back_populates="servers")

    def to_dict(self):
        return {
            'id': self.id,
            'private': self.private,
            'name': self.name,
            'serverImage': self.server_image,
            'ownerId': self.owner_id,
            'channels': [channel.to_dict() for channel in self.channels],
        }
