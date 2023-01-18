import React from 'react';
import { Wrapper } from '../DithcordStyles';

import Channels from '../Channels/Channels'
import CurrentChannel from '../Channels/CurrentChannel'
import ServerUsers from './ServerUsers';



function CurrentServer(server) {
    console.log('', '\n', '--------------CURRENT SERVERS COMPONENT DATA--------------', '\n', server.server, '\n', '')

    return (
        <Wrapper>
            <Channels />
            <CurrentChannel />
            <ServerUsers />
        </Wrapper>
    )
}


export default CurrentServer
