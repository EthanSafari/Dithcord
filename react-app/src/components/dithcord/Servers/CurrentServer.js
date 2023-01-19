import React, { useEffect } from 'react';
import { Wrapper } from '../DithcordStyles';

import Channels from '../Channels/Channels'
import CurrentChannel from '../Channels/CurrentChannel'
import ServerUsers from './ServerUsers';
import { useDispatch, useSelector } from 'react-redux';
import { getAllChannelsByServerId } from '../../../store/channel';



function CurrentServer({ server }) {
    const dispatch = useDispatch();
    const serverId = server.id;
    const serverChannels = server.channels
    const currentChannelId = useSelector((state) => state.channels.oneChannel.id)
    const currentServerChannels = useSelector(state => state.channels.allChannels);

    const currentServerChannelsArray = Object.values(currentServerChannels);

    useEffect(() => {
        dispatch(getAllChannelsByServerId(server?.id));
    }, [dispatch]);

    console.log('', '\n', '--------------CURRENT SERVERS COMPONENT DATA--------------', '\n', server, '\n', '')


    return (
        <Wrapper>
            <Channels channels={serverChannels} serverId={serverId} />
            <CurrentChannel channel={currentChannelId}/>
            <ServerUsers />
        </Wrapper>
    )
}


export default CurrentServer
