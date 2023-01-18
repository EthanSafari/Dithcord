import React from 'react';
import { useSelector } from "react-redux"

// import styled from 'styled-components';
import { Wrapper } from './DithcordStyles';

import PrivateMessaging from './Messages/PrivateMessages'
import Servers from './Servers/Servers'
import CurrentServer from './Servers/CurrentServer'


function Dithcord() {

    const currentUser = useSelector(state => state.session.user)

    console.log('--------------MAIN COMPONENT--------------\n', {...currentUser})

    return(
        <Wrapper>
            <PrivateMessaging />
            <Servers user={{...currentUser}}/>
            <CurrentServer />
        </Wrapper>
    )
        
}


export default Dithcord
