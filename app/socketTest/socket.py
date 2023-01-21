from flask_socketio import SocketIO, emit, join_room, leave_room, send
import os

socketio = SocketIO(logger=True, engineio_logger=True, cors_allowed_origins="*")

@socketio.on("chat")
def chat_handler(data):
    room = data["id"]
    user = data["user"]
    message = data["msg"]
    send(user + ": " + message, to=room)
    # print('===========INSIDE OF CHAT ROUTE===========', data)

@socketio.on("join")
def channel_join(username, channelId):
    name = username
    room = channelId
    join_room(room)
    send(name + ' has entered the room.', to=room)
    print('=========== INSIDE OF OUR SOCKET JOIN ROUTE ==============', username, room)
    
@socketio.on("leave")
def channel_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)
    print('===========INSIDE OF LEAVE ROUTE===========', data["username"], data["room"])
    
