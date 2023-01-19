import React from 'react';
import { Wrapper } from '../DithcordStyles';

import Channels from '../Channels/Channels'
import CurrentChannel from '../Channels/CurrentChannel'
import ServerUsers from './ServerUsers';
import { useSelector } from 'react-redux';



function CurrentServer({ server }) {
    const serverChannels = server.channels
    const currentChannelId = useSelector((state) => state.channels.oneChannel.id)
    // console.log('', '\n', '--------------CURRENT SERVERS COMPONENT DATA--------------', '\n', currentChannelId, '\n', '')
    

    return (
        <Wrapper>
            <Channels channels={serverChannels}/>
            <CurrentChannel channel={currentChannelId}/>
            <ServerUsers />
        </Wrapper>
    )
}


export default CurrentServer
