from crypt import methods
from flask import Blueprint, render_template, redirect, request
from ..models import Channel, Message, Server, db
from ..forms.channel_form import ChannelForm


channel_bp = Blueprint('channels', __name__)

@channel_bp.route('/<int:channel_id>')
def channel_by_id(channel_id):
    channel = Channel.query.get(channel_id)
    channel_dict = channel.to_dict()
    channel_dict['messages'] = [message.to_dict() for message in channel.messages]

    return channel_dict


@channel_bp.route('/new', methods=['POST'])
def new_channel():
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        new_channel = Channel()
        form.populate_obj(new_channel)
        
        db.session.add(new_channel)
        db.session.commit()
        return new_channel.to_dict()
    
    else:
        return form.errors
    

@channel_bp.route('/<int:channel_id>', methods=['DELETE'])
def delete_channel(channel_id):
    remove_channel = Channel.query.get(channel_id)
    db.session.delete(remove_channel)
    db.session.commit()
    return {'message': 'Channel Deleted!'}
