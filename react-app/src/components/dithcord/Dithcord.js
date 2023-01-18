import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import styled from 'styled-components';
import { Wrapper } from './ComponentStyling';

import PrivateMessaging from './PrivateMessaging'
import Servers from './Servers'
import Channels from './Channels';
import ChannelMessages from './ChannelMessages';
import ServerUsers from './ServerUsers';

function Dithcord() {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)

    const [banana, setServers] = useState({...sessionUser.servers})

    // setServers(testServer)

    console.log('----MAIN COMPONENT----\n', banana)

    return(
        <Wrapper>
            <PrivateMessaging />
            <Servers user={{ sessionUser }}/>
            <Channels />
            <ChannelMessages />
            <ServerUsers />
        </Wrapper>
    )

}


export default Dithcord
