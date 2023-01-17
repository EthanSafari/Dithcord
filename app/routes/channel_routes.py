from flask import Blueprint, request
from ..models import Channel, Message, db
from ..forms.channel_form import ChannelForm


channel_bp = Blueprint('channels', __name__)

@channel_bp.route('/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def channel_by_id(id):
    channel = Channel.query.get(id)

    if channel:

        if request.method == 'GET':
            channel_dict = channel.to_dict()
            channel_dict['messages'] = [message.to_dict() for message in channel.messages]
            return channel_dict

        if request.method == 'PUT':
            form = ChannelForm()
            form['csrf_token'].data = request.cookies['csrf_token']

            if form.validate_on_submit():
                channel.name = form.data['name']
                channel.private = form.data['private']
                db.session.commit()
                return channel.to_dict()
            else:
                return form.errors

        if request.method == 'DELETE':
            db.session.delete(channel)
            db.session.commit()
            return {'message': 'Channel Deleted!'}

    return { "error": "Channel not found", "errorCode" : 404 }, 404


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


@channel_bp.route('/<int:id>/messages')
def get_all_messages_by_channel_id(id):
    channel = Channel.query.get(id)
    if channel:
        channel_messages = Message.query.filter(Message.channel_id == id).all()
        messages_list = { 'messages' : [message.to_dict() for message in channel_messages]}
        return messages_list
    else:
        return { "error": "Channel not found", "errorCode" : 404 }, 404
