from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime
from .server import server_users
import random

profile_images = [
    'https://th.bing.com/th/id/OIP.Z1ybH2lsvZ754eON_B7dzQAAAA?w=141&h=169&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.thG6mpaRjW8OrRhjj0F4sQAAAA?w=141&h=169&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.Y_HIP8Xl5JtXCh_uTENSFgAAAA?w=136&h=169&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.NKa4nQaNXZxhGGaVTKSXbwAAAA?w=136&h=169&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.bCTP_MxMGAn53G3nGlWCqwHaId?w=136&h=169&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.kZId7zwqAws54JCIhM-rawAAAA?w=148&h=169&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.q1YJLemsikAjoj1_8KLsvwHaId?w=148&h=169&c=7&r=0&o=5&pid=1.7',
    'https://th.bing.com/th/id/OIP.lhlPvMUiN12T1WJw0R-HJgAAAA?w=148&h=169&c=7&r=0&o=5&pid=1.7'
]

def random_image_picker():
    image = random.choice(profile_images)
    return image

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_img = db.Column(db.String(255), nullable=False, default=random_image_picker())
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
            'updated_at': self.updated_at,
            'servers': [server.to_dict() for server in self.servers]
        }
