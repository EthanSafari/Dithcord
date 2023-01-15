from flask import Blueprint, render_template, redirect, request

from app.forms.message_form import MessageForm
from ..models import Message, db


message_bp = Blueprint('messages', __name__)


@message_bp.route('/new', methods=['POST'])
def new_message():
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_message = Message()
        form.populate_obj(new_message)

        db.session.add(new_message)
        db.session.commit()
        return new_message.to_dict()

    else:
        return form.errors


@message_bp.route('/<int:id>', methods=['GET', 'DELETE', 'PUT'])
def message_by_id(id):
    message = Message.query.get(id)

    if message:

        if request.method == 'GET':
            message_dict = message.to_dict()
            message_dict['author'] = message.author.to_dict()
            return message_dict

        if request.method == 'DELETE':
            db.session.delete(message)
            db.session.commit()
            return {'message': 'Message Deleted!'}

        if request.method == 'PUT':
            form = MessageForm()
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                message.body = form.data['body']
                db.session.commit()
                return message.to_dict()

            return form.errors

    return { "error": "Message not found", "errorCode" : 404 }, 404
