import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client'
import { getChannelMessages } from '../../../store/message';

let socket;

const Chat = () => {
    const dispatch = useDispatch()
    const [messages, setMessages] = useState([])
    const [chatInput, setChatInput] = useState("")

    const currentUser = useSelector(state => state.session.user)
    const channelId = useSelector(state => state.channels.oneChannel.id)
    const user = useSelector(state => state.session.user)
    const channelMessagesObj = useSelector(state => state.messages.channelMessages)
    const channelMessages = Object.values(channelMessagesObj)
    console.log("--------channel messages--------", channelId)

    useEffect(() => {
        dispatch(getChannelMessages(channelId))
        // (async () => {
        //     const response = await fetch(`/api/channels/${channelId}`);
        //     const responseData = await response.json();
      
        //     setChannel(responseData.channel)
        //     setMessages([...responseData.messages])
        //   })();
        setMessages([...channelMessages])

        socket = io();

        socket.emit('join', { "user": user, 'room': channelId })
        socket.on("chat", (chat) => {
            const currDate = Date(chat.timestamp)
            const dateStamp = currDate.toString().split('-')[0]
            const res = { channelId: +chat.room, createdAt: dateStamp, message: chat.message, user: { ...chat.user } }
            setMessages(messages => [...messages, chat])
        })

        return (() => {
            socket.disconnect()
        })
    }, [channelId])


    const sendChat = (e) => {
        e.preventDefault()
        //emitting message
        // socket.emit("chat", { user: currentUser.username, msg: chatInput });
        socket.emit("chat", { user: user, message: chatInput, room: channelId, timestamp: new Date() });
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
                    <div key={ind}>{`${message?.author?.username}: ${message.body}`}</div>
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
