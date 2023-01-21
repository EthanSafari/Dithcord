from flask_socketio import SocketIO, emit
import os

socketio = SocketIO(cors_allowed_origins="*")

@socketio.on("chat")
def chat_handler(data):
    emit("chat", data, broadcast=True)
