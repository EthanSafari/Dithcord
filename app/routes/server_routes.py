from flask import Blueprint, render_template, redirect
from ..models import Server, Channel


server_bp = Blueprint('servers', __name__)


@server_bp.route('')
def server_home():
    all_servers = Server.query.all()
    return {'servers': [server.to_dict() for server in all_servers]}


@server_bp.route('/<int:id>')
def server_by_id(id):
    server = Server.query.get(id)
    channels = Channel.query.filter(Channel.server_id == id).all()

    server_dict = server.to_dict()
    server_dict['channels'] = [channel.to_dict() for channel in channels]
    server_dict['users'] = [user.to_dict() for user in server.users]

    return server_dict


