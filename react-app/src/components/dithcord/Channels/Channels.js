import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChannel } from '../../../store/channel';
import { getChannelMessages } from '../../../store/message';
import ServerDropDownMenu from '../Servers/ServerDropDownMenu';
import DeleteChannelButton from './DeleteChannelButton';

function Channels({ channels }) {
    const dispatch = useDispatch();
    const serverChannels = channels
    const channelMessages = useSelector((state) => state.messages.channelMessages)
    // console.log('', '\n', '--------------CHANNELS COMPONENT DATA--------------', '\n', channelMessages, '\n', '')

    const getOneChannel = (channelId) => {
        dispatch(getChannel(channelId))
        dispatch(getChannelMessages(channelId))
    }

    return (
        <div>
            <ServerDropDownMenu />
            {serverChannels && serverChannels.map((channel) => (
                <div onClick={() => getOneChannel(channel.id)} key={channel.id}>
                    <h2>{channel.name}</h2>
                    <DeleteChannelButton />
                </div>
            ))}

        </div>
    )
}


export default Channels
