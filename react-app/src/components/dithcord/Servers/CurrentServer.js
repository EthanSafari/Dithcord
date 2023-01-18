import React from 'react';
import { Wrapper } from '../DithcordStyles';

import Channels from '../Channels/Channels'
import CurrentChannel from '../Channels/CurrentChannel'
import ServerUsers from './ServerUsers';



function CurrentServer() {
    console.log('--------------CURRENT SERVERS COMPONENT--------------\n')

    return (
        <Wrapper>
            <Channels />
            <CurrentChannel />
            <ServerUsers />
        </Wrapper>
    )
}


export default CurrentServer
