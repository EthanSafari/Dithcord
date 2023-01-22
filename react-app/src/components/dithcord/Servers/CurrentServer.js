import React, { useEffect } from 'react';
import { Wrapper } from '../DithcordStyles';

import Channels from '../Channels/Channels'
import CurrentChannel from '../Channels/CurrentChannel'
import ServerUsers from './ServerUsers';
import { useDispatch, useSelector } from 'react-redux';
import { getAllChannelsByServerId } from '../../../store/channel';



function CurrentServer({ server }) {
    const dispatch = useDispatch();
    const serverChannels = useSelector((state) => state.channels.allChannels)
    const currentChannel = useSelector((state) => state.channels.oneChannel)
    const currentServer = useSelector((state) => state.servers.oneServer)
    console.log('', '\n', '--------------CURRENT SERVERS COMPONENT DATA--------------', '\n', currentServer, '\n', '')

    useEffect(() => {
        if(server.id) {
            // dispatch(getAllChannelsByServerId(server.id))
        }
    },[dispatch, server.id])

    return (
        <Wrapper>
            <Channels channels={serverChannels} server={currentServer}/>
            <CurrentChannel channel={currentChannel}/>
            <ServerUsers />
        </Wrapper>
    )
}


export default CurrentServer
