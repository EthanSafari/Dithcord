from flask_socketio import SocketIO, emit, join_room, leave_room, send
import os
from app.models import db, Message

socketio = SocketIO(logger=True, engineio_logger=True, cors_allowed_origins="*")



@socketio.on("chat")
def handle_chat(data):
    room = data["roomId"]
    emit("chat", data, room=room)
    print('', '\n', '===========INSIDE OF CHAT ROUTE===========', data, '\n', '')

# @socketio.on("chat")
# def chat_handler(data):
#     room = data["id"]
#     user = data["user"]
#     message = data["msg"]
#     send(user + ": " + message, to=room)

@socketio.on("join")
def channel_join(data):
    name = data["user"]
    room = data["roomId"]
    join_room(room)
    send(name + ' has entered the room.', room=room)
    print('=========== INSIDE OF OUR SOCKET JOIN ROUTE ==============', data)
    
@socketio.on("leave")
def channel_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', room=room)
    print('===========***************************LEAVING ROOM**************************===========', data)
    
