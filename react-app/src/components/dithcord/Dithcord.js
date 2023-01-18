import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"

import styled from 'styled-components';
import { Wrapper } from './DithcordStyles';

import PrivateMessaging from './Messages/PrivateMessages'
import Servers from './Servers/Servers'
import CurrentServer from './Servers/CurrentServer'


function Dithcord() {
    const dispatch = useDispatch()

    const servers = useSelector(state => state.session.user.servers)

    // const [servers, setServers] = useState({...sessionUser.servers})


    console.log('--------------MAIN COMPONENT--------------\n', servers)

    return(
        <Wrapper>
            <PrivateMessaging />
            <Servers user={{ servers }}/>
            <CurrentServer />
        </Wrapper>
    )
        
}


export default Dithcord
