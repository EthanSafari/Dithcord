from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime
from .server import server_users, Base
import random

profile_images = [
    'a-bards-curse-hallucinated-dog.png',
    'astro-tyson.png',
    'drunk-pidgeon.png',
    'MTM_UnsolvedSituations_Still07.png',
    'ogopogo.png',
    'pox.png',
    'the-bards-curse-bisexual-license-plate.png',
    'Yung_Hee_29.jpg',
    'yung-hee.png'
]

class User(db.Model, UserMixin, Base):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_img = db.Column(db.String(255), nullable=False, default=f'/static/images/profile_images/{random.choice(profile_images)}')
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    server = db.relationship('Server', back_populates='owner')
    messages = db.relationship('Message', back_populates='author')
    servers = db.relationship('Server', secondary=server_users, back_populates="users")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_img': self.profile_img,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
