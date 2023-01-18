import React from 'react';
import { Wrapper } from '../DithcordStyles';

import Channels from '../Channels/Channels'
import CurrentChannel from '../Channels/CurrentChannel'
import ServerUsers from './ServerUsers';



function CurrentServer(server) {
    const serverChannels = server.server.channels
    console.log('', '\n', '--------------CURRENT SERVERS COMPONENT DATA--------------', '\n', serverChannels, '\n', '')

    return (
        <Wrapper>
            <Channels channels={serverChannels}/>
            <CurrentChannel />
            <ServerUsers />
        </Wrapper>
    )
}


export default CurrentServer
