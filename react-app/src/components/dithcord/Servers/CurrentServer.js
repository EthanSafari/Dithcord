import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Wrapper } from '../DithcordStyles';

import Channels from '../Channels/Channels'
import CurrentChannel from '../Channels/CurrentChannel'
import ServerUsers from './ServerUsers';



function CurrentServer() {

    return (
        <Wrapper>
            <Channels />
            <CurrentChannel />
            <ServerUsers />
        </Wrapper>
    )
}


export default CurrentServer
