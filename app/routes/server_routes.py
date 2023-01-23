from flask import Blueprint, request

from app.forms.server_form import ServerForm
from ..models import Server, Channel, db, User

server_bp = Blueprint('servers', __name__)


@server_bp.route('')
def server_home():
    all_servers = Server.query.filter(Server.private == False).all()
    return {'servers': [server.to_dict() for server in all_servers]}



@server_bp.route('/new', methods=['POST'])
def new_server():
    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_server = Server()
        form.populate_obj(new_server)

        db.session.add(new_server)
        db.session.commit()
        return new_server.to_dict()

    else:
        return form.errors


@server_bp.route('/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def server_by_id(id):
    server = Server.query.get(id)

    if server:

        if request.method == 'GET':
            server_dict = server.to_dict()
            server_dict['channels'] = [channel.to_dict() for channel in server.channels]
            server_dict['users'] = [user.to_dict() for user in server.users]
            server_dict['owner'] = server.owner.to_dict()
            return server_dict

        if request.method == 'PUT':
            form = ServerForm()
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                server.name = form.data['name']
                server.private = form.data['private']
                server.server_image = form.data['server_image']
                db.session.commit()
                return server.to_dict()
            else:
                return form.errors

        if request.method == 'DELETE':
            db.session.delete(server)
            db.session.commit()
            return {'message': 'Server Deleted!'}

    return { "error": "Server not found", "errorCode" : 404 }, 404


@server_bp.route('/<int:id>/channels')
def get_channels_by_server(id):
    server = Server.query.get(id)
    if server:
        server_channels = Channel.query.filter(Channel.server_id == id).all()
        return { 'channels': [channel.to_dict() for channel in server_channels]}
    else:
        return { "error": "Server not found", "errorCode" : 404 }, 404


@server_bp.route('/private/<int:user1Id>/<int:user2Id>')
def get_private_servers_user_list(user1Id, user2Id):
    user1 = User.query.get(user1Id)
    user2 = User.query.get(user2Id)
    servers = Server.query.filter(Server.users.contains(user1), Server.users.contains(user2), Server.private == True).all()
    return {'userPrivateServerToUser' : [server.to_dict() for server in servers]}
