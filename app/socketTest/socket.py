from flask_socketio import SocketIO, emit, join_room, leave_room, send
import os

socketio = SocketIO(cors_allowed_origins="*")

@socketio.on("chat")
def chat_handler(data):
    emit("chat", data, broadcast=True)

@socketio.on("join")
def channel_join(username, channelId):
    username = username
    room = channelId
    join_room(room)
    emit(username + ' has entered the room.', to=channelId)
    print('INSIDE OF OUR SOCKET JOIN ROUTE: ', username, channelId)
    
@socketio.on("leave")
def channel_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)
    
