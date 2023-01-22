import React, { useEffect } from 'react';
import ChannelMessages from '../Messages/ChannelMessages';
import { Wrapper } from '../DithcordStyles';
import { useDispatch, useSelector } from 'react-redux';
import { getChannel } from '../../../store/channel';
import { getChannelMessages } from '../../../store/message';
import MessageForm from '../Messages/MessageForm';

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
        <div className='channel-messages-container'>

            <ChannelMessages messages={channelMessagesArray} channelId={currentChannel.id} />
            {channel.id &&
                <MessageForm channelId={channel.id} />
            }
        </div>
    )
}


export default CurrentChannel
