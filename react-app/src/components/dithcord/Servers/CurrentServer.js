import React from 'react';
import { Wrapper } from '../DithcordStyles';

import Channels from '../Channels/Channels'
import CurrentChannel from '../Channels/CurrentChannel'
import ServerUsers from './ServerUsers';
import { useSelector } from 'react-redux';



function CurrentServer({ server }) {
    const serverChannels = server.channels
    const currentChannel = useSelector((state) => state.channels.oneChannel)
    console.log('', '\n', '--------------CURRENT SERVERS COMPONENT DATA--------------', '\n', server, '\n', '')

    return (
        <Wrapper>
            <Channels channels={serverChannels}/>
            <CurrentChannel channel={currentChannel}/>
            <ServerUsers />
        </Wrapper>
    )
}


export default CurrentServer
