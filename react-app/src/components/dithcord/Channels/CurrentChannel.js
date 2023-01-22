import React, { useEffect } from 'react';
import ChannelMessages from '../Messages/ChannelMessages';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelMessages } from '../../../store/message';
import { MessageContainerWrapper } from '../DithcordStyles';


function CurrentChannel({ channel }) {
    const dispatch = useDispatch();
    const currentChannel = useSelector(state => state.channels.oneChannel);
    const channelMessages = useSelector(state => state.messages.channelMessages);

    const channelMessagesArray = Object.values(channelMessages);

    useEffect(() => {
        if(currentChannel.id) {
            dispatch(getChannelMessages(currentChannel.id));
        }

    }, [dispatch, currentChannel])

    // console.log('', '\n', '--------------CURRENT CHANNELS COMPONENT DATA--------------', '\n', currentChannel, '\n', '')

    return (
        <MessageContainerWrapper>
            <ChannelMessages messages={channelMessagesArray} channelId={currentChannel.id} />
        </MessageContainerWrapper>
    )
}


export default CurrentChannel
