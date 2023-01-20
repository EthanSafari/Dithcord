import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MessageWrapper } from '../DithcordStyles';
import DeleteMessageButton from './DeleteMessageButton';

import MessageForm from './MessageForm'
import { getChannelMessages } from '../../../store/message';

let socket;


function ChannelMessages({ messages, channelId }) {
    const channelMessages = messages

    const dispatch = useDispatch()
    console.log('', '\n', '--------------CHANNEL MESSAGES COMPONENT DATA--------------', '\n', channelMessages, '\n', '')

    return (
        <MessageWrapper>
            {channelMessages && channelMessages.map((message) => (
                <div key={message.id}>
                    <h3>{message.author.username}</h3>
                    <p>{message.body}</p>
                    <DeleteMessageButton message={message}/>
                    <div>-----</div>
                </div>
            ))}
            {channelId &&
                <MessageForm channelId={channelId} messages={messages} />
            }
        </MessageWrapper>
    )
}

export default ChannelMessages
