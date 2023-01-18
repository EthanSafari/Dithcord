import React from 'react';
import { MessageWrapper } from '../DithcordStyles';


function ChannelMessages(messages) {
    const channelMessages = messages.messages
    console.log('', '\n', '--------------CHANNEL MESSAGES COMPONENT DATA--------------', '\n', channelMessages, '\n', '')

    return (
        <MessageWrapper>
            {channelMessages && channelMessages.map((message) => (
                <div key={message.id}>
                    <p>{message.body}</p>
                </div>
            ))}
        </MessageWrapper>
    )
}

export default ChannelMessages
