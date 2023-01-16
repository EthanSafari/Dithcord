from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(750))
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id')), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    channel = db.relationship('Channel', back_populates='messages')
    author = db.relationship('User', back_populates='messages')
    images = db.relationship('MessageImage', back_populates='message', cascade="all, delete")


    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'channelId': self.channel_id,
            'authorId': self.author_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'author': self.author.to_dict()
        }
