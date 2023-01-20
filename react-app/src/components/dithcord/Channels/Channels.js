import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChannel } from '../../../store/channel';
import { getChannelMessages } from '../../../store/message';
import ServerDropDownMenu from '../Servers/ServerDropDownMenu';
import DeleteChannelButton from './DeleteChannelButton';

function Channels({ channels }) {
    const dispatch = useDispatch();
    const currentChannels = Object.values(channels)
    console.log('', '\n', '--------------CHANNELS COMPONENT DATA--------------', '\n', currentChannels, '\n', '')

    const getOneChannel = (channelId) => {
        dispatch(getChannel(channelId))
        dispatch(getChannelMessages(channelId))
    }

    return (
        <div>
            <ServerDropDownMenu />
            {currentChannels && currentChannels.map((channel) => (
                <div onClick={() => getOneChannel(channel.id)} key={channel.id}>
                    <h2>{channel.name}</h2>
                    <DeleteChannelButton channelId={channel.id}/>
                </div>
            ))}

        </div>
    )
}


export default Channels
