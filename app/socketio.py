from flask_socketio import SocketIO, emit, send, join_room, leave_room
from app.models import db, Message
import os
from datetime import datetime



socketio = SocketIO(cors_allowed_origins="*")

@socketio.on("chat")
def handle_chat(data):
    if len(data['message']) > 0 and len(data['message']) <= 2000:
        message = Message(
        body=data['message'],
        channel_id=int(data['room']),
        author_id=current_user.id,
        created_at=datetime.now()
    )
        # print('--------BACKENDDATA', message.to_dict())
        db.session.add(message)
        db.session.commit()
        # new_message_date = datetime.now()
        if data['room']:
            room = data['room']
            emit("chat", data, broadcast=True, to=room)
    # emit("chat", data, broadcast=True)
    
@socketio.on('join')
def on_join(data):
    # print('------USERDATASOCKET', data)
    username = data['user']['username']
    room = data['room']
    join_room(room)
    emit(username + ' has entered the room.', to=room)
    