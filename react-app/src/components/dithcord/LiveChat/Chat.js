import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client'
import { createMessage } from '../../../store/message';
import styled from 'styled-components'
import tysonify from '../../../tysonify-text';

let socket;


const Chat = ({ props }) => {
    const dispatch = useDispatch()
    let postedMessage;
    const [messages, setMessages] = useState([])
    const [chatInput, setChatInput] = useState("")

    const currentUser = useSelector(state => state.session.user)
    const currentChannel = useSelector(state => state.channels.oneChannel)
    const channelMessages = currentChannel.messages

    // console.log('========CHAT========', postedMessage)

    useEffect(() => {
        socket = io();
        socket.emit("join", { user: currentUser.username, roomId: currentChannel.id })
        socket.on("chat", (chat) => {
            // console.log("=====ON CHAT====", chat)
            setMessages(messages => [...messages, chat])
        })



        return (() => {
            socket.disconnect()
            setMessages([])
        })
    }, [currentChannel.id, currentUser.username])




    const sendChat = (e) => {
        e.preventDefault()
        postedMessage = {
            "body": tysonify(chatInput),
            "channel_id": currentChannel.id,
            "author_id": currentUser.id
        }
        //emitting message
        socket.emit("chat", { roomId: currentChannel.id, user: `${currentUser.username}`, msg: tysonify(chatInput) });
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
            <MessageContainer>
                <NewMessage>
                    {messages.map((message, ind) => (
                        <div key={ind}>{`${message.user}: ${message.msg}`}</div>
                    ))}
                </NewMessage>

                <Message>
                    {currentChannel && channelMessages && channelMessages.map(message => (
                        <div key={message.id}>{`${message.author.username}: ${message.body}`}</div>
                        ))}
                </Message>
            </MessageContainer>
        
            {currentChannel.id && <MessageFormWrapper>
                <form className='message-form' onSubmit={sendChat}>

                    <input className='message-input' value={chatInput} onChange={updateChatInput} />

                    <button className='message-button' type='submit'>Send</button>

                </form>
           </MessageFormWrapper>}
        </>
    )
}

export default Chat


const MessageContainer = styled.div`
    box-sizing: border-box;
    padding: 4%;
    overflow-y: auto;
    display: flex;
    flex-direction: column-reverse;
    background-color: rgba(107, 107, 107, 1);
    width: 100%;
    height: 85%;
`

const Message = styled.address`
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: rgba(184, 184, 184, 1);
    width: 100%;
`
const NewMessage = styled.address`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: rgba(184, 184, 184, 1);
    width: 100%;
`

const MessageFormWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    height: 15%;
    background-color: rgba(69, 69, 69, 1);
    width: 100%; /* Need a specific value to work */
    .message-input {
        height: 30%;
        margin-top: 10%;
        margin-bottom: auto;
        background-color: rgba(200, 200, 200, 1);
    }
    .message-button {
       visibility: hidden;
    }
`


const MessageInput = styled.input`
    width: 90%;
    height: 10%;
`
const MessageForm = styled.form`
    display: flex;
    width: 100%;
    background-color: red;
    justify-content: center;
    flex-direction: row;
    height: 15%;
`
