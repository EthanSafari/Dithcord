from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Server

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>/servers')
@login_required
def servers_by_user_id(id):
    # servers = User.query(Server).join(User, User.id == Server.user_id).all()
    user = User.query.get(id)
    servers = Server.query.filter(Server.users.contains(user)).all()
    return { 'userServers': [server.to_dict() for server in servers]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    current_user = user.to_dict()
    current_user['servers'] = [server.to_dict() for server in user.servers]
    current_user['serversOwned'] = [server.to_dict() for server in user.server]
    return current_user
