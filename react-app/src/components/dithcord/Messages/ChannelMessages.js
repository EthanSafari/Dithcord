import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MessageWrapper, MessageContainerWrapper, TopPartMessage } from '../DithcordStyles';
import DeleteMessageButton from './DeleteMessageButton';

import MessageForm from './MessageForm'
import { getChannelMessages } from '../../../store/message';

let socket;


function ChannelMessages({ messages, channelId }) {
    const channelMessages = messages

    const dispatch = useDispatch()
    console.log('', '\n', '--------------CHANNEL MESSAGES COMPONENT DATA--------------', '\n', channelMessages, '\n', '')

    return (
        <MessageContainerWrapper>
            {channelMessages && channelMessages.map((message) => (
                <div key={message.id}>
                    <div>
                        <TopPartMessage>
                    <h3>{message.author.username}</h3>
                    <DeleteMessageButton message={message}/>
                        </TopPartMessage>
                    </div>
                    <p>{message.body}</p>
                    <div>-----</div>
                </div>
            ))}
            {channelId &&
                <MessageForm channelId={channelId} messages={messages} />
            }
        </MessageContainerWrapper>
    )
}

export default ChannelMessages
