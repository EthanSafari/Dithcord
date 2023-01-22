import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client'
import { createMessage } from '../../../store/message';

let socket;

const Chat = ({ props }) => {
    const dispatch = useDispatch()
    let postedMessage;
    const [messages, setMessages] = useState([])
    const [chatInput, setChatInput] = useState("")

    const currentUser = useSelector(state => state.session.user)
    const currentChannel = useSelector(state => state.channels.oneChannel)
    const channelMessages = currentChannel.messages
    
    console.log('========CHAT========', postedMessage)
    
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
        postedMessage = {
            "body": chatInput,
            "channel_id": currentChannel.id,
            "author_id": currentUser.id
        }
        //emitting message
        socket.emit("chat", { roomId: currentChannel.id, user: `${currentUser.username}`, msg: `${chatInput}` });
        //clear input field
        dispatch(createMessage(postedMessage))
        setChatInput("")
    }

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
        // console.log('=====UPDATE CHAT INPUT FUNC======', e.target.value)
    }

    return (
        <>
            <div>
                {currentChannel&& channelMessages && channelMessages.map(message => (
                    <div key={message.id}>{`${message.author.username}: ${message.body}`}</div>
                ))}
            </div>
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
