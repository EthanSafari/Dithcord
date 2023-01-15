from flask import Blueprint, render_template, redirect
from ..models import Channel, Message, Server


channel_bp = Blueprint('channels', __name__)

@channel_bp.route('/<int:channel_id>')
def channel_by_id(channel_id):
    channel = Channel.query.get(channel_id)
    channel_dict = channel.to_dict()
    channel_dict['messages'] = [message.to_dict() for message in channel.messages]

    return channel_dict
