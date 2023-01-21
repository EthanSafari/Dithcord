from flask_socketio import SocketIO, emit, join_room, leave_room


socketio = SocketIO(cors_allowed_origins="*")

@socketio.on("join")
def on_join(room):
    # room = data['room']
    join_room(room)
    print(f'joined room {room}')
    
@socketio.on("chat")
def on_chat(data):
    # room = data['room']
    # message = data['message']
    emit("chat", data['message'], broadcast=True, to=data['room'])