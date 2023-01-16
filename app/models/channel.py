from .db import db, environment, SCHEMA, add_prefix_for_prod

class Channel(db.Model):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    private = db.Column(db.Boolean, default=False, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id')), nullable=False)

    messages = db.relationship('Message', back_populates='channel', cascade="all, delete")
    server = db.relationship('Server', back_populates='channels')

    def to_dict(self):
        return {
            'id': self.id,
            'private': self.private,
            'name': self.name,
            'server_id': self.server_id
        }
