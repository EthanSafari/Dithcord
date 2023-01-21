import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client'

let socket;

const Chat = () => {
    const dispatch = useDispatch()

    const [messages, setMessages] = useState([])
    const [chatInput, setChatInput] = useState("")

    const currentUser = useSelector(state => state.session.user)
    const currentChannel = useSelector(state => state.channels.oneChannel)

    console.log('========CHAT========', currentChannel.id)

    useEffect(() => {
        socket = io();

        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })


        return (() => {
            socket.disconnect()
        })
    }, [dispatch, currentChannel.id])


    const sendChat = (e) => {
        e.preventDefault()
        //emitting message
        socket.emit("chat", { user: currentUser.username, msg: chatInput });
        //clear input field
        setChatInput("")
    }

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
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
                <button type="submit">Send It</button>
            </form>
        </>
    )
}

export default Chat
