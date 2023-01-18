import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { MessageWrapper } from '../DithcordStyles';
import {io} from 'socket.io-client'
import MessageForm from './MessageForm'

let socket;


function ChannelMessages({messages, channelId}) {
    const channelMessages = messages
    const [chatInput, setChatInput] = useState('')
    const [msgs, setMsgs] = useState([])
    console.log('', '\n', '--------------CHANNEL MESSAGES COMPONENT DATA--------------', '\n', channelMessages, '\n', '')

    useEffect(() => {
        socket = io()

        socket.on("chat", (chat) => {
            setMsgs(msgs => [...msgs, chat])
        })
        return(() => {
            socket.disconnect()
        })
    })

    return (
        <MessageWrapper>
            {channelMessages && channelMessages.map((message) => (
                <div key={message.id}>
                    <h3>{message.author.username}</h3>
                    <p>{message.body}</p>
                    <div>-----</div>
                </div>
            ))}
            <MessageForm channelId={channelId}/>
        </MessageWrapper>
    )
}

export default ChannelMessages
