import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"

// import styled from 'styled-components';
import { Wrapper } from './DithcordStyles';

import PrivateMessaging from './Messages/PrivateMessages'
import Servers from './Servers/Servers'
import CurrentServer from './Servers/CurrentServer'
import { getAllServersByUserId, getServers } from '../../store/server';
import ChannelMessages from './Messages/ChannelMessages';


function Dithcord() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const currentServer = useSelector(state => state.servers.oneServer);
    const userServersObj = useSelector(state => state.servers.allServers);
    const userServers = Object.values(userServersObj)

    // console.log('', '\n', '--------------MAIN COMPONENT DATA--------------', '\n', userServersObj, '\n', '');

    useEffect(() => {
        // dispatch(getServers())
        dispatch(getAllServersByUserId(currentUser.id))
    }, [dispatch]);

    return(
        <Wrapper>
            <PrivateMessaging />
            <Servers user={currentUser} servers={userServers} />
            <CurrentServer server={currentServer}/>
        </Wrapper>
    )
        
}


export default Dithcord
