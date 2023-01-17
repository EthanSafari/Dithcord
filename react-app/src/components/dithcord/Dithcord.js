import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import styled from 'styled-components';
import { Wrapper } from './ComponentStyling';

import Servers from './Servers'

function Dithcord() {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    console.log('----MAIN COMPONENT----\n', `${sessionUser}\n`)

    return(
        <Wrapper>
            {/* {sessionUser.servers.map((server) => (
                <p>{server.name}</p>
            ))} */}
            <Servers user={{ sessionUser }}/>
        </Wrapper>
    )

}


export default Dithcord
