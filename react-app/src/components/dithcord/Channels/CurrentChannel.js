import React, { useEffect } from 'react';
import ChannelMessages from '../Messages/ChannelMessages';
import { Wrapper } from '../DithcordStyles';
import { useDispatch, useSelector } from 'react-redux';
import { getChannel } from '../../../store/channel';

function CurrentChannel({ channel }) {
    const dispatch = useDispatch()
    const currentChannel = useSelector(state => state.channels.oneChannel)

    const channelMessages = currentChannel?.messages
    // console.log('', '\n', '--------------CURRENT CHANNELS COMPONENT DATA--------------', '\n', currentChannel, '\n', '')

    return (
        <Wrapper>
            <ChannelMessages messages={channelMessages} />
        </Wrapper>
    )
}


export default CurrentChannel
