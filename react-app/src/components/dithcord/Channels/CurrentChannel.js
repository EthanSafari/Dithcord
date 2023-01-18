import React from 'react';
import ChannelMessages from '../Messages/ChannelMessages';
import { Wrapper } from '../DithcordStyles';

function CurrentChannel(channel) {
    const currentChannel = channel.channel
    const channelMessages = currentChannel?.messages
    console.log('', '\n', '--------------CURRENT CHANNELS COMPONENT DATA--------------', '\n', channelMessages, '\n', '')

    return (
        <Wrapper>
            <ChannelMessages messages={channelMessages} />
        </Wrapper>
    )
}


export default CurrentChannel
