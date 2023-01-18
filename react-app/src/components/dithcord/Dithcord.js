import React, { useEffect } from 'react';
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
    console.log('----MAIN COMPONENT----\n', sessionUser)

    return(
        <Wrapper>
            {/* {sessionUser.servers.map((server) => (
                <p key={server.id}>{server.name}</p>
            ))} */}
            <PrivateMessaging />
            <Servers user={{ sessionUser }}/>
            <Channels />
            <ChannelMessages />
            <ServerUsers />
        </Wrapper>
    )

}


export default Dithcord
