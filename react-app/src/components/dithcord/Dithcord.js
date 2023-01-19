import React, { useState } from 'react';
import { useSelector } from "react-redux"

// import styled from 'styled-components';
import { Wrapper } from './DithcordStyles';

import PrivateMessaging from './Messages/PrivateMessages'
import Servers from './Servers/Servers'
import CurrentServer from './Servers/CurrentServer'


function Dithcord() {
    const currentUser = useSelector(state => state.session.user)
    const currentServer = useSelector(state => state.servers.oneServer)
    // console.log('', '\n', '--------------MAIN COMPONENT DATA--------------', '\n', currentServer, '\n', '')

    return(
        <Wrapper>
            <PrivateMessaging />
            <Servers user={{...currentUser}}/>
            <CurrentServer server={{...currentServer}}/>
        </Wrapper>
    )
        
}


export default Dithcord
