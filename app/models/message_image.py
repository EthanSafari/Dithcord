from .db import db
import datetime


class MessageImage(db.Model):
    __tablename__ = 'message_images'
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(500))
    message_id = db.Column(db.Integer, db.ForeignKey('messages.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    message = db.relationship('Message', back_populates='images')
