import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client'

let socket;

const Chat = ({ props }) => {
    const dispatch = useDispatch()

    const [messages, setMessages] = useState([])
    const [chatInput, setChatInput] = useState("")

    const currentUser = useSelector(state => state.session.user)
    const currentChannel = useSelector(state => state.channels.oneChannel)

    // console.log('========CHAT========', chatInput)


    useEffect(() => {
        socket = io();
        socket.emit("join", {user: currentUser.username, roomId: currentChannel.id})
        socket.on("chat", (chat) => {
            console.log("=====ON CHAT====", chat)
            setMessages(messages => [...messages, chat])
        })


        return (() => {
            socket.disconnect()
            setMessages([])
        })
    }, [currentChannel.id])


    const sendChat = (e) => {
        e.preventDefault()
        //emitting message
        socket.emit("chat", { roomId: currentChannel.id, user: `${currentUser.username}`, msg: `${chatInput}` });
        //clear input field
        setChatInput("")
    }

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
        // console.log('=====UPDATE CHAT INPUT FUNC======', e.target.value)
    }

    return (
        <>
            <div>
                {messages.map((message, ind) => (
                    <div key={ind}>{`${message.user}: ${message.msg}`}</div>
                ))}
            </div>
            <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button type="submit">Send</button>
            </form>
        </>
    )
}

export default Chat
