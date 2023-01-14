from .db import db
import datetime

class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(750))
    channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    channel = db.relationship('Channel', back_populates='messages')
    author = db.relationship('User', back_populates='messages')
    images = db.relationship('MessageImage', back_populates='message', cascade="all, delete")
