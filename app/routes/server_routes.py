from flask import Blueprint, render_template, redirect, request

from app.forms.server_form import ServerForm
from ..models import Server, Channel, db


server_bp = Blueprint('servers', __name__)


@server_bp.route('')
def server_home():
    all_servers = Server.query.all()
    return {'servers': [server.to_dict() for server in all_servers]}


@server_bp.route('/<int:id>', methods=["GET"])
def server_by_id(id):
    server = Server.query.get(id)
    channels = Channel.query.filter(Channel.server_id == id).all()

    server_dict = server.to_dict()
    server_dict['channels'] = [channel.to_dict() for channel in channels]
    server_dict['users'] = [user.to_dict() for user in server.users]

    return server_dict


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
        
@server_bp.route('/<int:id>', methods=['PUT'])
def update_server(id):
    server_update = Server.query.get(id)
    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        
        server_update.name = form.data['name']
        server_update.private = form.data['private']
        server_update.server_image = form.data['server_image']
        
        # db.session.add(channel_update)
        db.session.commit()
        return server_update.to_dict()
    
    else:
        return form.errors 
    
@server_bp.route('/<int:id>', methods=['DELETE'])
def delete_server(id):
    delete_server = Server.query.get(id)
    
    db.session.delete(delete_server)
    db.session.commit()
    return {'message': 'Server Deleted!'}
