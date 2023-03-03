from .db import db, environment, SCHEMA, add_prefix_for_prod


server_users = db.Table(
    'server_users',
    db.Model.metadata,
    db.Column('server_id', db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id')), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True))

if environment == 'production':
    server_users.schema = SCHEMA
    
class PmServer(db.Model):
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    user1_id = db.Column(db.Integer, nullable=False)
    user1 = db.relationship('User', back_populates='server')
    user2_id = db.Column(db.Integer, nullable=False)
    user2 = db.relationship('User', back_populates='server')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'firstUserId': self.user1_id,
            'secondUserId': self.user2_id,
            'Users': [user.to_dict() for user in self.users]
        }
